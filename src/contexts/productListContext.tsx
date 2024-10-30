import React, { createContext, ReactNode, useContext, useState } from "react";
import { Discount, Product, Variant } from "../types";

type productListContextType = {
  productList: Product[];
  addProducts: ((products: Product[], index?: number) => void) | (() => void);
  removeProduct: (productId: number) => void;
  removeVariant: (productId: number, variantId: number) => void;
  setProductDiscount: (
    productId: number,
    discount: Discount | null | undefined
  ) => void;
  setVariantDiscount: (
    productId: number,
    variantId: number,
    discount: Discount | null | undefined
  ) => void;
  setProductList: (newProductList: Product[]) => void;
  setProductVariants: (productId: number, variants: Variant[]) => void;
};

const ProductListContext = createContext<productListContextType | undefined>(
  undefined
);

export const ProductListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [productList, setProductList] = useState<Product[]>([]);

  const addProducts = (products: Product[], index?: number) => {
    let deleteCount = 0;

    if (index === undefined) {
      index = productList.length;
    } else {
      deleteCount = 1;
    }

    const uniqueProducts = products.filter(
      (newProduct) =>
        !productList.some((product) => product.id === newProduct.id)
    );

    if (uniqueProducts.length === 0) return;

    const newProductList = [...productList];
    newProductList.splice(index, deleteCount, ...uniqueProducts);

    setProductList(newProductList);
  };

  const removeProduct = (productId: number) => {
    setProductList((prevList) =>
      prevList.filter((product) => product.id !== productId)
    );
  };

  const removeVariant = (productId: number, variantId: number) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === productId && product.variants.length > 1
          ? {
              ...product,
              variants: product.variants.filter(
                (variant) => variant.id !== variantId
              ),
            }
          : product
      )
    );
  };

  const setProductDiscount = (
    productId: number,
    discount: Discount | null | undefined
  ) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === productId
          ? {
              ...product,
              discount,
              variants: product.variants.map((variant) => ({
                ...variant,
                discount,
              })),
            }
          : product
      )
    );
  };

  const setVariantDiscount = (
    productId: number,
    variantId: number,
    discount: Discount | null | undefined
  ) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === productId
          ? {
              ...product,
              variants: product.variants.map((variant) =>
                variant.id === variantId ? { ...variant, discount } : variant
              ),
            }
          : product
      )
    );
  };

  const setProductVariants = (productId: number, variants: Variant[]) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === productId ? { ...product, variants } : product
      )
    );
  };

  return (
    <ProductListContext.Provider
      value={{
        productList,
        addProducts,
        removeProduct,
        removeVariant,
        setProductDiscount,
        setVariantDiscount,
        setProductList,
        setProductVariants,
      }}
    >
      {children}
    </ProductListContext.Provider>
  );
};

export const useProductList = () => {
  const context = useContext(ProductListContext);
  if (context === undefined)
    throw new Error("useproductList must be used within the theme preovider");
  return context;
};
