
import TeacherModal from "../teacherModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { all_routes } from "../../../router/all_routes";
import TeacherSidebar from "./teacherSidebar";
import TeacherBreadcrumb from "./teacherBreadcrumb";
import { apiService } from "../../../../core/services/apiService";

interface TeacherDetailsLocationState {
  teacherId?: number;
  teacher?: any;
}

const TeachersRoutine = () => {
  const routes = all_routes;
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as TeacherDetailsLocationState | null;
  const teacherId = state?.teacherId ?? state?.teacher?.id;
  const [teacher, setTeacher] = useState<any>(state?.teacher ?? null);
  const [loading, setLoading] = useState(!!teacherId);

  // Redirect to Teacher List if no teacherId is provided (e.g., clicked from sidebar)
  // MUST be before any early returns to follow Rules of Hooks
  useEffect(() => {
    if (!teacherId && !loading) {
      navigate(routes.teacherList, { replace: true });
    }
  }, [teacherId, loading, navigate, routes.teacherList]);

  // Always fetch full teacher by ID when teacherId is available to ensure we have complete data
  // This works whether coming from grid (partial teacher) or list (full teacher)
  useEffect(() => {
    if (teacherId) {
      setLoading(true);
      apiService
        .getTeacherById(teacherId)
        .then((res: any) => {
          if (res?.data) setTeacher(res.data);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [teacherId]);

  if (loading) {
    return (
      <>
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content">
            <div className="row">
              <TeacherBreadcrumb />
              <div className="col-12">
                <div className="d-flex justify-content-center align-items-center p-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span className="ms-2">Loading teacher...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
        <TeacherModal />
      </>
    );
  }

  if (!teacher && !teacherId) {
    return (
      <>
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content">
            <div className="row">
              <TeacherBreadcrumb />
              <div className="col-12">
                <div className="d-flex justify-content-center align-items-center p-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span className="ms-2">Redirecting to Teacher List...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
        <TeacherModal />
      </>
    );
  }

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            {/* Page Header */}
            <TeacherBreadcrumb />
            {/* /Page Header */}
            {/* Teacher Information */}
            <TeacherSidebar teacher={teacher} />
            {/* /Teacher Information */}
            <div className="col-xxl-9 col-xl-8">
              <div className="row">
                <div className="col-md-12">
                  {/* List */}
                  <ul className="nav nav-tabs nav-tabs-bottom mb-4">
                    <li>
                      <Link to={routes.teacherDetails} className="nav-link ">
                        <i className="ti ti-school me-2" />
                        Teacher Details
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={routes.teachersRoutine}
                        className="nav-link active"
                      >
                        <i className="ti ti-table-options me-2" />
                        Routine
                      </Link>
                    </li>
                    <li>
                      <Link to={routes.teacherLeaves} className="nav-link ">
                        <i className="ti ti-calendar-due me-2" />
                        Leave &amp; Attendance
                      </Link>
                    </li>
                    <li>
                      <Link to={routes.teacherSalary} className="nav-link">
                        <i className="ti ti-report-money me-2" />
                        Salary
                      </Link>
                    </li>
                    <li>
                      <Link to={routes.teacherLibrary} className="nav-link">
                        <i className="ti ti-bookmark-edit me-2" />
                        Library
                      </Link>
                    </li>
                  </ul>
                  {/* /List */}
                  <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap pb-0">
                      <h4 className="mb-3">Time Table</h4>
                      <div className="d-flex align-items-center flex-wrap">
                        <div className="dropdown mb-3">
                          <Link
                            to="#"
                            className="btn btn-outline-light border-white bg-white dropdown-toggle shadow-md"
                            data-bs-toggle="dropdown"
                          >
                            <i className="ti ti-calendar-due me-2" />
                            This Year
                          </Link>
                          <ul className="dropdown-menu p-3">
                            <li>
                              <Link to="#" className="dropdown-item rounded-1">
                                This Year
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item rounded-1">
                                This Month
                              </Link>
                            </li>
                            <li>
                              <Link to="#" className="dropdown-item rounded-1">
                                This Week
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex flex-nowrap overflow-auto">
                        <div className="d-flex flex-column me-4 flex-fill">
                          <div className="mb-3">
                            <h6>Monday</h6>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:104
                              </span>
                            </div>
                            <span className="text-dark d-block py-2">
                              Class : III, A
                            </span>
                            <span className="text-dark d-block pb-2">
                              Subject : Spanish
                            </span>
                            <p className="text-dark">
                              <i className="ti ti-clock me-1" />
                              09:45 -10:30 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:104
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              09:45 -10:30 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:108
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : I, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              03:15 - 04:00 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:107
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : V, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : English
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              11:30 - 12:15 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:108
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : IV, B
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              02:15 - 03:00 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:106
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : IV, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : English
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              10:45 - 11:30 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:104
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              09:45 -10:30 AM
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column me-4 flex-fill">
                          <div className="mb-3">
                            <h6>Tuesday</h6>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:104
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              09:45 -10:30 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:108
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : IV, B
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              02:15 - 03:00 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:107
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : V, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : English
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              11:30 - 12:15 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:106
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : IV, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : English
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              10:45 - 11:30 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:108
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : I, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              03:15 - 04:00 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:104
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              09:45 -10:30 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:104
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              09:45 -10:30 AM
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column me-4 flex-fill">
                          <div className="mb-3">
                            <h6>Wednesday</h6>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:104
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Computer
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              09:00 - 09:45 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:106
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : II, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Science
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              09:45 - 10:30 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:106
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, B
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Maths
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              10:45 - 11:30 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:108
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : IV, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Chemistry
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              11:30 - 12:15 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:106
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Physics
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              01:30 - 02:15 PM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:101
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Englishh
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              02:15 - 03:00 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:104
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              03:15 - 04:00 AM
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column me-4 flex-fill">
                          <div className="mb-3">
                            <h6>Thursday</h6>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:104
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              09:00 - 09:45 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:106
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Physics
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              09:45 - 10:30 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:108
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : II, B
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : English
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              10:45 - 11:30 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:106
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : IV, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Science
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              11:30 - 12:15 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:104
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : I, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              01:30 - 02:15 PM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:101
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, B
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Chemistry
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              02:15 - 03:00 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:108
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Maths
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              03:15 - 04:00 AM
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column me-4 flex-fill">
                          <div className="mb-3">
                            <h6>Friday</h6>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:104
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              09:45 -10:30 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:106
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : IV, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : English
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              10:45 - 11:30 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:107
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : V, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : English
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              11:30 - 12:15 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:108
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : IV, B
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              02:15 - 03:00 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:108
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : I, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              03:15 - 04:00 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:104
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              09:45 -10:30 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:104
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              09:45 -10:30 AM
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column me-4 flex-fill">
                          <div className="mb-3">
                            <h6>Saturday</h6>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:104
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              09:45 -10:30 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:106
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : IV, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : English
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              10:45 - 11:30 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:107
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : V, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : English
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              11:30 - 12:15 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:108
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : IV, B
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              02:15 - 03:00 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:108
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : I, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              03:15 - 04:00 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:104
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              09:45 -10:30 AM
                            </p>
                          </div>
                          <div className="rounded p-3 mb-4 border">
                            <div className="pb-3 border-bottom">
                              <span className="text-danger badge bg-transparent-danger text-nowrap ">
                                Room No:104
                              </span>
                            </div>
                            <p className="text-dark d-block py-2 m-0">
                              Class : III, A
                            </p>
                            <p className="text-dark d-block pb-2 m-0">
                              Subject : Spanish
                            </p>
                            <p className="text-dark text-nowrap m-0">
                              <i className="ti ti-clock me-1" />
                              09:45 -10:30 AM
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer border-0 pb-0">
                      <div className="row">
                        <div className="col-lg-4 col-xxl-4 col-xl-4 d-flex">
                          <div className="card flex-fill">
                            <div className="card-body bg-transparent-primary">
                              <span className="bg-primary badge badge-sm mb-2">
                                Morning Break
                              </span>
                              <p className="text-dark">
                                <i className="ti ti-clock me-1" />
                                10:30 to 10 :45 AM
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-xxl-3 d-flex">
                          <div className="card flex-fill">
                            <div className="card-body bg-transparent-warning">
                              <span className="bg-warning badge badge-sm mb-2">
                                Lunch
                              </span>
                              <p className="text-dark">
                                <i className="ti ti-clock me-1" />
                                10:30 to 10 :45 AM
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-xxl-3 d-flex">
                          <div className="card flex-fill">
                            <div className="card-body bg-transparent-info">
                              <span className="bg-info badge badge-sm mb-2">
                                Evening Break
                              </span>
                              <p className="text-dark">
                                <i className="ti ti-clock me-1" />
                                03:30 PM to 03:45 PM
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      <TeacherModal />
    </>
  );
};

export default TeachersRoutine;
