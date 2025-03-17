# MetoTask

MetoTask is a task and project management application designed to help teams stay organized and productive. It features a user-friendly interface with customizable Kanban boards, task and project tracking, and secure authentication.

## Features
- **Task Management:** Create, read, update, and delete tasks.
- **Project Management:** Manage projects with full CRUD operations.
- **Authentication:** Secure login and registration with JWT authentication.
- **Protected Routes:** Prevent unauthorized users from accessing sensitive pages.
- **Drag and Drop Kanban:** Custom drag-and-drop Kanban page to visualize tasks.
- **Profile & Dashboard:** Personalized profile page and project overview dashboard.
- **Responsive Design:** Built with CSS Modules for modular and maintainable styling.

## Project Structure
- **Frontend:** Built with React, TypeScript, and Vite.
- **Backend:** Spring Boot with MongoDB.
- **Containerization:** Docker Compose for easy deployment.

## Repositories
- Frontend: [MeloTask Frontend](https://github.com/5-Melo/MeloTask)
- Backend: [MeloTask Backend](https://github.com/5-Melo/rest-api)

## Prerequisites
- Node.js and npm (or Yarn)
- Docker and Docker Compose

## Installation Steps

### Frontend Setup
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/5-Melo/MeloTask.git
   cd MeloTask
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
### Backend Setup
1. Clone the backend repository:
   ```bash
   git clone https://github.com/5-Melo/rest-api.git
   cd rest-api
   ```
2. Ensure Docker is running.
3. Start the backend and database using Docker Compose:
   ```bash
   docker-compose up --build
   ```
## License
This project is licensed under the MIT License.

## Contact
For any inquiries, please reach out to the project team.


