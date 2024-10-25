export interface Product {
  id: number;
  title: string;
  variants: Variant[];
  image: Image;
  discount?: Discount | null | undefined;
}
export interface Image {
  id: number;
  product_id: number;
  src: string;
}
export interface Variant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  discount?: Discount | null | undefined;
}
export interface Discount {
  type: "flat" | "percent";
  value: number;
}
