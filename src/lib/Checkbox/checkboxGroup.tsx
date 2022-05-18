import React, { FC, ReactElement } from "react";
import Checkbox from "./checkbox";

interface GroupProps {
  selected?: string[]; // group 使用, value 值的集合
  children: Array<ReactElement>;
}

const CheckboxGroup: FC<GroupProps> = (props) => {
  const { children, selected = [] } = props;

  const childWithProps = React.Children.map(children, (child, index) => {
    // 确保每一个子元素都是 checkbox
    if (child.type !== Checkbox) {
      throw new Error("复选框组的子元素必须是 Checkbox");
    }

    return React.cloneElement(child, {
      ...child.props,
      key: index,
      selected, // selected props
    });
  });

  return <div>{childWithProps}</div>;
};

export default CheckboxGroup;
