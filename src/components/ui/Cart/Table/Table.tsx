import Table from "react-bootstrap/Table";
// import styles from "./style.module.css";
// import Form from "react-bootstrap/Form";
// import { useEffect, useState } from "react";

// const { cartInput } = styles;

const TableSection = () => {
  // const [quantity, setQuantity] = useState<string | number>("");
  // const [price, setPrice] = useState<string | number>("");
  // const [discount, setDiscount] = useState<string | number>("");
  // const [total, setTotal] = useState<string | number>("");

  // const quantityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setQuantity(e.target.value);
  //   // setTotal(price - discount);
  // };
  // const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPrice(e.target.value);
  //   setTotal(price - discount);
  // };
  // const discountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setDiscount(e.target.value);
  //   setTotal(price - discount);
  // };

  // useEffect(() => {
  //   if (products.length > 0) {
  //     products.map((product) => {
  //       product.measurements.map((el) => {
  //         if (el.price) {
  //           setPrice(el.price);
  //         }
  //         if (el.discount) {
  //           setDiscount(el.discount);
  //         }
  //         setTotal(el.price ? el.price - el.discount : "");
  //       });
  //     });
  //   }
  // }, [products]);

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
          {/* {products &&
            products.map((product) =>
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
                      value={price && price}
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
            )} */}
        </tbody>
      </Table>
    </div>
  );
};

export default TableSection;
