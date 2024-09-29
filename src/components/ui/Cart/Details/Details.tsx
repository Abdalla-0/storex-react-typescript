import { Col, Form, Row } from "react-bootstrap";
import styles from "./style.module.css";
import { TTotals } from "../../../../types/totals";
import { useState } from "react";
const { detailsSection, item, totalQuantities, total } = styles;

const Details = ({ totals }: { totals: TTotals }) => {
  // const [totalLast, setTotalLast] = useState();
  // const discoutOnTotals = (value: string) => {
  //   setTotalLast(totals.price - Number(value));
  // };
  return (
    <div className={detailsSection}>
      <Row>
        <Col sm={6}>
          <div className={`${item} ${totalQuantities}`}>
            <span>اجمالي الكميات</span>
            <span>{totals.quantity}</span>
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
            <span>{totals.discount} جنية</span>
          </div>
        </Col>
      </Row>
      <Row className={total}>
        <Col sm={6}>
          <span>الاجمالي</span>
        </Col>
        <Col sm={6}>
          <span>{totals.price} جنية</span>
        </Col>
      </Row>
    </div>
  );
};

export default Details;
