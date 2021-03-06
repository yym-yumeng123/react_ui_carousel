import { Button, Checkbox, CheckboxGroup, Table } from "./lib/index";
import "./App.scss";
import { ChangeEvent, ReactNode, useState } from "react";

type DataProps = {
  age: number;
  name: string;
  gender: string;
  address: string;
  action?: any;
  key?: string;
};

type ColProps<T> = {
  title: string;
  key: keyof DataProps;
  width?: number;
  render?: (text: string, record: T, index: number) => ReactNode;
  sorter?: (val: any) => void;
};

const App = () => {
  const [values, setValues] = useState<string[] | "">("");
  const handleClick = () => {
    console.log("我是普通按钮");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target, e.target.value, e.target.checked);
  };

  const handleGroupChange = (values: string[]) => {
    setValues(values);
  };

  const columns: ColProps<DataProps>[] = [
    {
      title: "年龄",
      key: "age",
      width: 200,
      sorter: (val) => {
        data.sort((a, b) => Number(a.age) - Number(b.age));
      },
    },
    {
      title: "姓名",
      key: "name",
      width: 200,
    },
    {
      title: "性别",
      key: "gender",
      width: 100,
    },
    {
      title: "地址",
      key: "address",
      width: 200,
    },
    {
      title: "操作",
      key: "action",
      render: (text: string, record: DataProps, index: number) => {
        return (
          <>
            <Button type="danger" style={{ marginRight: "8px" }}>
              删除
            </Button>
            <Button type="primary">编辑</Button>
          </>
        );
      },
    },
  ];

  const data: DataProps[] = [
    {
      key: "1",
      age: 15,
      name: "yym",
      gender: "男",
      address: "深圳市",
    },
    {
      key: "2",
      age: 18,
      name: "张三",
      gender: "女",
      address: "安徽省",
    },
    {
      key: "3",
      age: 35,
      name: "李四",
      gender: "女",
      address: "张家界",
    },
    {
      key: "5",
      age: 6,
      name: "小黑",
      gender: "男",
      address: "蚌埠",
    },
    {
      key: "6",
      age: 35,
      name: "李四",
      gender: "女",
      address: "张家界",
    },
    {
      key: "7",
      age: 6,
      name: "小黑",
      gender: "男",
      address: "蚌埠",
    },
    {
      key: "8",
      age: 35,
      name: "李四",
      gender: "女",
      address: "张家界",
    },
    {
      key: "9",
      age: 6,
      name: "小黑",
      gender: "男",
      address: "蚌埠",
    },
  ];

  const handleChangeSelected = (val: DataProps[]) => {};

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
      <Checkbox indeterminate value="苹果" />

      <CheckboxGroup selected={["香蕉", "梨子"]} onChange={handleGroupChange}>
        <Checkbox value="苹果" />
        <Checkbox value="香蕉" />
        <Checkbox value="梨子" disabled />
      </CheckboxGroup>
      <p>{values}</p>

      <hr />
      {/* <Table columns={columns} data={[]} /> */}

      {/* <Table columns={columns} data={data} /> */}

      <Table<DataProps>
        columns={columns}
        data={data}
        bordered
        compact
        numberVisible
        checkable
        changeSeletedItems={handleChangeSelected}
        height={400}
      />
    </div>
  );
};

export default App;
