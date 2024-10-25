import React, { useState } from "react";
import { Discount, Product, Variant } from "../types";

interface DiscountInputProps {
  onDiscountChange: (discount: Discount) => void;
  item: Product | Variant;
}

const DiscountInput: React.FC<DiscountInputProps> = ({
  onDiscountChange,
  item,
}) => {
  const [discountType, setDiscountType] = useState<Discount["type"]>("percent");
  const [discountValue, setDiscountValue] = useState<number>(0);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setDiscountValue(newValue);
    onDiscountChange({ type: discountType, value: newValue });
  };
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value as Discount["type"];
    setDiscountType(newType);
    onDiscountChange({ type: newType, value: discountValue });
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="number"
        className="border w-16 p-2 rounded-lg shadow shadow-gray-300 items-center px-2 py-1"
        value={item.discount?.value}
        onChange={handleValueChange}
        placeholder="Discount value"
      />
      <select
        className="border p-2 rounded-lg shadow shadow-gray-300 items-center px-2 py-1"
        value={item.discount?.type}
        onChange={handleTypeChange}
      >
        <option value="flat">Flat Discount</option>
        <option value="percent">Percent Off</option>
      </select>
    </div>
  );
};

export default DiscountInput;
