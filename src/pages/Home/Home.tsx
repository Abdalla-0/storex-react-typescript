import { Col, Row } from "react-bootstrap";
import Products from "../../components/ui/Products/Products";
import Cart from "../../components/ui/Cart/Cart";
import { TProduct } from "../../types";
import { useState } from "react";

const Home = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const getItem = (item: TProduct) => {
    setProducts((prev) => [...prev, item]);
  };
  return (
    <>
      <Row className="h-100">
        <Col md={6}>
          <Products getItem={getItem} />
        </Col>
        <Col md={6}>
          <Cart products={products} />
        </Col>
      </Row>
    </>
  );
};

export default Home;
