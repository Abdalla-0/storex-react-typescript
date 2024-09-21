import { Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { actionGetProducts } from "../../../../store/Products/productsSlice";
import styles from "./style.module.css";
import { useEffect } from "react";
import { TProduct } from "../../../../types";
const { product } = styles;

const { productsView } = styles;

const ProductsView = ({ getItem }: { getItem: (item: TProduct) => void }) => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(actionGetProducts());
  }, [dispatch]);

  const addToCartHandler = (item: TProduct) => {
    getItem(item);
    if (item.measurements.length > 1) {
      console.log("Yes");
    }
  };

  return (
    <div className={productsView}>
      <Row className="row-gap-3">
        {data &&
          data.map((el) => (
            <Col xs={6} xl={4} key={el.product_id}>
              <div className={product} onClick={() => addToCartHandler(el)}>
                {el.product_name}
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default ProductsView;
