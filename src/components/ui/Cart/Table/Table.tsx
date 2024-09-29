import { useAppSelector } from "../../../../store/hook";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import styles from "./style.module.css";
import { TTotals } from "../../../../types/totals";
const { cartInput, tableSection } = styles;

type TValues = {
  [measurementId: string]: {
    price: number;
    quantity: number;
    discount: number;
    total: number;
  };
};

const TableSection = ({
  totalsHandler,
}: {
  totalsHandler(totals: TTotals): void;
}) => {
  const { data } = useAppSelector((state) => state.cart);
  const [values, setValues] = useState<TValues>({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); // Total price accumulator
  const [totalDiscount, setTotalDiscount] = useState(0); // Total discount accumulator

  const totals: TTotals = {
    quantity: totalQuantity,
    price: totalPrice,
    discount: totalDiscount,
  };

  // Handle value changes (price, quantity, discount)
  const handleValueChange = (
    measurementId: string,
    field: "price" | "quantity" | "discount",
    value: string | number
  ) => {
    const updatedValue = Number(value);
    const currentMeasurement = values[measurementId] || {
      price: 0,
      quantity: 1,
      discount: 0,
      total: 0,
    };

    // Update the field
    const updatedValues = {
      ...values,
      [measurementId]: {
        ...currentMeasurement,
        [field]: updatedValue,
        // Recalculate total based on updated field
        total: (
          (field === "quantity" ? updatedValue : currentMeasurement.quantity) *
            (field === "price" ? updatedValue : currentMeasurement.price) -
          (field === "discount" ? updatedValue : currentMeasurement.discount)
        ).toFixed(2),
      },
    };

    setValues(updatedValues as TValues);

    // Update total quantity, total price, and total discount
    const newTotalQuantity = Object.values(updatedValues).reduce(
      (sum, measurement) => sum + measurement.quantity,
      0
    );
    const newTotalPrice = Object.values(updatedValues).reduce(
      (sum, measurement) => sum + Number(measurement.total),
      0
    );
    const newTotalDiscount = Object.values(updatedValues).reduce(
      (sum, measurement) => sum + measurement.discount,
      0
    );

    setTotalQuantity(newTotalQuantity);
    setTotalPrice(newTotalPrice);
    setTotalDiscount(newTotalDiscount);
  };

  // Initialize values when data is loaded
  useEffect(() => {
    if (data.length > 0) {
      const initialValues: TValues = {};
      const initialValuesTest: {
        [id: string]: {
          price: number;
          quantity: number;
          discount: number;
          total: number;
        };
      } = {};
      let totalQuantityValue = 0;
      let totalPriceValue = 0;
      let totalDiscountValue = 0;

      data.map((product) => {
        product.measurements.map((measurement) => {
          const quantity = product.quantity || 1;
          const price = measurement.price || 0;
          const discount = measurement.discount || 0;
          const total = price * quantity - discount;
          initialValuesTest[measurement.measurement_id] = {
            price: price,
            quantity: quantity,
            discount: discount,
            total: total,
          };

          initialValues[measurement.measurement_id] = {
            price,
            quantity,
            discount,
            total,
          };

          totalQuantityValue += quantity;
          totalPriceValue += total;
          totalDiscountValue += discount; // Accumulate discount
        });
      });
      setValues(initialValues);
      setTotalQuantity(totalQuantityValue);
      setTotalPrice(totalPriceValue);
      setTotalDiscount(totalDiscountValue);
    }
  }, [data]);

  // Notify parent component when totals change
  useEffect(() => {
    handleTotals(totals);
  }, [totalQuantity, totalPrice, totalDiscount]);

  const handleTotals = (totals: TTotals) => {
    totalsHandler(totals);
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
// import { useAppSelector } from "../../../../store/hook";
// import { useEffect, useState } from "react";
// import Form from "react-bootstrap/Form";
// import Table from "react-bootstrap/Table";
// import styles from "./style.module.css";
// import { TTotals } from "../../../../types/totals";
// const { cartInput, tableSection } = styles;

// type TValues = {
//   [measurementId: string]: {
//     price: number;
//     quantity: number;
//     discount: number;
//     total: number;
//   };
// };

// const TableSection = ({
//   totalsHandler,
// }: {
//   totalsHandler(totals: TTotals): void;
// }) => {
//   const { data } = useAppSelector((state) => state.cart);
//   const [values, setValues] = useState<TValues>({});
//   const [totalQuantity, setTotalQuantity] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0); // Total price accumulator
//   const [totalDiscount, setTotalDiscount] = useState(0); // Total discount accumulator

//   const totals: TTotals = {
//     quantity: totalQuantity,
//     price: totalPrice,
//     discount: totalDiscount,
//   };

//   // Handle value changes (price, quantity, discount)
//   const handleValueChange = (
//     measurementId: string,
//     field: "price" | "quantity" | "discount",
//     value: string | number
//   ) => {
//     const updatedValue = Number(value);
//     const currentMeasurement = values[measurementId] || {
//       price: 0,
//       quantity: 1,
//       discount: 0,
//       total: 0,
//     };

//     // Update the field
//     const updatedValues = {
//       ...values,
//       [measurementId]: {
//         ...currentMeasurement,
//         [field]: updatedValue,
//         // Recalculate total based on updated field
//         total: (
//           (field === "quantity" ? updatedValue : currentMeasurement.quantity) *
//             (field === "price" ? updatedValue : currentMeasurement.price) -
//           (field === "discount" ? updatedValue : currentMeasurement.discount)
//         ).toFixed(2),
//       },
//     };

//     setValues(updatedValues as TValues);

//     // Update total quantity, total price, and total discount
//     const newTotalQuantity = Object.values(updatedValues).reduce(
//       (sum, measurement) => sum + measurement.quantity,
//       0
//     );
//     const newTotalPrice = Object.values(updatedValues).reduce(
//       (sum, measurement) => sum + Number(measurement.total),
//       0
//     );
//     const newTotalDiscount = Object.values(updatedValues).reduce(
//       (sum, measurement) => sum + measurement.discount,
//       0
//     );

//     setTotalQuantity(newTotalQuantity);
//     setTotalPrice(newTotalPrice);
//     setTotalDiscount(newTotalDiscount);
//   };

//   // Initialize values when data is loaded
//   useEffect(() => {
//     if (data.length > 0) {
//       const initialValues: TValues = {};
//       let totalQuantityValue = 0;
//       let totalPriceValue = 0;
//       let totalDiscountValue = 0;

//       data.forEach((product) => {
//         product.measurements.forEach((measurement) => {
//           const quantity = product.quantity || 1;
//           const price = measurement.price || 0;
//           const discount = measurement.discount || 0;
//           const total = price * quantity - discount;

//           initialValues[measurement.measurement_id] = {
//             price,
//             quantity,
//             discount,
//             total,
//           };

//           totalQuantityValue += quantity;
//           totalPriceValue += total;
//           totalDiscountValue += discount; // Accumulate discount
//         });
//       });

//       setValues(initialValues);
//       setTotalQuantity(totalQuantityValue);
//       setTotalPrice(totalPriceValue);
//       setTotalDiscount(totalDiscountValue);
//     }
//   }, [data]);

//   // Notify parent component when totals change
//   useEffect(() => {
//     handleTotals(totals);
//   }, [totalQuantity, totalPrice, totalDiscount]);

//   const handleTotals = (totals: TTotals) => {
//     totalsHandler(totals);
//   };

//   let rowId = 1;
//   return (
//     <div className={tableSection}>
//       <Table responsive="sm">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>العناصر</th>
//             <th>الكمية</th>
//             <th>السعر</th>
//             <th>الخصم</th>
//             <th>المجموع</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data &&
//             data.map((product) =>
//               product.measurements.map((measurement) => (
//                 <tr key={measurement.measurement_id}>
//                   <td>{rowId++}</td>
//                   <td>{measurement.mixname}</td>
//                   <td>
//                     <Form.Control
//                       className={cartInput}
//                       type="number"
//                       value={values[measurement.measurement_id]?.quantity || 1}
//                       onChange={(e) =>
//                         handleValueChange(
//                           measurement.measurement_id,
//                           "quantity",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </td>
//                   <td>
//                     <Form.Control
//                       className={cartInput}
//                       type="number"
//                       min={measurement.price_min ? measurement.price_min : 0}
//                       max={999}
//                       step={0.1}
//                       value={values[measurement.measurement_id]?.price || 0}
//                       onChange={(e) =>
//                         handleValueChange(
//                           measurement.measurement_id,
//                           "price",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </td>
//                   <td>
//                     <Form.Control
//                       className={cartInput}
//                       type="number"
//                       min={measurement.price_min ? measurement.price_min : 0}
//                       step={0.1}
//                       max={999}
//                       value={values[measurement.measurement_id]?.discount || 0}
//                       onChange={(e) =>
//                         handleValueChange(
//                           measurement.measurement_id,
//                           "discount",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </td>
//                   <td>{values[measurement.measurement_id]?.total || 0}</td>
//                 </tr>
//               ))
//             )}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default TableSection;
