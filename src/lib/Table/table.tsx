import { ChangeEvent, ReactElement, ReactNode, useMemo, useState } from "react";
import { Checkbox } from "../index";

import classnames from "classnames";

import "./table.scss";

type columns<T> = {
  title: string;
  key: keyof T;
  render?: (text: string, record: T, index: number) => ReactNode;
};

interface TableProps<T> {
  columns: columns<T>[];
  data: T[];
  bordered?: boolean;
  compact?: boolean;
  striped?: boolean;
  numberVisible?: boolean;
  // 选择框
  checkable?: boolean;
}

const Table: <T>(props: TableProps<T>) => ReactElement = (props) => {
  const {
    columns,
    data,
    bordered = false,
    compact = false,
    striped = true,
    numberVisible = false,
    checkable = false,
  } = props;

  const [selected, setSelected] = useState<any[]>([]);

  const tableClasses = {
    "g-table-bordered": bordered,
    "g-table-compact": compact,
    "g-table-striped": striped,
  };

  const handleSelectItem = (e: ChangeEvent<HTMLInputElement>, item: any) => {
    const { checked } = e.target;
    // 改变 checked 的值
    checked
      ? setSelected([...selected, item])
      : setSelected(selected.filter((i) => i.key !== item.key));
  };

  const handleSelectAllItem = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setSelected(checked ? data : []);
  };

  // 判断表格行是否被选中
  const areItemSelected = (item: any) =>
    useMemo(
      () => selected.filter((i) => i.key === item.key).length > 0,
      [selected]
    );

  // 表格头的状态
  const areAllItemsSelected: boolean = useMemo(
    () => data.length === selected.length,
    [selected]
  );

  // 不完全选择
  const areNotAllItemsSelected: boolean = useMemo(
    () => data.length !== selected.length && selected.length !== 0,
    [selected]
  );

  return (
    <div className="g-table-wrap">
      <table className={classnames("g-table", tableClasses)}>
        <thead className="g-table-head">
          <tr>
            {checkable && (
              <th>
                <Checkbox
                  checked={areAllItemsSelected}
                  indeterminate={areNotAllItemsSelected}
                  onChange={(e) => handleSelectAllItem(e)}
                />
              </th>
            )}
            {/* 是否显示序号 */}
            {numberVisible && <th>序号</th>}
            {columns.map((col) => {
              return <th key={col.key as string}>{col.title}</th>;
            })}
          </tr>
        </thead>

        <tbody className="g-table-body">
          {data.map((item, index) => {
            console.log(areItemSelected(item), "丁东坑");

            return (
              <tr key={index}>
                {checkable && (
                  <td>
                    <Checkbox
                      checked={areItemSelected(item)}
                      onChange={(e) => handleSelectItem(e, item)}
                    />
                  </td>
                )}
                {/* 显示序号的字段 */}
                {numberVisible && <td>{index + 1}</td>}
                {columns.map((col) => {
                  return (
                    <td key={col.key as string}>
                      {/* 渲染的数据 */}
                      {col.render
                        ? col.render(
                            item[col.key] as unknown as string,
                            item,
                            index
                          )
                        : (item[col.key] as unknown as string)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
