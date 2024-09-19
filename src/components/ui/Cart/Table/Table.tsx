import Table from "react-bootstrap/Table";
import Input from "../../../common/Form/Input/Input";
import styles from "./style.module.css";

const { cartInput } = styles;

const TableSection = () => {
  return (
    <div>
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
          <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>
              <Input type="number" className={cartInput} />
            </td>
            <td>
              <Input type="number" className={cartInput} />
            </td>
            <td>
              <Input type="number" className={cartInput} />
            </td>
            <td>
              <Input type="number" className={cartInput} />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableSection;
