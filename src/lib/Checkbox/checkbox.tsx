import { ChangeEvent, FC, useState } from "react";
import classNames from "classnames";
import "./checkbox.scss";

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const { checked = false, disabled = false, value = "", onChange } = props;
  // 当前是否被选中
  const [currentChecked, setCurrentChecked] = useState(checked);

  const classes_inner = {
    "g-checkbox-checked": currentChecked,
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 如果 disabeld 不能触发 change 事件
    if (disabled) return;
    setCurrentChecked(!currentChecked);
    onChange && onChange(e);
  };

  return (
    <label
      className={classNames("g-checkbox-wrapper", {
        "g-checkbox-disabled": disabled,
      })}
    >
      <span className="g-checkbox">
        <span className={classNames("g-checkbox-inner", classes_inner)}></span>
        <input
          className="g-checkbox-input"
          type="checkbox"
          checked={currentChecked}
          onChange={handleChange}
          value={value}
        />
      </span>
      <span className="g-checkbox-label">{value}</span>
    </label>
  );
};

export default Checkbox;