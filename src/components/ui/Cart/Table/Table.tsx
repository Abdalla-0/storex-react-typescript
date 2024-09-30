import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import styles from "./style.module.css";
import { getTotal } from "../../../../store/cart/cartSlice";
const { cartInput, tableSection } = styles;

type TValues = {
  [measurementId: string]: {
    price: number;
    quantity: number;
    discount: number;
    total: number;
  };
};

type TField = "price" | "quantity" | "discount";

const TableSection = () => {
  const { data } = useAppSelector((state) => state.cart);
  const dipatch = useAppDispatch();
  const [rowValues, setRowValues] = useState<TValues>({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      const initialValues: TValues = {};
      data.map((product) =>
        product.measurements.map((measurement) => {
          const quantity =
            rowValues[measurement.measurement_id]?.quantity ||
            product.quantity ||
            1;
          const price =
            rowValues[measurement.measurement_id]?.price ||
            measurement.price ||
            0;
          const discount =
            rowValues[measurement.measurement_id]?.discount ||
            measurement.discount ||
            0;
          initialValues[measurement.measurement_id] = {
            price,
            quantity,
            discount,
            total: price * quantity - discount,
          };
        })
      );
      setRowValues(initialValues);
      updateTotals(initialValues);
    }
  }, [data]);

  useEffect(() => {
    updateTotals(rowValues);
  }, [rowValues]);

  const updateTotals = (values: TValues) => {
    const newTotalQuantity = Object.values(values).reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const newTotalPrice = Object.values(values).reduce(
      (sum, item) => sum + item.total,
      0
    );
    const newTotalDiscount = Object.values(values).reduce(
      (sum, item) => sum + item.discount,
      0
    );

    setTotalQuantity(newTotalQuantity);
    setTotalPrice(newTotalPrice);
    setTotalDiscount(newTotalDiscount);
    dipatch(
      getTotal({
        totalQuantity: totalQuantity,
        totalPrice: totalPrice,
        totalDiscount: totalDiscount,
      })
    );
  };

  const changeHandler = (id: string, field: TField, value: number) => {
    setRowValues((prev) => {
      const updatedRowValues = {
        ...prev,
        [id]: {
          ...prev[id],
          [field]: value,
          total:
            (field === "price" ? value : prev[id].price) *
              (field === "quantity" ? value : prev[id].quantity) -
            (field === "discount" ? value : prev[id].discount),
        },
      };

      // Update totals after updating row values
      updateTotals(updatedRowValues);

      return updatedRowValues;
    });
  };

  let rowId = 1;
  return (
    <div className={tableSection}>
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
              product.measurements.map((measurement) => (
                <tr key={measurement.measurement_id}>
                  <td>{rowId++}</td>
                  <td>{measurement.mixname}</td>
                  <td>
                    <Form.Control
                      className={cartInput}
                      type="number"
                      value={
                        rowValues[measurement.measurement_id]?.quantity || 1
                      }
                      onChange={(e) =>
                        changeHandler(
                          measurement.measurement_id,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      className={cartInput}
                      type="number"
                      min={measurement.price_min ? measurement.price_min : 0}
                      max={999}
                      step={0.1}
                      value={rowValues[measurement.measurement_id]?.price || 0}
                      onChange={(e) =>
                        changeHandler(
                          measurement.measurement_id,
                          "price",
                          Number(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      className={cartInput}
                      type="number"
                      min={measurement.price_min ? measurement.price_min : 0}
                      step={0.1}
                      max={999}
                      value={
                        rowValues[measurement.measurement_id]?.discount || 0
                      }
                      onChange={(e) =>
                        changeHandler(
                          measurement.measurement_id,
                          "discount",
                          Number(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td>
                    {rowValues[measurement.measurement_id]?.total.toFixed(2) ||
                      0}
                  </td>
                </tr>
              ))
            )}
        </tbody>
      </Table>
    </div>
  );
};

export default TableSection;
