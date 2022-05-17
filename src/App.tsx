import { Button } from "./lib/index";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Button />
      <Button type="primary" />
      <Button type="danger" />
    </div>
  );
};

export default App;
