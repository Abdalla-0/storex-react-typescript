import { Col, Form, Row } from "react-bootstrap";
import styles from "./style.module.css";
import { useAppSelector } from "../../../../store/hook";

const { detailsSection, item, totalQuantities, total } = styles;
interface Totals {
  quantity: number;
  price: number;
  discount: number;
}
interface DetailsProps {
  totals: Totals;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Details: React.FC<DetailsProps> = ({ totals }) => {
  const totalValues = useAppSelector((state) => state.cart.total);

  // const discoutOnTotals = (value: string) => {
  //   setTotalPrice(totalValues.totalPrice - Number(value));
  // };

  return (
    <div className={detailsSection}>
      <Row>
        <Col sm={6}>
          <div className={`${item} ${totalQuantities}`}>
            <span>اجمالي الكميات</span>
            <span>{totalValues.totalQuantity}</span>
          </div>
        </Col>
        <Col sm={6}>
          <div className={item}>
            <span>قيمة الضريبة</span>
            <span>0 جنية</span>
          </div>
        </Col>
        <Col sm={6}>
          <div className={item}>
            <span>الخصم على الفاتورة</span>
            <Form.Control
              type="number"
              style={{ width: "80px" }}
              // onChange={(e) => discoutOnTotals(e.target.value)}
            />
          </div>
        </Col>
        <Col sm={6}>
          <div className={item}>
            <span>اجمالي الخصم</span>
            <span>{totalValues.totalDiscount} جنية</span>
          </div>
        </Col>
      </Row>
      <Row className={total}>
        <Col sm={6}>
          <span>الاجمالي</span>
        </Col>
        <Col sm={6}>
          <span>{totalValues.totalPrice} جنية</span>
        </Col>
      </Row>
    </div>
  );
};

export default Details;
