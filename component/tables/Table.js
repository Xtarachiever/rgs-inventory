import { useTable } from "react-table";
import styles from './styles.module.css';

export default function Table({ columns, data }) {
    // Table component logic and UI come here
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
      } = useTable({
        columns,
        data
      });

      return (
        <table {...getTableProps()} className={styles.table}>
          <thead>
            {headerGroups.map((headerGroup,i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column,index) => (
                  <th {...column.getHeaderProps()} key={index}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i}>
                  {row.cells.map((cell,index) => {
                    return <td {...cell.getCellProps()} key={index}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
}