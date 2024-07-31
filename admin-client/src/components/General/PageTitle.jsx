import Typography from './Typography';

function PageTitle({ children }) {
  return (
    <div className="mb-4">
      <Typography type="smallTitle">{children}</Typography>
    </div>
  );
}

export default PageTitle;
