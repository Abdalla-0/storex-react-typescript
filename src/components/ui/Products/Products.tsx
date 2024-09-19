import { TProduct } from "../../../types";
import ProductsSearch from "./ProductsSearch/ProductsSearch";
import ProductsView from "./ProductsView/ProductsView";
import styles from "./style.module.css";
const { products } = styles;
const ProductsSection = ({ getItem }: { getItem: TProduct }) => {
  return (
    <div className={products}>
      <ProductsSearch />
      <ProductsView getItem={getItem} />
    </div>
  );
};

export default ProductsSection;
