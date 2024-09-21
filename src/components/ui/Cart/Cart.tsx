import { TProduct } from "../../../types";
import TableSection from "./Table/Table";
import styles from "./style.module.css";
const { cart } = styles;

const Cart = ({ products }: { products: TProduct[] }) => {
  return (
    <div className={cart}>
      <TableSection products={products} />
    </div>
  );
};

export default Cart;
