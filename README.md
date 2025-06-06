# Document Template Creator

This project is a full-stack application for converting HTML templates into structured JSON block templates, storing them in MongoDB, and providing a frontend for editing and managing document templates.

## Project Structure

```
.
├── backend/                # ASP.NET Core backend (API, Models, Services)
├── frontend/               # Frontend (likely Vue/React, Vite, Tailwind)
├── html-to-template-converter/ # Node.js tool for HTML to JSON/template conversion
└── docs/                   # Documentation and assignment PDFs
```

## Features

- **HTML to JSON Template Conversion**: Converts HTML files with special data attributes into structured JSON and Draft.js raw formats.
- **MongoDB Integration**: Stores layouts, blocks, and global definitions in MongoDB.
- **Frontend Editor**: (Assumed) Allows editing and management of templates.
- **Backend API**: (Assumed) Provides endpoints for template CRUD operations.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)
- .NET SDK (for backend)
- npm or yarn

### 1. HTML to Template Converter

Converts HTML files in `html-to-template-converter/htmlTemplates/` to JSON and uploads them to MongoDB.

#### Setup

1. Copy `.env.example` to `.env` and set your `MONGODB_URI`.
2. Install dependencies:

   ```sh
   cd html-to-template-converter
   npm install
   ```

3. Place your HTML templates in `htmlTemplates/`.

#### Run the Converter

```sh
npm start
```

- Outputs JSON files to `generatedFiles/`.
- Saves layouts, blocks, and globals to MongoDB.

### 2. Backend

1. Navigate to `backend/`.
2. Configure `appsettings.json` for your environment.
3. Build and run the backend:

   ```sh
   dotnet build
   dotnet run
   ```

### 3. Frontend

1. Navigate to `frontend/`.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Run the frontend:

   ```sh
   npm run dev
   ```

## File Overview

- `html-to-template-converter/index.js`: Main script for HTML to JSON/template conversion.
- `html-to-template-converter/models/`: Mongoose models for layouts, blocks, and globals.
- `backend/`: ASP.NET Core backend (API, Models, etc.).
- `frontend/`: Frontend app (Vite, Tailwind, etc.).
- `docs/`: Assignment and documentation PDFs.

## Example Workflow

1. Add or edit HTML templates in `html-to-template-converter/htmlTemplates/`.
2. Run the converter to generate JSON and upload to MongoDB.
3. Use the frontend to view/edit templates.
4. Backend serves API for templates and data.

## License

This project is for educational and demonstration purposes.

---

**Author:** Your Name  
**Assignment:** Document Template Creator
