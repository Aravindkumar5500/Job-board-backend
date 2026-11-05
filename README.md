# Job Board — Express API

Express and MongoDB API for the [Job Board React frontend](https://github.com/Aravindkumar5500/job-board).

## Features

- List all jobs
- Retrieve a job by ID
- Create a job listing
- Basic required-field checks and duplicate detection by title/company

## Tech stack

- Node.js
- Express 5
- MongoDB and Mongoose
- dotenv
- CORS

## API

Base path: `/jobs`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/jobs` | Return job listings |
| GET | `/jobs/:id` | Return one job by MongoDB ID |
| POST | `/jobs` | Create a job listing |

Example request:

```json
{
  "title": "Frontend Developer",
  "company": "Example Company",
  "description": "Build and maintain web interfaces."
}
```

## Run locally

```bash
git clone https://github.com/Aravindkumar5500/Job-board-backend.git
cd Job-board-backend
npm install
cp .env.example .env
```

Set your own MongoDB connection string in `.env`:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3007
```

Start the API:

```bash
npm start
```

## Related frontend

- [Job Board Frontend](https://github.com/Aravindkumar5500/job-board)
- Live frontend: https://job-board-black-two.vercel.app

## Security and production notes

This is a learning project. The create-job endpoint is currently unauthenticated and CORS is permissive. Before production use, add authentication/authorization, rate limiting, strict input validation, controlled CORS origins, and consistent HTTP status codes and error responses.
