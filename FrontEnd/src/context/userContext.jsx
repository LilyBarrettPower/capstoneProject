
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = (props) => {
    const [currentUser, setCurrentUser] = useState({
        UserID: '', //include the UserID in the context for db integration
        Email: '',
        UserName: '',
        FullName: '',
        Contact: '',
        Location: '',
        ProfilePhoto: '',
    });

    const handleUpdateUser = (user) => {
        // Convert ProfilePhoto to object URL if it's a File object
        if (user.ProfilePhoto instanceof File) {
            user.ProfilePhoto = URL.createObjectURL(user.ProfilePhoto);
        }

        setCurrentUser(user);
        console.log('updated user', user);
            console.log('updated UserID', user.UserID);
    };

    const logOut = () => {
        setCurrentUser({
            UserID: '',
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