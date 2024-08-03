import Typography from './Typography';

function ReferenceToLink({ text = 'Live At', suffixUrl }) {
  return (
    <div className="mb-2">
      <Typography type="smaller">{text}</Typography>{' '}
      <a
        href={`${import.meta.env.VITE_PUBLIC_URL}${suffixUrl}`}
        target="blank"
        rel="noopener noreferrer">
        <Typography type="smallerLink">{`${import.meta.env.VITE_PUBLIC_URL}${suffixUrl}`}</Typography>
      </a>
    </div>
  );
}

export default ReferenceToLink;
