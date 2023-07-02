import React, {useState} from 'react';

const AuthContext = React.createContext({
    isLoggedIn : false,
    onLogout : () => {},
    onLogin : () => {}
})

export default AuthContext;

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const loginHandler = () =>{
        setIsLoggedIn(true);
    }

    const logoutHandler = () => {
        setIsLoggedIn(false);
    }

    return (
    <AuthContext.Provider 
        value = {
            {
                isLoggedIn : isLoggedIn, 
                onLogout : logoutHandler, 
                onLogin : loginHandler
            }
    }>
        {props.children}
    </AuthContext.Provider>
    );
}