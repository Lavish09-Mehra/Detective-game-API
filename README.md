# Practice API

A practice REST API for a detective-themed application built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.

## Tech Stack

- Node.js
- Express 5
- MongoDB Atlas + Mongoose
- dotenv

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the project root with:

```env
MONGO_URL=<your-mongodb-connection-string>
```

### 3. Run the server

```bash
npm start
```

The server starts at `http://localhost:3000` after a successful database connection.

## Project Structure

```
├── models/
│   ├── users.js                 # Detective model
│   ├── cases.js                 # Case model
│   ├── evidenceSchema.js        # Evidence model
│   ├── investigationSchema.js   # Investigation model
│   └── suspectSchema.js         # Suspect model
├── Routes/
│   ├── login.js                 # Detectives
│   ├── case.js                  # Cases
│   ├── evidences.js             # Evidence
│   ├── investigations.js        # Investigations
│   └── suspects.js              # Suspects
├── server.js                    # App entry point
└── package.json
```

## API Reference

All endpoints return JSON.

### Health Check

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/` | Server status |

### Detectives (Routes/login.js)

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/login` | Create a detective (username, email, caseSolved, score) |
| GET | `/detectives` | List all detectives |

### Cases (Routes/case.js)

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/create-case` | Create a case |
| GET | `/cases` | List all cases (newest first) |
| GET | `/case-location/:location` | Find cases by location |
| GET | `/case-status/:status` | Find cases by status (`investigating`, `solved`, `closed`) |
| GET | `/case-date/:date` | Find cases by date |
| DELETE | `/case/:id` | Delete a case by ID |

**POST /create-case** body:

```json
{
  "title": "The Riverside Mystery",
  "description": "A body found near the river.",
  "location": "Riverside",
  "date": "2026-08-15",
  "creator": "65f9c0...detectiveId",
  "status": "investigating",
  "solution": {
    "killer": "65f9c0...suspectId",
    "motive": "Revenge",
    "weapon": "Rope"
  }
}
```

### Evidence (Routes/evidences.js)

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/create-evidence/:evidId/caseof` | Create evidence for a case (`:evidId` is the case ID) |
| GET | `/get-evidence/:caseEvid/caseof` | Get all evidence of a case |
| DELETE | `/evidence/:id` | Delete evidence by ID |

**POST /create-evidence/:evidId/caseof** body:

```json
{
  "type": "fingerprint",
  "title": "Latent print on glass",
  "description": "Print recovered from window pane.",
  "location": "Study room",
  "discoveredAt": "2026-08-15",
  "linkedSuspects": ["65f9c0...suspectId"],
  "importance": "high"
}
```

### Suspects (Routes/suspects.js)

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/suspects/:id/caseof` | Create a suspect for a case (`:id` is the case ID) |
| GET | `/case/:id/suspects` | Get all suspects of a case |
| DELETE | `/suspect/:id` | Delete a suspect by ID |

**POST /suspects/:id/caseof** body:

```json
{
  "name": "Victor Crane",
  "age": "45",
  "occupation": "Lawyer",
  "motive": "Inheritance",
  "behavior": "Nervous during questioning",
  "suspicionScore": 8
}
```

### Investigations (Routes/investigations.js)

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/investigation/:investCaseId/caseof` | Create an investigation for a case |
| GET | `/detective/:caseId/case` | Get the detective assigned to a case |
| GET | `/investigation/:investId/report` | Get the investigation report by investigation ID |
| DELETE | `/investigation/:id` | Delete an investigation by ID |

**POST /investigation/:investCaseId/caseof** body:

```json
{
  "detective": "65f9c0...detectiveId",
  "actions": [
    {
      "notes": "Interviewed the butler.",
      "date": "2026-08-16"
    }
  ],
  "theories": "The killer knew the victim personally.",
  "finalAccusation": "65f9c0...suspectId",
  "result": "Case remains open"
}
```

## Common Responses

- `200` — Success
- `201` — Created
- `400` — Bad request / missing fields
- `404` — Resource not found
- `500` — Server error

## About

This project is made by **Lavish Mehra**

GitHub: [https://github.com/Lavish09-Mehra](https://github.com/Lavish09-Mehra)

If you like this project, give it a star! &#11088;
