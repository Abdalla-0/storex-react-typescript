import { Button, Col, Modal, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { actionGetProducts } from "../../../../store/Products/productsSlice";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { TProduct, TMeasurement } from "../../../../types";
import { addToCart } from "../../../../store/cart/cartSlice";
const { product } = styles;

const { productsView } = styles;

const ProductsView = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.products);
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TProduct | null>(null);

  const addToCartHandler = (item: TProduct) => {
    if (item.measurements.length > 1) {
      setSelectedItem(item);
      setShow(true);
    } else {
      dispatch(addToCart(item));
    }
  };

  const updatedItemHandler = (selectedMeasurement: TMeasurement) => {
    const productMeasurement = selectedItem?.measurements.filter(
      (measurement) => measurement === selectedMeasurement
    );
    const updatedItem = { ...selectedItem, measurements: productMeasurement };
    dispatch(addToCart(updatedItem));
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
                        updatedItemHandler(measurement);
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
