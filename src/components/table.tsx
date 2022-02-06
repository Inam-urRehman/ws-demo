import { ReactNode, FC } from "react";

import "src/styles/table.css";

interface TableProps<T = any> {
  className?: string;
  headers: { label: string; className?: string }[];
  data: T[];
  children: (row: T) => ReactNode;
}

const Table: FC<TableProps> = (props) => {
  const { children, headers, data, className = "" } = props;

  return (
    <table className={className}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th className={header?.className || ""} key={header.label}>
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((row) => children(row))}</tbody>
    </table>
  );
};

export default Table;
