import { useAppSelector } from "../../../../store/hook";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import styles from "./style.module.css";
const { cartInput } = styles;

const TableSection = () => {
  const { data } = useAppSelector((state) => state.cart);
  const [quantity, setQuantity] = useState<number | undefined>();
  const [price, setPrice] = useState<string | number>("");
  const [discount, setDiscount] = useState<string | number>("");
  const [total, setTotal] = useState<string | number>("");
  let priceTest: string | number;
  const quantityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
    // setTotal(price - discount);
  };
  const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
    setTotal(price - discount);
  };
  const discountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscount(e.target.value);
    setTotal(price - discount);
  };

  useEffect(() => {
    if (data.length > 0) {
      data.map((product) => {
        product.measurements.map((el) => {
          if (el.price) {
            setPrice(el.price);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            priceTest = el.price;
          }
          if (el.discount) {
            setDiscount(el.discount);
          }
          setQuantity(product.quantity);
          setTotal(el.price ? el.price - el.discount : "");
        });
      });
    }
  }, [data]);

  return (
    <div>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>العناصر</th>
            <th>الكمية</th>
            <th>السعر</th>
            <th>الخصم</th>
            <th>المجموع</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((product) =>
              product.measurements.map((measurement, index) => (
                <tr key={measurement.measurement_id}>
                  <td>{index + 1}</td>
                  <td>{measurement.mixname}</td>
                  <td>
                    <Form.Control
                      className={cartInput}
                      type="number"
                      value={quantity && quantity}
                      onChange={quantityHandler}
                    />
                  </td>
                  <td>
                    <Form.Control
                      className={cartInput}
                      type="number"
                      value={priceTest && priceTest}
                      // onChange={priceHandler}
                    />
                  </td>
                  <td>
                    <Form.Control
                      className={cartInput}
                      type="number"
                      value={discount && discount}
                      // onChange={discountHandler}
                    />
                  </td>
                  <td>{total && total}</td>
                </tr>
              ))
            )}
        </tbody>
      </Table>
    </div>
  );
};

export default TableSection;
