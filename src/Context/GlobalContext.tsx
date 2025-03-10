import React, { createContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [popUp, setPopUp] = useState(false);
    const [projects, setProjects] = useState([]);

    return (
        <GlobalContext.Provider value={{ popUp, setPopUp, projects, setProjects }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;