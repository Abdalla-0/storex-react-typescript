import { Form } from "react-bootstrap";

type TInputProps = {
  type?: string;
  placeholder?: string;
  className?: string;
};

const Input = ({ type = "text", placeholder, className }: TInputProps) => {
  return (
    <Form.Group>
      <Form.Control
        type={type}
        placeholder={placeholder}
        className={className}
      />
    </Form.Group>
  );
};

export default Input;
