import { Button, Checkbox } from "./lib/index";
import "./App.scss";

const App = () => {
  const handleClick = () => {
    console.log("我是普通按钮");
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

      <Checkbox />
    </div>
  );
};

export default App;
