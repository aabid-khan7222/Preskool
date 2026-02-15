const { Pool } = require('pg');

// Load .env for local development only (Render injects env at runtime)
require('dotenv').config();

// --- Debug: confirm which config will be used (safe, no secrets) ---
console.log('ENV CHECK:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

const useProductionDb = !!process.env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === 'production';

// In production, never use localhost — require DATABASE_URL
if (isProduction && !useProductionDb) {
  console.error('❌ Production requires DATABASE_URL. Set it in Render (or your host) environment.');
  process.exit(1);
}

let poolConfig;

if (useProductionDb) {
  // Production (e.g. Render): use only DATABASE_URL. No localhost.
  console.log('DB config: Using DATABASE_URL (production)');
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  };
} else {
  // Local development: use DB_* env vars from .env
  console.log('DB config: Using local DB_* env (development)');
  poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || 'schooldb',
    user: process.env.DB_USER || 'schooluser',
    password: process.env.DB_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };
}

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    console.log('✅ Database connected successfully');
    if (!useProductionDb) {
      console.log(`📊 Connected to: ${poolConfig.database} on ${poolConfig.host}:${poolConfig.port}`);
    }
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

const getClient = async () => pool.connect();

const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    if (process.env.NODE_ENV === 'development') {
      console.log('Executed query', { duration: Date.now() - start, rows: res.rowCount });
    }
    return res;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
};

const executeTransaction = async (callback) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const closePool = async () => pool.end();

module.exports = {
  pool,
  testConnection,
  getClient,
  query,
  executeTransaction,
  closePool,
};
