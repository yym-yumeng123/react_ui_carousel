import React, {
  ChangeEvent,
  FC,
  ReactElement,
  useEffect,
  useState,
} from "react";
import Checkbox from "./checkbox";

interface GroupProps {
  selected?: string[]; // group 使用, value 值的集合
  children: Array<ReactElement>;
  onChange?: (selected: string[]) => void;
}

const CheckboxGroup: FC<GroupProps> = (props) => {
  const { children, selected = [], onChange } = props;

  const [selectedValue, setSelectedValue] = useState(selected);

  const handleGroupChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.currentTarget;
    if (checked) {
      setSelectedValue([...selectedValue, value]);
    } else {
      setSelectedValue((arr) => arr.filter((i) => i !== value));
    }
  };

  useEffect(() => {
    onChange && onChange(selectedValue);
  }, [selectedValue]);

  const childWithProps = React.Children.map(children, (child, index) => {
    // 确保每一个子元素都是 checkbox
    if (child.type !== Checkbox) {
      throw new Error("复选框组的子元素必须是 Checkbox");
    }

    return React.cloneElement(child, {
      ...child.props,
      key: index,
      selected,
      onChange: handleGroupChange, // 利用回调
    });
  });

  return <div>{childWithProps}</div>;
};

export default CheckboxGroup;
