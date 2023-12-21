import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import ProfilePage from './pages/ProfilePage';
import CreatePostButton from './components/CreatePostButton';

function App() {
    return (
        <>
            <Header></Header>
            {/* <LoginForm></LoginForm> */}
            {/* <SignUpForm></SignUpForm> */}
            <ProfilePage></ProfilePage>
            <CreatePostButton></CreatePostButton>
            <Footer></Footer>
        </>
    )
}

export default App