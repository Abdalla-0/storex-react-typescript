import { Col, Row } from "react-bootstrap";
import Products from "../../components/ui/Products/Products";
import Cart from "../../components/ui/Cart/Cart";
import { TProduct } from "../../types";

const Home = () => {
  const getItem = ({ item }: { item: TProduct }) => {
    console.log(item);
  };
  return (
    <>
      <Row className="h-100">
        <Col md={6}>
          <Products getItem={getItem} />
        </Col>
        <Col md={6}>
          <Cart />
        </Col>
      </Row>
    </>
  );
};

export default Home;
