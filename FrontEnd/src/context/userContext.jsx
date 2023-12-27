import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = (props) => {
    const [currentUser, setCurrentUser] = useState({
        Email: '',
        UserName: '',
        FullName: '',
        Contact: '',
        Location: ''
    });

    const handleUpdateUser = (user) => {
        setCurrentUser(user);
    }

    // need to add a logout button into your front end to call this from:::::
    const logOut = () => {
        setCurrentUser({
            Email: '',
            UserName: '',
            FullName: '',
            Contact: '',
            Location: ''
        });
    }

    return (
        <UserContext.Provider value={{ currentUser, handleUpdateUser, logOut }}>
            {props.children}
        </UserContext.Provider>
    )
};

export const useUserContext = () => {
    return useContext(UserContext);
}