import React from 'react';
import Routes from './routes/AppRoutes';
import { UserProvider } from './context/userContext';
function App() {
    return (
        <>
            {/* Wrap routes with userProvider to provide the user context throughout application  */}
            <UserProvider>
                <Routes></Routes>
            </UserProvider>
        </>
    )
}

export default App