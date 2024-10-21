import { TextField, MenuItem, Select, FormControl, Grid2, InputAdornment } from '@mui/material';
import "./index.scss";
import { WebinarData } from '../../types';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

type SearchAndFilterProps = {
    webinars: WebinarData[];
    setFilteredWebinars: React.Dispatch<React.SetStateAction<WebinarData[]>>;
};

const topicsList = ['Topic', 'Frontend Development', 'Backend Development', 'UI/UX Design', 'DevOps', 'Machine Learning']; //Filter List For topic

const SearchBar: React.FC<SearchAndFilterProps> = ({ webinars, setFilteredWebinars }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('Topic');

    // Search and Filter Logic
    useEffect(() => {
        let filteredWebinars = webinars;
        // Filter by topic
        if (selectedTopic !== 'Topic') {
            filteredWebinars = filteredWebinars.filter((webinar) => webinar.topics === selectedTopic);
        }

        // Search across all fields
        if (searchTerm.trim() !== '') {
            filteredWebinars = filteredWebinars.filter((webinar) =>
                Object.values(webinar).some((value) =>
                    typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        // Update the filtered webinars in the parent component
        setFilteredWebinars(filteredWebinars);
    }, [searchTerm, selectedTopic, webinars, setFilteredWebinars]);

    return (
        <Grid2 container size={12} mb={4} display={'flex'} justifyContent={'space-between'} className="searchAndFilter">
            <Grid2 size={6} display={'flex'} justifyContent={'start'}>
                <TextField
                    size='small'
                    variant="outlined"
                    placeholder="Search for webinar"
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="search"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid2>
            <Grid2 size={{ xs: 6, md: 4 , lg:2}}>
                <FormControl fullWidth variant="outlined" className="dropdown">
                    <Select
                        size="small"
                        name="topics"
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value as string)}
                        defaultValue="Topic"
                        className="customSelect"
                        fullWidth
                    >
                        {topicsList.map((topic) => (
                            <MenuItem key={topic} value={topic}>
                                {topic}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid2>
        </Grid2>
    );
};

export default SearchBar;
