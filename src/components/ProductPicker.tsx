import ProductPickerItem from "./ProductPickerItem";
import { Product, Variant } from "../types";
import { SearchIcon, CrossIcon } from "../Icon";
import { useProductList } from "../contexts/productListContext";
import { useCallback, useEffect, useRef, useState } from "react";
import ActivityIndicator from "./ActivityIndicator";

interface ProductPickerProps {
  onClose: () => void;
  isUpdate?: boolean;
  updateIndex?: number;
}
function ProductPicker({
  onClose,
  isUpdate = false,
  updateIndex,
}: ProductPickerProps) {
  const { addProducts } = useProductList();
  const [currentList, setCurrentList] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [query, setQuery] = useState<string | null>("");

  const addToCurrentList = (
    item: Product,
    checkedVariants: typeof item.variants
  ) => {
    setCurrentList((prevList) => {
      return [...prevList, { ...item, variants: checkedVariants }];
    });
  };

  const removeFromCurrentList = (productId: number) =>
    setCurrentList((prevList) =>
      prevList.filter((product) => product.id !== productId)
    );
  const fetchProducts = async () => {
    setIsLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": process.env.VITE_API_KEY ?? "",
      },
    };
    const res = await fetch(
      `https://stageapi.monkcommerce.app/task/products/search?${
        query ? `search=${query}&` : ""
      }page=${page}&limit=${limit}`,
      options
    );
    if (!res.ok) throw new Error(res.statusText + res.status.toString());

    const data = await res.json();
    if (data) {
      setProducts((prevProducts) => [...prevProducts, ...data]);
      setHasNextPage(data.length === limit);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, query]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasNextPage, isLoading]);

  const productListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        productListRef.current &&
        productListRef.current.scrollTop +
          productListRef.current.clientHeight >=
          productListRef.current.scrollHeight
      ) {
        loadMore();
      }
    };

    const currentRef = productListRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadMore]);

  const onVariantChange = (productId: number, variants: Variant[]) => {
    setCurrentList((prevList) => {
      return prevList.map((product) =>
        product.id === productId ? { ...product, variants } : product
      );
    });
  };

  const onQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setProducts([]);
  };

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const debouncedQueryChange = useCallback((func: Function, delay: number) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => func(), delay);
  }, []);

  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full"
    >
      <div className="relative p-4 w-full max-w-2xl  ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-100 ">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Select Products
            </h3>
            <button
              type="button"
              onClick={() => onClose()}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
            >
              <CrossIcon />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <div className="flex items-center">
              <SearchIcon />
              <input
                type="text"
                className="w-full bg-transparent border px-4 py-1 text-gray-900"
                placeholder="Search Product"
                onChange={(e) => {
                  const value = e.target.value;
                  debouncedQueryChange(() => onQueryChange(value), 1000);
                }}
              />
            </div>

            <div
              ref={productListRef}
              className="text-base leading-relaxed text-gray-900 h-60 overflow-y-auto"
            >
              {products.map((item: Product) => (
                <ProductPickerItem
                  item={item}
                  key={item.id + item.title.toString()}
                  onVariantChange={onVariantChange}
                  addToCurrentList={addToCurrentList}
                  removeFromCurrentList={removeFromCurrentList}
                />
              ))}
              {isLoading && (
                <div className="m-auto items-center">
                  <ActivityIndicator />
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between p-4 md:p-5 border-t border-gray-200 rounded-b">
            <div>
              <span>
                {currentList.length} Product{currentList.length > 1 ? "s" : ""}
                selected
              </span>
            </div>
            <div className="justify-end">
              <button
                data-modal-hide="default-modal"
                type="button"
                onClick={() => onClose()}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200"
              >
                Cancel
              </button>
              <button
                data-modal-hide="default-modal"
                type="button"
                onClick={() => {
                  isUpdate
                    ? addProducts(currentList, updateIndex)
                    : addProducts(currentList);
                  onClose();
                }}
                className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 mx-2 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPicker;
