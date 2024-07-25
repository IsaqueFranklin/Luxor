import {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({children}) {

    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    const [bell, setBell] = useState(false);

    useEffect(() => {
        axios.get('/profile').then(({data}) => {
            setUser(data);
            setReady(true);
            setBell(false);
        });
    }, [bell]);

    return (
        <UserContext.Provider value={{user, setUser, ready, setBell}}>
            {children}
        </UserContext.Provider>
    );
}