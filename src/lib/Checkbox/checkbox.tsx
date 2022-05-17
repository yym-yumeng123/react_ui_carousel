import { FC, useState } from "react";
import classNames from "classnames";
import "./checkbox.scss";

interface CheckboxProps {
  checked?: boolean;
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const { checked = false } = props;
  // 当前是否被选中
  const [currentChecked, setCurrentChecked] = useState(checked);

  const classes = {
    "g-checkbox-checked": currentChecked,
  };

  const handleChange = () => {
    setCurrentChecked(!currentChecked);
  };

  return (
    <label className="g-checkbox-wrapper">
      <span className="g-checkbox">
        <span className={classNames("g-checkbox-inner", classes)}></span>
        <input
          className="g-checkbox-input"
          type="checkbox"
          checked={currentChecked}
          onChange={handleChange}
        />
      </span>
      <span className="g-checkobox-label">选择框</span>
    </label>
  );
};

export default Checkbox;
