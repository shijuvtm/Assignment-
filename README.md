# File Upload and Management React App

This is a React-based web application that allows users to upload and manage files. It includes user authentication and a dashboard for managing uploaded files.

## Features

- **User Authentication**: Register and login functionality.
- **File Upload**: Upload files to the server.
- **File Management**: View and manage uploaded files.
- **Responsive Design**: Optimized for various screen sizes.

## Technologies Used

- React
- React Router
- JavaScript
- CSS
- Flask
- FAST API

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js installed on your machine.
- A package manager like `npm` or `yarn`.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── FileList.js
│   │   ├── FileUpload.js
│   │   ├── Register.js
│   │   ├── Login.js
│   │   └── Dashboard.js
│   ├── App.js
│   └── index.js
└── public/
```

## Available Routes

- `/`: Home page with login and register buttons.
- `/login`: Login page.
- `/register`: Registration page.
- `/files`: File list and management page.
- `/upload`: File upload page.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## Contact

For any questions or feedback, please contact [shijuavtm@gmail.com].
