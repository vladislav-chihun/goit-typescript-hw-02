import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: {
    smallImg: string;
    regularImg: string;
  }[];
  onImageClick: (image: string) => void;
}

export default function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  return (
    <div>
      <ul className={css.imgList}>
        {images.map((image, index) => (
          <li key={index} onClick={() => onImageClick(image.regularImg)}>
            <ImageCard smallImg={image.smallImg} />
          </li>
        ))}
      </ul>
    </div>
  );
}
