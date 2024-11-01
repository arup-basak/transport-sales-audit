# Sales Audit Application

This application is designed to streamline and automate the sales audit process. It consists of a client-side built with Next.js and a server-side built with Express.js and Prisma.

## Architecture

The application follows a client-server architecture:

- **Client (Next.js):** Handles user interface and interacts with the server via API calls.
- **Server (Express.js, Prisma):** Provides API endpoints for data management and interacts with the database.
- **Database (PostgreSQL):** Stores the application data, managed using Prisma ORM.

## Features

- **Data Upload:** Users can upload sales data in CSV format.
- **Data Validation:** The application validates the uploaded CSV data to ensure data integrity.
- **Data Preview:** Users can preview the uploaded data before saving it to the database.
- **Timeline Management:** The application provides features to manage sales timelines, including adding, updating, and deleting entries.
- **User Authentication:** Secure user authentication and authorization are implemented.
- **Admin Dashboard:** An admin dashboard allows for managing users and other administrative tasks.

## Getting Started

### Prerequisites

- Node.js and npm (or yarn, pnpm, bun) installed.
- Docker and Docker Compose (optional, for simplified setup).
- PostgreSQL database running.

### Client Setup

1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install` (or your preferred package manager)
3. Run the development server: `npm run dev`
4. Open your browser and go to `http://localhost:3000`

### Server Setup

1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install` (or your preferred package manager)
3. Set up the database: Follow the instructions in the `server/prisma` directory to configure and migrate the database.
4. Run the development server: `npm run dev`

### Docker Setup (Optional)

1. Make sure Docker and Docker Compose are installed.
2. Navigate to the root directory of the project.
3. Run `docker compose build` to build the Docker images.
4. Run `docker compose up` to start the application.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your branch to your forked repository.
5. Create a pull request to the main repository.


## Technologies Used

- **Next.js:** Client-side framework for building user interfaces.
- **React:** JavaScript library for building user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Express.js:** Node.js web application framework for building the server.
- **Prisma:** Object-relational mapper (ORM) for database interaction.
- **PostgreSQL:** Relational database management system.
- **Docker:** Containerization platform for simplified deployment.
- **TypeScript:** Statically typed superset of JavaScript for improved code quality.

## Future Enhancements

- **Reporting and Analytics:** Generate reports and provide analytical insights based on sales data.
- **Data Visualization:** Implement data visualization tools to represent sales trends and patterns.
- **Integration with External Systems:** Integrate with other systems, such as CRM or ERP, for seamless data flow.
- **Improved User Interface:** Enhance the user interface for better usability and accessibility.

