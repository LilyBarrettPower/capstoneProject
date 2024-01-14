import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';
import TimelinePage from '../pages/TimelinePage';
import MessagesPage from '../pages/MessagesPage';
import SavedItemsPage from '../pages/SavedItemsPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';


function AppRoutes() {
    return (
        <Routes>
            <Route path="/LoginPage" element={<LoginPage/>}/>
            <Route path="/ProfilePage" element={<ProfilePage/>} />
            <Route path="/TimelinePage" element={<TimelinePage/>} />
            <Route path="/MessagesPage" element={<MessagesPage/>} />
            <Route path="/SavedItemsPage" element={<SavedItemsPage/>} />
            <Route path='/SignupPage' element={<SignupPage/>}/>
         
            <Route index element={<Navigate to="/LoginPage" />} />
        </Routes>
    );
}

export default AppRoutes;