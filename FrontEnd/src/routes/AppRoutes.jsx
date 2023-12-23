import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';
import TimelinePage from '../pages/TimelinePage';
import MessagesPage from '../pages/MessagesPage';
import SavedItemsPage from '../pages/SavedItemsPage';
import NotificationsPage from '../pages/NotificationsPage';
import LoginPage from '../pages/LoginPage';


function AppRoutes() {
    return (
        <Routes>
            <Route path="/LoginPage" element={<LoginPage/>}/>
            <Route path="/ProfilePage" element={<ProfilePage/>} />
            <Route path="/TimelinePage" element={<TimelinePage/>} />
            <Route path="/MessagesPage" element={<MessagesPage/>} />
            <Route path="/SavesItemsPage" element={<SavedItemsPage/>} />
            <Route path="/NotificationsPage" element={<NotificationsPage/>} />
         
            <Route index element={<Navigate to="/LoginPage" />} />
        </Routes>
    );
}

export default AppRoutes;