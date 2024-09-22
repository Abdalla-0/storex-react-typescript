import { Button, Col, Modal, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { actionGetProducts } from "../../../../store/Products/productsSlice";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { TProduct } from "../../../../types";
const { product } = styles;

const { productsView } = styles;

const ProductsView = ({ getItem }: { getItem: (item: TProduct) => void }) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.products);

  const [modalToggler, setModalToggler] = useState(false);
  const handleToggle = () => setModalToggler(false);

  // const [productTilte, setProductTilte] = useState()

  // const titleHandler = (item: TProduct) => {
  //   // setProductTilte(item)
  //   // console.log(productTilte);
  // };

  useEffect(() => {
    dispatch(actionGetProducts());
  }, [dispatch]);

  const addToCartHandler = (item: TProduct) => {
    if (item.measurements.length > 1) {
      setModalToggler(true);
      // titleHandler(item);
    } else {
      getItem(item);
    }
  };

  return (
    <div className={productsView}>
      <Row className="row-gap-3">
        {data &&
          data.map((el) => (
            <>
              <Col xs={6} xl={4} key={el.product_id}>
                <div className={product} onClick={() => addToCartHandler(el)}>
                  {el.product_name}
                </div>
              </Col>
            </>
          ))}

        <Modal size="lg" show={modalToggler} onHide={handleToggle}>
          <Modal.Header closeButton>
            {/* {data && data.map((el) => (<Modal.Title key={el.product_id}>{el.product_name}</Modal.Title>)} */}
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
            {data.map((el) =>
              el.measurements.map((measurement) => (
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
                    <Button className="w-100" variant="primary">
                      اختيار
                    </Button>
                  </Col>
                </Row>
              ))
            )}
          </Modal.Body>
        </Modal>
      </Row>
    </div>
  );
};

export default ProductsView;
