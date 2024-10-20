import React, { useState } from 'react';
import { WebinarData } from '../../types';
import Header from '../header/Header';
import SearchAndFilter from '../searchBar/SearchBar';
import WebinarCard from '../webinarCard/WebinarCard';
import './index.scss';
import WebinarModal from '../webinarModal/WebinarModal';

const initialWebinars: WebinarData[] = [
    {
        instructorName: 'Matthew Martin',
        webinarTitle: 'Frontend Engineering',
        instructorRole: 'Lead Front End Developer',
        instructorCompany: 'Google',
        topics: 'Frontend Development',
        startDate: '2024-04-22',
        startTime: '16:00',
        endTime: '17:00',
        color: '#FF5733',
        image: "data:image/jpeg;base64,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"
    },
    // Add more webinars...
];

const colorList = ['#a292d1', '#FF5733', '#0b8a21', '#3357FF', '#F39C12', '#8E44AD', '#2ECC71', '#E74C3C', '#3498DB']; //This is the list of color for Card to pick random color

const getRandomColor = (colors: string[]) => {
    return colors[Math.floor(Math.random() * colors.length)];
};

const WebinarDashboard: React.FC = () => {
    const [webinars, setWebinars] = useState(initialWebinars);
    const [filteredWebinars, setFilteredWebinars] = useState<WebinarData[]>(initialWebinars);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingWebinar, setEditingWebinar] = useState<WebinarData | null>(null);

    const handleOpenModal = () => {
        setEditingWebinar(null);
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setEditingWebinar(null);
    };

    const handleSaveWebinar = (webinarData: WebinarData) => {
        if (editingWebinar) {
            // Update existing webinar
            setWebinars(prev =>
                prev.map(w => (w === editingWebinar ? { ...w, ...webinarData } : w))
            );
        } else {
            // Add new webinar
            //setWebinars([...webinars, webinarData]);
            const coloredWebinar = {
                ...webinarData,
                color: getRandomColor(colorList), // Assign a random color when adding a new webinar
            };
            setWebinars((prevWebinars) => [...prevWebinars, coloredWebinar]);
            setFilteredWebinars((prevWebinars) => [...prevWebinars, coloredWebinar]);
        }
    };

    const handleEditWebinar = (webinar: WebinarData) => {
        setEditingWebinar(webinar);
        setModalOpen(true);
    };

    const handleDeleteWebinar = (webinar: WebinarData) => {
        setWebinars(webinars.filter(w => w !== webinar));
    };

    return (
        <div className="dashboard">
            <Header onAddWebinar={handleOpenModal} />
            <SearchAndFilter webinars={webinars} setFilteredWebinars={setFilteredWebinars} />
            <div className="webinarGrid">
                {filteredWebinars.map((webinar, index) => (
                    <WebinarCard key={index} webinar={webinar} onEdit={() => handleEditWebinar(webinar)} onDelete={() => handleDeleteWebinar(webinar)} />
                ))}
            </div>
            <WebinarModal
                open={modalOpen}
                handleClose={handleCloseModal}
                handleSave={handleSaveWebinar}
                defaultValues={editingWebinar}
            />
        </div>
    );
};

export default WebinarDashboard;
