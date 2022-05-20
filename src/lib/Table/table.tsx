import { ReactElement, ReactNode } from "react";
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

  const tableClasses = {
    "g-table-bordered": bordered,
    "g-table-compact": compact,
    "g-table-striped": striped,
  };

  return (
    <div className="g-table-wrap">
      <table className={classnames("g-table", tableClasses)}>
        <thead className="g-table-head">
          <tr>
            {checkable && (
              <th>
                <Checkbox />
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
            return (
              <tr key={index}>
                {checkable && (
                  <td>
                    <Checkbox />
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
