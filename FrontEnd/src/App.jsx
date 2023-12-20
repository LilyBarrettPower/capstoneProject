import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import ProfilePage from './pages/ProfilePage';


function App() {
    return (
        <>
            <Header></Header>
            {/* <LoginForm></LoginForm> */}
            {/* <SignUpForm></SignUpForm> */}
            <ProfilePage></ProfilePage>

            <Footer></Footer>
        </>
    )
}

export default App