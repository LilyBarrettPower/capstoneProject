// import the relevant components:
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

function LoginPage() {
    return (
        <>
            <video
                autoPlay
                loop
                muted
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: '-1',
                }}
            >
                <source src="/LoginPageVideo.mp4" type="video/mp4" />
            </video>
            <h1 className="mainHeading textContent text-center ">RentShare</h1>
            {/* <Header></Header> */}
            <LoginForm />

        </>
    )
}

export default LoginPage;