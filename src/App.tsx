import appCss from "./App.module.css";
import { apiFoo, Image as ApiImage } from "./api";
import SearchBar from "./components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

interface Image {
  smallImg: string;
  regularImg: string;
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<Image[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [totalPage, setTotalPage] = useState<boolean>(false);

  const handleSearch = (query: string) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (query.trim() === "") {
        return;
    }
    const fetchImages = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await apiFoo(query, page);
        const imageData = data.results.map((image: ApiImage) => ({
          smallImg: image.urls.small,
          regularImg: image.urls.regular,
        }));
        setImages((prevData) => [...prevData, ...imageData]);
        setTotalPage(data.total_pages !== page);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (largeImg: string) => {
    setSelectedImage(largeImg);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {images.length === 0 && query !== "" && !isError && !isLoading && <p className={appCss.noImgFound}>No Images Found</p>}
      {images.length > 0 && <ImageGallery images={images} onImageClick={handleImageClick} />}
      {images.length > 0 && totalPage && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
      <ImageModal isOpen={isModalOpen} onRequestClose={handleCloseModal} largeImg={selectedImage} />
    </div>
  );
}

export default App;
