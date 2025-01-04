import { useState } from "react";
import Details from "./Details/Details";
import TableSection from "./Table/Table";
import styles from "./style.module.css";
const { cart } = styles;

interface Totals {
  quantity: number;
  price: number;
  discount: number;
}
const Cart = () => {
  const [totals, setTotals] = useState<Totals>({
    quantity: 0,
    price: 0,
    discount: 0,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalsHandler = (newTotals: Totals) => {
    setTotals(newTotals);
  };
  return (
    <div className={cart}>
      <TableSection totalsHandler={totalsHandler} />
      <Details totals={totals} />
    </div>
  );
};

export default Cart;
