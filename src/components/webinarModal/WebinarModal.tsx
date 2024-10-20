import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton, Avatar, FormControl, Select, MenuItem, Dialog, DialogTitle, DialogContent, Typography, Grid2, SelectChangeEvent } from '@mui/material';
import { Close } from '@mui/icons-material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { styled } from '@mui/material/styles';
import './index.scss';
import { WebinarData } from '../../types';

type WebinarModalProps = {
    open: boolean;
    handleClose: () => void;
    handleSave: (data: WebinarData) => void;
    defaultValues?: WebinarData | null;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const topicsList = ['Frontend Development', 'Backend Development', 'UI/UX Design', 'DevOps', 'Machine Learning'];

const WebinarModal: React.FC<WebinarModalProps> = ({ open, handleClose, handleSave, defaultValues }) => {
    console.log("modal called")
    const [formData, setFormData] = useState<WebinarData>({
        instructorName: '',
        instructorRole: '',
        instructorCompany: '',
        topics: 'Select a topic',
        webinarTitle: '',
        startDate: '',
        startTime: '',
        endTime: '',
        image: null,
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (defaultValues) {
            setFormData(defaultValues); //Updating Data
            setPreviewImage(defaultValues.image); // Setting image if available
        }
    }, [defaultValues]);

    useEffect(() => {
        if (!open) {
            setFormData({
                instructorName: '',
                instructorRole: '',
                instructorCompany: '',
                topics: 'Select a topic',
                webinarTitle: '',
                startDate: '',
                startTime: '',
                endTime: '',
                image: null,
            });
            setPreviewImage(null);
            setErrors({});
        }
    }, [open]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDropdownChange = (e: SelectChangeEvent) => {
        setFormData((prevData) => ({ ...prevData, topics: e.target.value as string }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result as string);
                setFormData((prevData) => ({ ...prevData, image: reader.result as string })); // Store the image in form data in base 64 string
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.instructorName) newErrors.instructorName = 'Instructor name is required';
        if (!formData.instructorRole) newErrors.instructorRole = 'Instructor role is required';
        if (!formData.instructorCompany) newErrors.instructorCompany = 'Instructor company is required';
        if (!formData.topics) newErrors.topics = 'Topics are required';
        if (!formData.webinarTitle) newErrors.webinarTitle = 'Webinar title is required';
        if (!formData.startDate) newErrors.startDate = 'Start date is required';
        if (!formData.startTime) newErrors.startTime = 'Start time is required';
        if (!formData.endTime) newErrors.endTime = 'End time is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            handleSave(formData);
            handleClose();
            setFormData({
                instructorName: '',
                instructorRole: '',
                instructorCompany: '',
                topics: 'Select a topic',
                webinarTitle: '',
                startDate: '',
                startTime: '',
                endTime: '',
                image: null
            });
            setPreviewImage(null)
        }
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="md"
            className='addModal'
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className='modalTitle'>
                {defaultValues ? 'Edit Webinar' : 'Create Webinar'}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 5,
                    top: 5,
                    color: theme.palette.grey[500],
                })}
            >
                <Close />
            </IconButton>
            <DialogContent dividers>

                <form onSubmit={handleSubmit} className='modalForm'>

                    {/* Instructor Details */}

                    <Grid2 container spacing={2} className="contentHeading">
                        <Grid2 size={12} display={'flex'}>
                            <PeopleOutlineIcon />
                            <Typography className='mainHeading'>Instructor Details</Typography>
                        </Grid2>
                        <Grid2 container size={{ xs: 12, sm: 6, lg: 6 }} spacing={2} display={'flex'} justifyContent={'end'}>
                            <Grid2 container size={12} spacing={0}>
                                <Typography variant="h6" mr={2} className='inputLabel'>
                                    Instructor Name
                                    <Typography variant="caption" color="error">*</Typography>
                                </Typography>
                                <TextField
                                    size="small"
                                    placeholder='Type the instructor name'
                                    name="instructorName"
                                    value={formData.instructorName}
                                    onChange={handleInputChange}
                                    className="formField"
                                    error={!!errors.instructorName}
                                    helperText={errors.instructorName}
                                    fullWidth
                                />
                            </Grid2>
                            <Grid2 container size={12} spacing={0}>
                                <Typography variant="h6" mr={2} className='inputLabel'>
                                    Instructor Role
                                    <Typography variant="caption" color="error">*</Typography>
                                </Typography>
                                <TextField
                                    placeholder="Type the instructor role"
                                    size="small"
                                    name="instructorRole"
                                    value={formData.instructorRole}
                                    onChange={handleInputChange}
                                    className="formField"
                                    error={!!errors.instructorRole}
                                    helperText={errors.instructorRole}
                                    fullWidth
                                />
                            </Grid2>
                            <Grid2 container size={12} spacing={0}>
                                <Typography variant="h6" className='inputLabel'>
                                    Instructor Company
                                    <Typography variant="caption" color="error">*</Typography>
                                </Typography>
                                <TextField
                                    placeholder="Type the instructor company"
                                    size="small"
                                    name="instructorCompany"
                                    value={formData.instructorCompany}
                                    onChange={handleInputChange}
                                    className="formField"
                                    error={!!errors.instructorCompany}
                                    helperText={errors.instructorCompany}
                                    fullWidth
                                />
                            </Grid2>
                        </Grid2>
                        <Grid2 container size={{ xs: 12, sm: 6, lg: 6 }} spacing={3}>
                            <Grid2 container size={12} spacing={1}>
                                <Typography variant="h6" mr={2} className='inputLabel'>
                                    Instructor Image
                                    <Typography variant="caption" color="error">*</Typography>
                                </Typography>
                                <Grid2 container size={12} spacing={1} className="imageUpload">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        id="imageUpload"
                                        onChange={handleImageUpload}
                                    />
                                    <label htmlFor="imageUpload">
                                        <Avatar
                                            src={previewImage || undefined}
                                            alt="Instructor"
                                            sx={{ width: 100, height: 100, cursor: 'pointer', borderRadius: 3 }}
                                        />
                                    </label>
                                </Grid2>
                            </Grid2>
                            <Grid2 container size={12} spacing={0}>
                                <Typography variant="h6" mr={2} className='inputLabel'>
                                    Topics
                                    <Typography variant="caption" color="error">*</Typography>
                                </Typography>
                                <FormControl fullWidth className="formField" error={!!errors.topics}>
                                    {/* <InputLabel>Topics</InputLabel> */}
                                    <Select
                                        placeholder='Type the topic'
                                        size="small"
                                        name="topics"
                                        value={formData.topics}
                                        onChange={handleDropdownChange}
                                        defaultValue="Select a topic"
                                        style={{ background: '#F2F4F8' }}
                                        fullWidth
                                    >
                                        <MenuItem value="Select a topic" disabled>
                                            Select a topic
                                        </MenuItem>
                                        {topicsList.map((topic) => (
                                            <MenuItem key={topic} value={topic}>
                                                {topic}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.topics && <p className="errorText">{errors.topics}</p>}
                                </FormControl>
                            </Grid2>
                        </Grid2>
                    </Grid2>

                    {/* Webinar Details */}

                    <Grid2 container spacing={2} mt={3} className="contentHeading">
                        <Grid2 size={12} display={'flex'}>
                            <VideocamOutlinedIcon />
                            <Typography className='mainHeading'>Webinar Details</Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, lg: 6 }}>
                            <Typography variant="h6" mr={2} className='inputLabel'>
                                Webinar Title
                                <Typography variant="caption" color="error">*</Typography>
                            </Typography>
                            <TextField
                                size="small"
                                placeholder="Type the webinar title"
                                name="webinarTitle"
                                value={formData.webinarTitle}
                                onChange={handleInputChange}
                                className="formField"
                                error={!!errors.webinarTitle}
                                helperText={errors.webinarTitle}
                                fullWidth
                            />
                        </Grid2>

                        <Grid2 size={12} container spacing={2}>
                            <Grid2 size={{ xs: 12, sm: 4, lg: 4 }}>
                                <Typography variant="h6" mr={2} className='inputLabel'>
                                    Start Date
                                    <Typography variant="caption" color="error">*</Typography>
                                </Typography>
                                <TextField
                                    size="small"
                                    placeholder="Type the start date"
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    className="formField"
                                    fullWidth
                                    error={!!errors.startDate}
                                    helperText={errors.startDate}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 4, lg: 4 }}>
                                <Typography variant="h6" mr={2} className='inputLabel'>
                                    Start Time
                                    <Typography variant="caption" color="error">*</Typography>
                                </Typography>
                                <TextField
                                    placeholder="Type the start Time"
                                    type="time"
                                    name="startTime"
                                    size="small"
                                    value={formData.startTime}
                                    onChange={handleInputChange}
                                    className="formField"
                                    fullWidth
                                    error={!!errors.startTime}
                                    helperText={errors.startTime}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, sm: 4, lg: 4 }}>
                                <Typography variant="h6" mr={2} className='inputLabel'>
                                    End Time
                                    <Typography variant="caption" color="error">*</Typography>
                                </Typography>
                                <TextField
                                    placeholder="Type the end time"
                                    size="small"
                                    type="time"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleInputChange}
                                    className="formField"
                                    fullWidth
                                    error={!!errors.endTime}
                                    helperText={errors.endTime}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid2>
                        </Grid2>

                    </Grid2>

                    <Grid2 container size={12} mt={4} className="buttonGroup">
                        <Button type="submit" variant="contained" color="primary">
                            {defaultValues ? 'Update Webinar' : 'Create Webinar'}
                        </Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </Grid2>
                </form>

            </DialogContent>
        </BootstrapDialog>
    )
};

export default WebinarModal;
