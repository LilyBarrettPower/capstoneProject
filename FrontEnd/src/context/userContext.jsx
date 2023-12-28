
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = (props) => {
    const [currentUser, setCurrentUser] = useState({
        Email: '',
        UserName: '',
        FullName: '',
        Contact: '',
        Location: '',
        ProfilePhoto: '',
    });


    const handleUpdateUser = (user) => {
        setCurrentUser(user);
        console.log('updated user', user);
    }

    const logOut = () => {
        setCurrentUser({
            Email: '',
            UserName: '',
            FullName: '',
            Contact: '',
            Location: '',
            ProfilePhoto: '',
        });
        console.log('user logged out');
    }

    return (
        <UserContext.Provider value={{ currentUser, handleUpdateUser, logOut }}>
            {props.children}
        </UserContext.Provider>
    )
};

export const useUserContext = () => {
    return useContext(UserContext);
};