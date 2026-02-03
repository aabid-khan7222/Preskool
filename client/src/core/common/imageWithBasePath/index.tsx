
import { useState } from 'react';
import { img_path} from '../../../environment';

interface Image {
  className?: string;
  src: string;
  alt?: string;
  height?: number;
  width?: number;
  id?:string;
  gender?: string;
}

const ImageWithBasePath = (props: Image) => {
  const [imgSrc, setImgSrc] = useState(`${img_path}${props.src}`);
  const [hasError, setHasError] = useState(false);

  // Function to get default avatar based on gender
  const getDefaultAvatar = (gender?: string) => {
    switch (gender?.toLowerCase()) {
      case 'male':
        return `${img_path}assets/img/profiles/avatar-01.jpg`; // Using existing avatar
      case 'female':
        return `${img_path}assets/img/profiles/avatar-02.jpg`; // Using existing avatar
      default:
        return `${img_path}assets/img/profiles/avatar-01.jpg`;
    }
  };

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(getDefaultAvatar(props.gender));
    }
  };

  return (
    <img
      className={props.className}
      src={imgSrc}
      height={props.height}
      alt={props.alt}
      width={props.width}
      id={props.id}
      onError={handleImageError}
    />
  );
};

export default ImageWithBasePath;
