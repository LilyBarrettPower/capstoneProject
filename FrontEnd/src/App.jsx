import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';



function App() {
    return (
        <>
            <Header></Header>
            {/* <LoginForm></LoginForm> */}
            <SignUpForm></SignUpForm>

            <Footer></Footer>
        </>
    )
}

export default App