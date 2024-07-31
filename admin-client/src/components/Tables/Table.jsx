import { Link } from 'react-router-dom';
import Typography from '../General/Typography';

function Table({ data, columns, route, header = true }) {
  const cellClassList = 'px-4 py-1 border-solid border-y border-slate-300';

  return (
    <table className="w-full text-left">
      {header && (
        <thead>
          <tr className="bg-mantis-100">
            {columns.map((c) => (
              <th key={c.title} scope="col" className={cellClassList}>
                <div className={c.className}>
                  <Typography type="smaller">{c.title}</Typography>
                </div>
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {data.map((d) => (
          <tr key={d._id} className="even:bg-mantis-100">
            {columns.map((c, i) => {
              if (i == 0) {
                return (
                  <th key={c.field} scope="row" className={cellClassList}>
                    <div className={c.className}>
                      <Typography type="smallerLink">
                        <Link to={d.link || `${route}/${d._id}`}>
                          {d[c.field]}{' '}
                        </Link>
                      </Typography>
                    </div>
                  </th>
                );
              }

              return (
                <td key={c.field} className={cellClassList}>
                  <div className={c.className}>
                    <Typography type={c.typographyType || 'smaller'}>
                      {c.fn ? c.fn(d) : d[c.field]}
                    </Typography>
                  </div>
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
