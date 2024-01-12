// import the relevant components:
import NavBar from "../components/NavBar";
import Header from '../components/Header';
import LogOutButton from "../components/LogOutButton";
import Messages from "../components/Messages";



function MessagesPage() {


    return (
        <>
            <Header></Header>
            <NavBar></NavBar>
            <LogOutButton></LogOutButton>
            <Messages></Messages>
        </>
    )
}

export default MessagesPage;