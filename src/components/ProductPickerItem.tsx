import React, { useEffect, useState } from "react";
import { Product, Variant } from "../types";

interface ListProductProps {
  item: Product;
  addToCurrentList: (item: Product, checkedVariants: Variant[]) => void;
  removeFromCurrentList: (index: number) => void;
  onVariantChange: (index: number, variants: Variant[]) => void;
}
function ProductPickerItem({
  item,
  addToCurrentList,
  removeFromCurrentList,
  onVariantChange,
}: ListProductProps) {
  const [checkedVariants, setCheckedVariants] = useState<Variant[]>([]);
  const [isParentChecked, setIsParentChecked] = useState<boolean>(false);

  useEffect(() => {
    if (isParentChecked) {
      setCheckedVariants(item.variants);
    } else {
      setCheckedVariants([]);
    }
  }, []);

  useEffect(() => {
    onVariantChange(item.id, checkedVariants);
  }, [checkedVariants]);
  const handleVariantCheck = (variant: Variant) => {
    setCheckedVariants((prev) => [...prev, variant]);
    setIsParentChecked(true);

    if (checkedVariants.length > 1) {
      setCheckedVariants((prev) => prev.filter((v) => v.id !== variant.id));
    }
  };

  const handleProductCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsParentChecked(isChecked);
    if (isChecked) {
      setCheckedVariants(item.variants);
      addToCurrentList(item, checkedVariants);
    } else {
      setCheckedVariants([]);
      removeFromCurrentList(item.id);
    }
  };

  return (
    <>
      <div className="flex flex-row m-2 items-center ">
        <input
          type="checkbox"
          className="h-5 w-5 m-3 rounded-md bg-teal-600"
          checked={isParentChecked}
          onChange={(e) => handleProductCheck(e)}
        />
        <img src={item.image.src} className="h-12 w-12 rounded-md ml-2 mr-4" />
        <h5>{item.title}</h5>
      </div>
      <div>
        {item.variants.map((variant: Variant, index) => (
          <div key={index} className="flex justify-between ml-16">
            <div>
              <input
                type="checkbox"
                className="h-5 w-5 m-3 rounded-md bg-teal-600"
                checked={checkedVariants.some((v) => v.id === variant.id)}
                onChange={() => handleVariantCheck(variant)}
              />

              <span>{variant.title}</span>
            </div>
            <span>$ {variant.price}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductPickerItem;
