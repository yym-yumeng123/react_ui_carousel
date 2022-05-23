import {
  ChangeEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Checkbox } from "../index";

import classnames from "classnames";

import "./table.scss";

type orderType = "asc" | "desc" | "unsc";

type columns<T> = {
  title: string;
  key: keyof T;
  render?: (text: string, record: T, index: number) => ReactNode;
  sorter?: (val: orderType) => void;
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
  changeSeletedItems?: (selected: T[]) => void;

  loading?: boolean;
  height?: number;
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
    changeSeletedItems,

    loading = false,
    height,
  } = props;

  const [_, setUpdate] = useState(0); // 更新页面
  const [selected, setSelected] = useState<any[]>([]);
  const order = useRef<"asc" | "desc" | "unsc">("unsc");
  const wrapRef = useRef<any>(null);
  const tableRef = useRef<any>(null);

  const tableClasses = {
    "g-table-bordered": bordered,
    "g-table-compact": compact,
    "g-table-striped": striped,
  };

  useEffect(() => {
    let tableCarbon: any;
    if (height) {
      tableCarbon = tableRef.current.cloneNode(true);
      console.log(tableCarbon, "费等零散");

      // tableCarbon.classList.add("g-table-carbon");

      // const tHead = tableRef.current.children[0];
      // const { height } = tHead.getBoundingClientRect();
      // tableRef.current.style.marginTop = `${height}px`;
      // tableCarbon.appendChild(tHead);
      // wrapRef.current.appendChild(tableCarbon);
    }

    // 移除
    return () => {
      height && tableCarbon.remove();
    };
  }, []);

  useEffect(() => {
    changeSeletedItems && changeSeletedItems(selected);
  }, [selected]);

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

  const handleOrderBy = (col: columns<any>) => {
    if (order.current === "unsc") {
      order.current = "asc";
    } else if (order.current === "asc") {
      order.current = "desc";
    } else if (order.current === "desc") {
      order.current = "unsc";
    }

    setUpdate(Math.random());

    col.sorter && col.sorter(order.current);
  };

  // 计算 colspan 的 值
  const colSpan = (): number => {
    let length = 0;
    if (numberVisible) {
      length += 1;
    }
    if (checkable) {
      length += 1;
    }

    return length;
  };

  return (
    <div ref={wrapRef} className="g-table-wrap">
      <div style={{ height: `${height}px`, overflow: "auto" }}>
        <table ref={tableRef} className={classnames("g-table", tableClasses)}>
          <thead className={classnames("g-table-head")}>
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
                return (
                  <th key={col.key as string}>
                    {/* 排序按钮 */}
                    {col.sorter ? (
                      <span
                        className="g-table-sort-wrap"
                        onClick={() => handleOrderBy(col)}
                      >
                        {col.title}
                        <span className="g-table-sort">
                          <i
                            className={classnames("g-table-up", {
                              "g-table-active": order.current === "asc",
                            })}
                          ></i>
                          <i
                            className={classnames("g-table-down", {
                              "g-table-active": order.current === "desc",
                            })}
                          ></i>
                        </span>
                      </span>
                    ) : (
                      <>{col.title}</>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="g-table-body">
            {data.map((item, index) => {
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
            {data.length === 0 && (
              <tr>
                <td
                  className="g-table-empty"
                  colSpan={columns.length + colSpan()}
                >
                  <span className="default">暂无数据</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {loading && <div className="g-table-loading">加载中...</div>}
    </div>
  );
};

export default Table;
