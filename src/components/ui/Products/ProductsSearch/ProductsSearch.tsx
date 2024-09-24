import { Button } from "react-bootstrap";
import Input from "../../../common/Form/Input/Input";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import actionGetCategories from "../../../../store/categories/actions/actionGetCategories";
const { productsSearch, inputsBox, btnsBox, inputHolder, btn, active } = styles;

// UI
const ProductsSearch = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.categories);
  const [activeItem, setActiveItem] = useState(0);
  const [isClicked, setIsClicked] = useState(true);

  const activeHandler = (id: number) => {
    setIsClicked(false);
    setActiveItem(id);
  };

  useEffect(() => {
    dispatch(actionGetCategories());
  }, [dispatch]);

  return (
    <div className={productsSearch}>
      <div className={inputsBox}>
        <div className={inputHolder}>
          <Input placeholder="بحث بالباركود" />
        </div>
        <div className={inputHolder}>
          <Input placeholder="بحث باسم الصنف" />
        </div>
        <Button className={btn} variant="primary">
          الغاء
        </Button>
      </div>
      <div className={btnsBox}>
        {data &&
          data.map((el) => (
            <Button
              key={el.id}
              className={`${btn} ${
                isClicked && el.id === 1
                  ? active
                  : activeItem === el.id
                  ? active
                  : ""
              }`}
              variant="light"
              onClick={() => activeHandler(el.id)}
            >
              {el.name}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default ProductsSearch;
