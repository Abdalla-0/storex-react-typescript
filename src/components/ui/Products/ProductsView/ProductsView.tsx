import { Button, Col, Modal, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { actionGetProducts } from "../../../../store/Products/productsSlice";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { TProduct, TMeasurement } from "../../../../types";
const { product } = styles;

const { productsView } = styles;

const ProductsView = ({ getItem }: { getItem: (item: TProduct) => void }) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.products);

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TProduct | null>(null);
  const [selectedMeasurement, setSelectedMeasurement] =
    useState<TMeasurement | null>(null);

  const addToCartHandler = (item: TProduct) => {
    if (item.measurements.length > 1) {
      setSelectedItem(item);
      setShow(true);
      const productMeasurement = item.measurements.filter(
        (measurement) => measurement === selectedMeasurement
      );

      const updatedItem = { ...item, measurements: productMeasurement };

      getItem(updatedItem);
    } else {
      getItem(item);
    }
  };

  useEffect(() => {
    dispatch(actionGetProducts());
  }, [dispatch]);

  return (
    <div className={productsView}>
      <Row className="row-gap-3">
        {Array.isArray(data) &&
          data.map((el) => (
            <Col xs={6} xl={4} key={el.product_id}>
              <div className={product} onClick={() => addToCartHandler(el)}>
                {el.product_name}
              </div>
            </Col>
          ))}
      </Row>
      {
        <Modal size="lg" show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedItem && selectedItem.product_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row
              className="fw-bold py-3"
              style={{ borderBlockEnd: "1px solid #d5d5d5" }}
            >
              <Col>الخصائص</Col>
              <Col xs={2}>السعر</Col>
              <Col xs={2}>الكمية</Col>
              <Col xs={3}></Col>
            </Row>
            {selectedItem &&
              selectedItem.measurements.map((measurement) => (
                <Row
                  key={measurement.measurement_id}
                  className="py-2"
                  style={{ borderBlockEnd: "1px solid #d5d5d5" }}
                >
                  <Col>{measurement.nickname}</Col>
                  <Col xs={2}>
                    {measurement.price ? measurement.price : "غير مسعر"}
                  </Col>
                  <Col xs={2}>311</Col>
                  <Col xs={3}>
                    <Button
                      className="w-100"
                      variant="primary"
                      onClick={() => {
                        setSelectedMeasurement(measurement);
                      }}
                    >
                      اختيار
                    </Button>
                  </Col>
                </Row>
              ))}
          </Modal.Body>
        </Modal>
      }
    </div>
  );
};

export default ProductsView;
