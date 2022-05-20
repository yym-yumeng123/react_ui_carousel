import { ChangeEvent, FC, useEffect, useState } from "react";
import classNames from "classnames";
import "./checkbox.scss";

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  indeterminate?: boolean;
  // group 传的 props
  selected?: string[];
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const {
    selected = [],
    checked = false,
    disabled = false,
    indeterminate = false,
    value = "",
    onChange,
  } = props;
  // 当前是否被选中
  const [currentChecked, setCurrentChecked] = useState(checked);

  useEffect(() => {
    if (selected.length > 0 && selected.indexOf(value) > -1) {
      setCurrentChecked(true);
    }
  }, []);

  useEffect(() => {
    setCurrentChecked(checked);
  }, [checked]);

  const classes_inner = {
    "g-checkbox-checked": currentChecked,
    "g-checkbox-indeterminate": indeterminate,
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
