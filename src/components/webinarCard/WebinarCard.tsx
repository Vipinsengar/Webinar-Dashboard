import { Card, CardContent, Typography, Box, Button, Avatar } from '@mui/material';
import './index.scss';
import { WebinarData } from '../../types';
import { format } from 'date-fns';

type WebinarCardProps = {
    webinar: WebinarData;
    onEdit: () => void;
    onDelete: () => void;
  };

const WebinarCard: React.FC<WebinarCardProps> = ({ webinar, onEdit , onDelete}) => (
        <Card className="card">
            <CardContent >
                <Box display="flex" className="nameCard" justifyContent="space-between" alignItems="center" mb={2} style={{ backgroundColor: webinar.color}}>
                    <Box >
                        <Typography  className="title" mb={0.5}>{webinar.instructorName}</Typography>
                        <Typography  variant="body2">{webinar.instructorRole}</Typography>
                        <Typography  variant="body2">{webinar.instructorCompany}</Typography>
                    </Box>
                    <Avatar  className="avatar" src={webinar.image || undefined}/>
                </Box>
                <Typography display="flex" className='webinarTitle' variant="body2" style={{ color: webinar.color}}>{webinar.webinarTitle}</Typography>
                <Typography display="flex" className="titleCourse" variant="body1">{webinar.topics}</Typography>
                <Typography display="flex" className="date" mb={3}>{format(new Date(webinar.startDate), 'EEEE • MMMM d, yyyy')} , {webinar.startTime} to {webinar.endTime}</Typography>
                <Box className="buttons">
                    <Button className='deleteButton' variant="outlined" color="error" onClick={onDelete}>Delete</Button>
                    <Button className='editButton' variant="text" color="inherit" onClick={onEdit}>Edit</Button>
                </Box>
            </CardContent>
        </Card>
    );

export default WebinarCard;
