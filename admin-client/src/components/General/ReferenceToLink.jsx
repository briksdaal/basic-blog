import Typography from './Typography';
import { Link } from 'react-router-dom';

export function ReferenceToOuterLink({ text = 'Live At', suffixUrl }) {
  const url = `${import.meta.env.VITE_PUBLIC_URL}${suffixUrl}`;

  return (
    <div className="mb-2">
      <Typography type="smaller">{text}</Typography>{' '}
      <a href={url} target="blank" rel="noopener noreferrer">
        <Typography type="smallerLink" className="break-all">
          {url}
        </Typography>
      </a>
    </div>
  );
}

export function ReferenceToInnerLink({ text = 'For:', suffixUrl, linkText }) {
  return (
    <div className="mb-2">
      <Typography type="smaller">{text}</Typography>{' '}
      <Link to={suffixUrl}>
        <Typography type="smallerLink">{linkText || suffixUrl}</Typography>
      </Link>
    </div>
  );
}
