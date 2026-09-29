# Urban Farming Assistant

A full-stack AI-powered web application designed to help urban gardeners plan, monitor, and improve their growing spaces. The platform combines plant management, weather-aware watering, crop recommendations, disease diagnosis, community discussion, and admin moderation in a single experience.

## Overview

Urban Farming Assistant helps users:

- manage home gardens and plant records
- receive crop suggestions based on location and conditions
- diagnose plant health issues using image-based AI analysis
- generate watering schedules using weather and plant data
- track tasks and schedules for crops and gardens
- connect with a gardening community for knowledge sharing
- access admin controls for moderation and oversight

This project is built with a React frontend and an Express + MongoDB backend, with AI integrations powered by Google Gemini, Plant.id, and OpenWeather.

## Features

### Smart crop recommendations
- Suggests suitable crops and growing strategies based on user location, climate, and plant needs
- Uses AI-powered recommendation logic and weather-aware analysis

### Plant disease diagnosis
- Allows users to upload plant images for disease analysis
- Uses Plant.id-based assessment and gives treatment guidance

### Watering and care scheduling
- Generates weather-adjusted watering schedules
- Suggests daily or periodic reminders for plant care

### Garden and plant management
- Add, update, and manage gardens and plants
- Track plant health, watering needs, and related metadata

### Community engagement
- Create gardening posts and share updates
- Like, comment, and participate in community discussions
- Community leaderboard and moderation features

### Admin dashboard
- Review flagged community content
- Moderate posts and manage platform activity
- Monitor usage and platform administration

### Authentication and user profiles
- Secure registration/login flow with JWT authentication
- Role-based admin/user access
- User profile and preference management

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- CSS modules and custom styles

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Cloudinary for media uploads
- Express rate limiting and validation

### AI & Services
- Google Gemini
- Plant.id API
- OpenWeather API
- Email notifications

## Project Structure

```text
urban_farming_assistant/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── services/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── scripts/
│   └── seedData.js
├── README.md
└── package.json (if present in root)
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+ recommended
- npm
- MongoDB running locally or a MongoDB Atlas connection
- API keys for:
  - Plant.id
  - Google Gemini
  - OpenWeather
  - Cloudinary

## Installation

### 1. Clone the project

```bash
git clone <repository-url>
cd urban_farming_assistant
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Environment Variables

Create a `.env` file inside the `backend` folder with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/urban_farming
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PLANT_ID_API_KEY=your_plant_id_key
GEMINI_API_KEY=your_gemini_key
OPENWEATHER_API_KEY=your_openweather_key

EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password
```

> Keep secrets in your local environment and never commit real API keys to version control.

## Running the Application

### Start the backend

```bash
cd backend
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### Start the frontend

```bash
cd frontend
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

## Creating an Admin User

The project includes a helper script for creating an admin user.

```bash
cd backend
node scripts/create-admin.js
```

You can also provide custom values:

```bash
node scripts/create-admin.js user@example.com StrongPassword "Admin Name" adminusername
```

## Typical User Flow

1. Register or log in as a user
2. Add a garden and plant records
3. View plant recommendations and weather insights
4. Generate watering plans
5. Upload plant images for diagnosis
6. Engage in the community forum
7. Access admin moderation features if you are an admin

## API Overview

The backend exposes REST APIs under `/api` for:

- Authentication: `/api/auth`
- Users: `/api/users`
- Gardens: `/api/gardens`
- Plants: `/api/plants`
- Crop recommendations: `/api/crops`
- Disease diagnosis: `/api/disease`
- Watering: `/api/watering`
- Schedules: `/api/schedule`
- Community: `/api/community`
- Admin: `/api/admin`
- Uploads: `/api/upload`
- Weather: `/api/weather`

## Notes

- The app is designed as a modern full-stack MVP for urban farming assistance.
- Some AI features depend on valid external API credentials.
- Cloudinary is used for image upload and media handling.
- The app expects MongoDB to be available before running the backend.

## License

This project is currently distributed without an explicit license. If you intend to share or deploy it publicly, add a license file and update this section accordingly.

## Contributing

Contributions are welcome. You can:

- improve the UI/UX
- add new AI recommendation logic
- improve scheduling logic and notifications
- add tests and validation
- optimize backend security and performance

## Support

For local development, make sure all required services are running before testing AI and media workflows.

---

Built for smarter, greener urban gardening.
