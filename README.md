# Student Management System

A full-stack Student Management System built with the MERN stack. The application allows users to manage student records, filter and sort students, and view school-wide academic statistics through a clean, responsive interface.

## 🌐 Live Demo

**Live Application:** [Student Management System](https://student-management-system-gpiy.vercel.app/)

**Backend API:** [API URL](https://student-management-system-ten-ashy.vercel.app/)

## Features

### Student Management
- **View Students:** Fetch and display student records from MongoDB.
- **Add Students:** Create student records through a form with validation.
- **Student Details:** View individual student information.
- **Edit Students:** Update existing student records with prefilled form fields.
- **Delete Students:** Remove student records with confirmation.
- **Toast Notifications:** Display success and error messages for user actions.

### Class View
- Filter students by gender: All, Boys, and Girls.
- Sort students alphabetically by name.
- Sort students by marks or attendance.
- Combine filtering and sorting.
- Display an empty state when no students match the selected filter.

### School Dashboard
- Display the total number of students.
- Calculate average attendance.
- Calculate average marks.
- Identify the top-performing student based on marks.
- Display averages rounded to two decimal places.
- Visualize average attendance and marks with progress bars.

### User Interface
- Responsive layouts built with Tailwind CSS.
- Client-side navigation with React Router.
- Active navigation highlighting.
- Loading, empty, and error states.

## Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 19 |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| State Management | Redux Toolkit |
| React-Redux Integration | React Redux |
| Routing | React Router |
| Notifications | Sonner |
| Backend | Node.js |
| API | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Deployment | Vercel |

## Project Structure

```text
SMS-react/
├── backend/
│   ├── db/
│   │   └── db.connection.js
│   ├── models/
│   │   └── students.model.js
│   ├── data/
│   │   └── students.data.js
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── main-app/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   └── store.js
│   │   ├── components/
│   │   │   ├── StudentForm.jsx
│   │   │   └── StudentList.jsx
│   │   ├── features/
│   │   │   ├── students/
│   │   │   │   └── studentsSlice.js
│   │   │   └── school/
│   │   │       └── schoolSlice.js
│   │   ├── pages/
│   │   │   ├── StudentsView.jsx
│   │   │   ├── StudentDetail.jsx
│   │   │   ├── ClassView.jsx
│   │   │   └── SchoolView.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

*Note: This structure reflects the current project organization. Adjust filenames or folders if your implementation differs.*

## Getting Started

Follow these steps to run the application locally.

### Prerequisites

Install the following:

- Node.js and npm
- MongoDB Atlas account or a local MongoDB instance
- Git

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd SMS-react
```

Replace the placeholder with your actual GitHub repository URL.

### 2. Configure the backend

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB connection URI.

Ensure that your MongoDB Atlas network access settings and database credentials allow the application to connect.

### 3. Start the backend

From the `backend/` directory, run:

```bash
node index.js
```

The API should be available at:

```text
http://localhost:3000
```

Available endpoints include:

```text
GET     /students
POST    /students
PUT     /students/:id
DELETE  /students/:id
```

### 4. Configure the frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd main-app
npm install
```

Create a `.env` file inside `main-app/`:

```env
VITE_API_URL=http://localhost:3000
```

The frontend uses this variable to communicate with the backend.

For production, set `VITE_API_URL` to your deployed backend's base URL, without a trailing `/students` path.

**Important:** Restart the Vite development server after changing environment variables.

### 5. Start the frontend

From `main-app/`, run:

```bash
npm run dev
```

Open the local URL printed by Vite, typically:

```text
http://localhost:5173
```

## API Documentation

The backend exposes RESTful endpoints for managing student records.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API health/message endpoint |
| GET | `/students` | Retrieve all students |
| POST | `/students` | Create a student |
| PUT | `/students/:id` | Update a student |
| DELETE | `/students/:id` | Delete a student |

### Student Data Model

A student record contains the following fields:

```json
{
  "name": "Aarav Sharma",
  "age": 15,
  "gender": "Male",
  "grade": "10th",
  "attendance": 92,
  "marks": 88
}
```

MongoDB automatically assigns an `_id` to each persisted student record.

### Example: Create a Student

**Request**

```http
POST /students
Content-Type: application/json
```

**Body**

```json
{
  "name": "Aarav Sharma",
  "age": 15,
  "gender": "Male",
  "grade": "10th",
  "attendance": 92,
  "marks": 88
}
```

A successful creation should return HTTP `201 Created` with the created student record.

## State Management

Redux Toolkit manages the application's shared state.

### Students Slice

The students slice handles:

- Fetching student records.
- Adding new students.
- Updating existing students.
- Deleting students.
- Managing request status and error state.
- Storing gender filter and sort preferences for the Class View.

Async operations use Redux Toolkit's `createAsyncThunk`.

### School Slice

The school slice stores calculated statistics:

- `totalStudents`
- `averageAttendance`
- `averageMarks`
- `topStudent`

The School View recalculates these statistics when the student data changes and fetches records when necessary.

## Deployment

### Backend

The backend can be deployed to Vercel with the appropriate serverless configuration.

Configure the following environment variable in your deployment settings:

```env
MONGODB_URI=your_production_mongodb_connection_string
```

Set `PORT` only as required by your hosting environment. Ensure your entry point and routing are configured for the selected deployment platform.

### Frontend

Deploy the `main-app` directory using Vercel or another compatible static frontend host.

Configure the production environment variable:

```env
VITE_API_URL=https://your-backend-domain.example
```

Replace the example URL with your actual deployed backend URL.

After deployment, verify that the frontend can access the API, CORS is configured correctly, and refreshing nested routes works as expected.

## Environment Variables

| Variable | Location | Purpose |
|---|---|---|
| `MONGODB_URI` | Backend | MongoDB connection string |
| `PORT` | Backend | Local server port |
| `VITE_API_URL` | Frontend | Backend API base URL |

Never commit actual credentials or secret environment values to version control.

Add the following entries to your `.gitignore` files as appropriate:

```gitignore
.env
.env.*
!.env.example
node_modules/
dist/
```

## Available Scripts

### Frontend

Run these commands inside `main-app/`.

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

- `dev` starts the Vite development server.
- `build` creates a production build.
- `lint` runs ESLint.
- `preview` serves the production build locally.

### Backend

Run these commands inside `backend/`.

```bash
node index.js
```

If you configure an npm development script, you can also use `npm run dev`.

## Future Improvements

Potential enhancements for future versions include:

- Search students by name.
- Pagination for larger student lists.
- Filtering by grade or class.
- Authentication and role-based access control.
- Server-side validation and more comprehensive error handling.
- Export student records to CSV.
- Automated frontend and backend tests.
- Expanded academic analytics and attendance history.

## Learning Outcomes

This project demonstrates practical experience with:

- Building a full-stack application using the MERN stack.
- Designing and consuming REST APIs.
- Modeling data with MongoDB and Mongoose.
- Managing asynchronous state with Redux Toolkit.
- Implementing CRUD operations.
- Building reusable React components.
- Routing with React Router.
- Styling responsive interfaces with Tailwind CSS.
- Configuring environment variables and deployment.

## License

This project is available for educational and portfolio purposes. Add a `LICENSE` file if you intend to distribute it under a specific open-source license.

---

**Built with React, Redux Toolkit, Node.js, Express, MongoDB, and Tailwind CSS.**
