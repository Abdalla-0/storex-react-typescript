import { useAppSelector } from "../../../../store/hook";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import styles from "./style.module.css";
const { cartInput } = styles;

type TValues = {
  [measurementId: string]: {
    price: number;
    quantity: number;
    discount: number;
    total: number;
  };
};

const TableSection = () => {
  const { data } = useAppSelector((state) => state.cart);
  const [values, setValues] = useState<TValues>({});

  const handleValueChange = (
    measurementId: string,
    field: "price" | "quantity" | "discount",
    value: string | number
  ) => {
    const updatedValues = {
      ...values,
      [measurementId]: {
        ...values[measurementId],
        [field]: Number(value),
        total: (
          (field === "quantity"
            ? Number(value)
            : values[measurementId].quantity) *
            (field === "price" ? Number(value) : values[measurementId].price) -
          (field === "discount"
            ? Number(value)
            : values[measurementId].discount)
        ).toFixed(2),
      },
    };
    setValues(updatedValues as TValues);
  };

  // Initialize values when data is loaded
  useEffect(() => {
    if (data.length > 0) {
      const initialValues: TValues = {};
      data.forEach((product) => {
        product.measurements.forEach((measurement) => {
          initialValues[measurement.measurement_id] = {
            price: measurement.price || 0,
            quantity: product.quantity || 1,
            discount: measurement.discount || 0,
            total:
              (measurement.price || 0) * (product.quantity || 1) -
              (measurement.discount || 0),
          };
        });
      });
      setValues(initialValues);
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
                      value={values[measurement.measurement_id]?.quantity || 1}
                      onChange={(e) =>
                        handleValueChange(
                          measurement.measurement_id,
                          "quantity",
                          e.target.value
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
                      value={values[measurement.measurement_id]?.price || 0}
                      onChange={(e) =>
                        handleValueChange(
                          measurement.measurement_id,
                          "price",
                          e.target.value
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
                      value={values[measurement.measurement_id]?.discount || 0}
                      onChange={(e) =>
                        handleValueChange(
                          measurement.measurement_id,
                          "discount",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>{values[measurement.measurement_id]?.total || 0}</td>
                </tr>
              ))
            )}
        </tbody>
      </Table>
    </div>
  );
};

export default TableSection;
