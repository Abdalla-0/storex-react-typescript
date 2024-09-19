import TableSection from "./Table/Table";
import styles from "./style.module.css";
const { cart } = styles;

const Cart = () => {
  return (
    <div className={cart}>
      <TableSection />
    </div>
  );
};

export default Cart;
