import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
    const [userData, setUserData] = useState(null);

    const [registrationStep, setRegistrationStep] = useState(0);

    return (
        <AuthContext.Provider 
            value={{
                userData,
                setUserData,
                registrationStep,
                setRegistrationStep
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}