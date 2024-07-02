import css from "./ImageCard"
export default function ImageCard({ smallImg }) {
  return (
    <div >
      <img src={smallImg} className={css.imgCard}  />
    </div>
  );
}
