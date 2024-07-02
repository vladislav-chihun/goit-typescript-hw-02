import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  handleLoadMore: () => void;
}

export default function LoadMoreBtn({ handleLoadMore }: LoadMoreBtnProps) {
  return (
    <div className={css.loadMoreBtnContainer}>
      <button type="button" className={css.loadMoreBtn} onClick={handleLoadMore}>
        Load more
      </button>
    </div>
  );
}
