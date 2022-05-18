import { Button, Checkbox, CheckboxGroup } from "./lib/index";
import "./App.scss";
import { ChangeEvent, useState } from "react";

const App = () => {
  const [values, setValues] = useState<string[] | "">("");
  const handleClick = () => {
    console.log("我是普通按钮");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target, e.target.value, e.target.checked);
  };

  const handleGroupChange = (values: string[]) => {
    console.log(values, "value...");
    setValues(values);
  };

  return (
    <div className="App">
      <Button onClick={handleClick}>普通按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="danger">危险按钮</Button>
      <br />
      <Button disabled onClick={handleClick}>
        不可点击按钮
      </Button>
      <Button type="primary" disabled>
        不可点击主要按钮
      </Button>
      <Button type="danger" disabled>
        不可点击危险按钮
      </Button>

      <br />
      <hr />

      <Checkbox value="选择框" onChange={handleChange} />
      <Checkbox disabled checked value="苹果" />

      <CheckboxGroup selected={["香蕉", "梨子"]} onChange={handleGroupChange}>
        <Checkbox value="苹果" />
        <Checkbox value="香蕉" />
        <Checkbox value="梨子" disabled />
      </CheckboxGroup>
      <p>{values}</p>
    </div>
  );
};

export default App;
