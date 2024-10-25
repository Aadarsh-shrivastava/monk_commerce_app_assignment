import { useState } from "react";
import { Draggable, CrossIcon, Edit } from "../Icon";
import { Discount, Product, Variant } from "../types";
import { useProductList } from "../contexts/productListContext";
import DiscountInput from "./DiscountInput";
import { Reorder } from "framer-motion";
import ProductPicker from "./ProductPicker";

interface ListItemProps {
  index: number;
  item: Product;
}
function ListItem({ index, item }: ListItemProps) {
  const [showVariants, seShtoVariants] = useState<boolean>(false);
  const [showEditor, setSHowEditor] = useState<boolean>(false);
  const { removeProduct, setProductDiscount, setProductVariants } =
    useProductList();

  const toggleDiscount = () => {
    if (item.discount) setProductDiscount(item.id, null);
    else setProductDiscount(item.id, { type: "percent", value: 0 });
  };
  return (
    <div className="flex flex-col gap-2 items-center p-4">
      {/* <p>{JSON.stringify(item)}</p> */}
      {showEditor && (
        <ProductPicker
          onClose={() => setSHowEditor(false)}
          isUpdate
          updateIndex={index - 1}
        />
      )}
      <div className="flex flex-row gap-2 items-center p-4">
        <Draggable />
        <span>{index}</span>
        <div className="flex flex-row justify-between w-96  rounded-sm shadow shadow-gray-300 items-center px-2 py-1">
          <span>{item.title}</span>
          <div onClick={() => setSHowEditor(true)}>
            <Edit />
          </div>
        </div>
        {!item.discount ? (
          <button
            onClick={toggleDiscount}
            className=" bg-teal-700 text-white px-3 py-1 rounded-md mx-6"
          >
            Add Discount
          </button>
        ) : (
          <DiscountInput
            onDiscountChange={(discount: Discount) => {
              setProductDiscount(item.id, {
                type: discount.type,
                value: discount.value,
              });
            }}
            item={item}
          />
        )}

        <div onClick={() => removeProduct(item.id)}>
          <CrossIcon />
        </div>
      </div>
      <button
        className="self-end px-12"
        onClick={() => seShtoVariants(!showVariants)}
      >
        {showVariants ? "Hide Variants" : "Show Variants"}
      </button>
      {showVariants && (
        <div className="flex flex-col ">
          {item && (
            <Reorder.Group
              axis="y"
              values={item.variants}
              onReorder={(variants) => {
                setProductVariants(item.id, variants);
              }}
            >
              {item.variants.map((variant, index) => (
                <Reorder.Item key={variant.id} value={variant}>
                  <VariantItem
                    variant={variant}
                    index={index}
                    productId={item.id}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
        </div>
      )}
    </div>
  );
}

const VariantItem = ({
  variant,
  productId,
}: {
  variant: Variant;
  index: number;
  productId: number;
}) => {
  const { removeVariant, setVariantDiscount } = useProductList();
  return (
    <div className="flex flex-row justify-between gap-4 w-full items-center p-2 self-end">
      <div className="flex-shrink-0">
        <Draggable />
      </div>

      <div className="flex-grow rounded-2xl w-72 shadow shadow-gray-300 px-4 py-2 bg-white">
        <span className="text-base font-medium">{variant.title}</span>
      </div>

      {variant.discount && (
        <DiscountInput
          onDiscountChange={(discount: Discount) => {
            setVariantDiscount(productId, variant.id, discount);
          }}
          item={variant}
        />
      )}

      {/* Cross Icon */}
      <div
        onClick={() => {
          removeVariant(productId, variant.id);
        }}
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
      >
        <CrossIcon />
      </div>
    </div>
  );
};

export default ListItem;
