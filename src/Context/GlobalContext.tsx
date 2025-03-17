import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

// Import the Project type from a shared types file
import { Project } from '../types/project';
import { Status } from '../types/task';

// Define the context state interface
export interface GlobalContextState {
    popUp: boolean;
    setPopUp: Dispatch<SetStateAction<boolean>>;
    projects: Project[];
    setProjects: Dispatch<SetStateAction<Project[]>>;
    currentProject?: Project;
    setCurrentProject: Dispatch<SetStateAction<Project | undefined>>;
    statuses: Status[];
    setStatuses: Dispatch<SetStateAction<Status[]>>;
}

// Create the context with an initial undefined state
const GlobalContext = createContext<GlobalContextState | undefined>(undefined);

/**
 * Global context provider component that manages application-wide state
 * @param children - Child components that will have access to the context
 */
export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State for managing popup visibility
    const [popUp, setPopUp] = useState<boolean>(false);
    // State for managing projects list
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Project>();
    const [statuses, setStatuses] = useState<Status[]>([]);

    // Create the context value object with proper typing
    const contextValue: GlobalContextState = {
        popUp,
        setPopUp,
        projects,
        setProjects,
        currentProject,
        setCurrentProject,
        statuses,
        setStatuses,
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;