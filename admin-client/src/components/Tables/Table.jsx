import { Link } from 'react-router-dom';

function Table({ data, columns, route, header = true }) {
  const cellClassList = 'pr-8';

  return (
    <table className="w-full text-left">
      {header && (
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.title}
                scope="col"
                className={`${cellClassList} ${c.className}`}>
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {data.map((d) => (
          <tr key={d._id}>
            {columns.map((c, i) => {
              if (i == 0) {
                return (
                  <th
                    key={c.field}
                    scope="row"
                    className={`${cellClassList} ${c.className}`}>
                    <Link to={`${route}/${d._id}`}>{d[c.field]}</Link>
                  </th>
                );
              }

              return (
                <td key={c.field} className={`${cellClassList} ${c.className}`}>
                  {c.fn ? c.fn(d) : d[c.field]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
