// Define project status types
export type ProjectStatus = 'notStarted' | 'IN_PROGRESS' | 'DONE';

// Interface for team member data structure
export interface TeamMember {
    id: string;
    value: string;
    label: string;
}

// Interface for project data structure
export interface Project {
    id: string;
    title: string;
    status: ProjectStatus;
    startDate: string;
    endDate: string;
    description: string;
    teamMembers: TeamMember[];
}

// Interface for project data to be sent to the API
export interface ProjectPayload {
    title: string;
    status: ProjectStatus;
    startDate: string;
    endDate: string;
    description: string;
    teamMembers: string[]; // Array of member IDs
}

// Interface for status data
export interface StatusData {
    name: string;
    color: string;
} 