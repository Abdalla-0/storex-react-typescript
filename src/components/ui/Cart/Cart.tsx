import { useAppSelector } from "../../../store/hook";
import TableSection from "./Table/Table";
import styles from "./style.module.css";
const { cart } = styles;

const Cart = () => {
  const { data } = useAppSelector((state) => state.cart);
  if (data) {
    console.log(data);
  }

  return (
    <div className={cart}>
      <TableSection />
    </div>
  );
};

export default Cart;
