import css from "./ImageCard.module.css";

interface ImageCardProps {
  smallImg: string;
}

export default function ImageCard({ smallImg }: ImageCardProps) {
  return (
    <div>
      <img src={smallImg} className={css.imgCard} />
    </div>
  );
}
