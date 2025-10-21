# Company Explorer

Company Explorer is a responsive single-page web application built with React and Next.js. It provides a modern and intuitive interface for users to browse, search, filter, and sort a directory of companies. The project is designed to showcase strong frontend development skills, including state management, component-based architecture, and API data handling.

![Company Explorer Screenshot](https://i.imgur.com/your-screenshot.png) <!-- It's recommended to replace this with a screenshot of your running application -->

## Features

- **Responsive Design**: A mobile-first design that looks great on all screen sizes, from mobile phones to desktops.
- **Dynamic Search**: Instantly search for companies by name with real-time feedback.
- **Advanced Filtering**: Filter companies by multiple criteria, including industry, location, and minimum number of employees.
- **Sorting Options**: Sort the company list by name (A-Z, Z-A), number of employees (high-low, low-high), or founding year (new-old, old-new).
- **Pagination**: The company list is paginated to ensure a clean UI and fast load times.
- **Loading & Error States**: A professional user experience with clear loading indicators while data is being fetched and user-friendly messages for errors or empty results.
- **Modern UI**: Built with **shadcn/ui** and styled with **Tailwind CSS** for a clean, modern, and customizable look and feel.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14
- **Library**: [React.js](https://react.dev/) 18
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom theme and dark mode support.
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Linting & Formatting**: ESLint

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18.x or later) and [npm](https://www.npmjs.com/) installed on your computer.

### Installation & Setup

1.  **Clone the repository (or set up the project files):**
    If you have a git repository, you can clone it. Otherwise, make sure all the project files are in a single folder.

2.  **Navigate to the project directory:**
    ```bash
    cd /path/to/your-project-folder
    ```

3.  **Install dependencies:**
    This command will read the `package.json` file and install all the necessary libraries.
    ```bash
    npm install
    ```

4.  **Run the development server:**
    This will start the application in development mode.
    ```bash
    npm run dev
    ```

5.  **Open the application:**
    Open your browser and navigate to [http://localhost:9002](http://localhost:9002) to see the application live.

## Code Structure

The project is organized with a clear and scalable structure:

-   **/public/api/companies.json**: A static JSON file that acts as a mock API to provide company data.
-   **/src/app/**: The main application directory for a Next.js App Router project.
    -   `App.jsx`: The core component that contains all state management, data fetching, and filtering/sorting logic.
    -   `layout.jsx`: The root layout for the application, where global styles and fonts are imported.
    -   `globals.css`: Contains the base styles and theme (color palette, etc.) for Tailwind CSS.
-   **/src/components/**: Contains all the reusable React components.
    -   `ui/`: Pre-built UI components from **shadcn/ui** (e.g., `Card`, `Button`, `Select`).
    -   `company-card.jsx`: A component to display a single company's information.
    -   `company-filters.jsx`: The component that houses all the search and filter controls.
    -   `pagination.jsx`: The component for page navigation.
-   **/src/hooks/**: Custom React hooks used across the application.
-   **/src/lib/**: Utility functions and libraries.
-   **tailwind.config.js**: The configuration file for Tailwind CSS, where the theme is extended.
-   **next.config.js**: The configuration file for Next.js.
