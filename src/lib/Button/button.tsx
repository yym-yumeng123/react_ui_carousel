import { ButtonHTMLAttributes, FC } from "react";
import classnames from "classnames";
import "./button.scss";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLElement>, "type"> {
  type?: "primary" | "danger" | "default";
}

const Button: FC<ButtonProps> = (props) => {
  const { type = "default", disabled = false, children, ...restProps } = props;
  const cn = {
    [`g-button-${type}`]: type,
    [`g-button-disabled`]: disabled,
  };

  return (
    <button className={classnames("g-button", cn)} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
