import { useState } from "react";
import Details from "./Details/Details";
import TableSection from "./Table/Table";
import styles from "./style.module.css";
import { TTotals } from "../../../types/totals";
const { cart } = styles;

const Cart = () => {
  const [totals, setTotals] = useState<TTotals>({
    quantity: 0,
    price: 0,
    discount: 0,
  });
  const totalsHandler = (newTotals: TTotals) => {
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
