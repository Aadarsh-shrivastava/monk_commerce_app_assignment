import { useState } from "react";
import ListItem from "../../components/ListItem";
import ProductPicker from "../../components/ProductPicker";
import { useProductList } from "../../contexts/productListContext";
import { Reorder } from "framer-motion";

function HomeScreen() {
  const [showProductPicker, setShowProductPicker] = useState<boolean>(false);
  const { productList, setProductList } = useProductList();
  return (
    <>
      {showProductPicker && (
        <ProductPicker onClose={() => setShowProductPicker(false)} />
      )}
      <div className="flex justify-center items-center p-5">
        <div className="w-full">
          <h5 className="font-bold">Add Products</h5>
          {productList && (
            <Reorder.Group
              axis="y"
              values={productList}
              onReorder={setProductList}
            >
              {productList.map((item, index) => (
                <Reorder.Item key={item.id} value={item} className="w-full">
                  <ListItem index={index + 1} key={item.id} item={item} />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
          <button
            className="p-2 rounded-md content-center border-teal-600 border-2 w-32 items-end"
            onClick={() => setShowProductPicker(!showProductPicker)}
          >
            Add Product
          </button>
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
