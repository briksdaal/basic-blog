import { Link, useMatches } from 'react-router-dom';
import { Fragment } from 'react';
import Typography from './Typography';

function Breadcrumbs({ title }) {
  const matches = useMatches();

  const crumbs = matches
    .filter((m) => m?.handle?.crumb)
    .map((m) => ({ link: m.pathname, ...m.handle.crumb }));

  return (
    <div className="mb-3">
      <Link to="/dashboard">
        <Typography type="smallerLink">Dashboard</Typography>
      </Link>
      {crumbs.map((c, i) => {
        if (c.link === '/dashboard') {
          return null;
        }

        return (
          <Fragment key={i}>
            {' > '}
            {c.fetchTitle ? (
              <Typography key={i} type="smaller">
                {title}
              </Typography>
            ) : c.staticTitle ? (
              <Typography key={i} type="smaller">
                {c.staticTitle}
              </Typography>
            ) : (
              <Link key={i} to={c.link}>
                <Typography type="smallerLink">{c.title}</Typography>
              </Link>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

export default Breadcrumbs;
