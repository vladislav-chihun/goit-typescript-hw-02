import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FormEvent } from "react";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = event.currentTarget.query.value.trim();
    if (!inputValue) {
      toast.error("Field is empty", {
         position: 'top-right',
      });
      return;
    }
    onSubmit(inputValue);
    event.currentTarget.query.value = ""; 
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.formInput}
        />
        <button type="submit" className={css.formBtn}>Search</button>
        <Toaster />
      </form>
    </header>
  );
}
