import { ReactElement } from "react";

interface TableProps<T> {
  columns: {
    title: string;
    key: keyof T;
  }[];
  data: T[];
}

const Table: <T>(props: TableProps<T>) => ReactElement = (props) => {
  const { columns, data } = props;

  return (
    <div>
      <table>
        <thead>
          <tr>
            {/* 循环表头 */}
            {columns.map((col) => {
              return <th key={col.key as string}>{col.title}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => {
            return (
              <tr>
                {columns.map((col) => {
                  return (
                    <td key={col.key as string}>
                      <span>{item[col.key]}</span>
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
