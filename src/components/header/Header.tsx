import { Button, Typography } from '@mui/material';
import './index.scss';

type HeaderProps = {
    onAddWebinar: () => void;
  };
  
const Header: React.FC<HeaderProps> = ({ onAddWebinar }) => {
  return (
    <div className="header">
      <Typography className="title" variant="h5">
        Webinar
      </Typography>
      <Button className="addButton" variant="contained" onClick={onAddWebinar}>
        Add webinar
      </Button>
    </div>
  );
};

export default Header;
