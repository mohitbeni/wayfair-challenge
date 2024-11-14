import { useEffect, useState } from "react";

const useGetProducts = (url) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => {
        setIsLoading(true);
        return res.json();
      })
      .then((json) => {
        setProducts(json);
        setFilteredProducts(json);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [url]);

  return { products, isLoading, error, filteredProducts, setFilteredProducts };
};

export default useGetProducts;
