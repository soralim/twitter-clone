import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, serCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            serCurrentUser(user);
            setLoading(false);
        })
    }, []);

    const value = { currentUser };

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}