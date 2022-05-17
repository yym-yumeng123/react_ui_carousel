import { ButtonHTMLAttributes, FC } from "react";
import classnames from "classnames";
import "./button.scss";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLElement>, "type"> {
  type?: "primary" | "danger" | "default";
}

const Button: FC<ButtonProps> = (props) => {
  const { type = "default", ...restProps } = props;
  const cn = {
    [`g-button-${type}`]: type,
  };
  return (
    <button className={classnames("g-button", cn)} {...restProps}>
      按钮
    </button>
  );
};

export default Button;
