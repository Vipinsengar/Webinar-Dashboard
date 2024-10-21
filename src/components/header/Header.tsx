import { Button, Grid2, Typography } from '@mui/material';
import './index.scss';

type HeaderProps = {
    onAddWebinar: () => void;
  };
  
const Header: React.FC<HeaderProps> = ({ onAddWebinar }) => {
  return (
    <Grid2 container size={12} className="header">
      <Grid2 size={6} display={'flex'}pl={2}>
      <Typography className="title" variant="h5">
        Webinar
      </Typography>
      </Grid2>
      <Grid2 size={6} display={'flex'} justifyContent={'end'} pr={6}>
      <Button className="addButton" variant="contained" onClick={onAddWebinar}>
        Add webinar
      </Button>
      </Grid2>
    </Grid2>
  );
};

export default Header;
