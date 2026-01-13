# GigFlow - Freelance Marketplace

A full-stack freelance marketplace application built with React, Node.js, MongoDB, and Socket.io featuring real-time notifications and atomic transaction-safe hiring logic.

## 🚀 Features

- **User Authentication**: JWT-based authentication with HttpOnly cookies
- **Gig Management**: Post and browse freelance gigs
- **Bidding System**: Freelancers can bid on open gigs
- **Atomic Hiring**: Race-condition safe hiring logic using MongoDB transactions
- **Real-time Notifications**: Socket.io powered instant notifications when hired
- **Search Functionality**: Search gigs by title
- **Role-based Behavior**: No explicit roles - behavior determined by actions

## 🛠️ Tech Stack

### Frontend
- React.js 18 (Vite)
- Redux Toolkit (State Management)
- React Router (Navigation)
- Tailwind CSS (Styling)
- Axios (HTTP Client)
- Socket.io Client (Real-time)
- React Hot Toast (Notifications)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- bcryptjs (Password Hashing)
- Socket.io (Real-time Communication)
- Cookie Parser (Cookie Management)

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
cd gigflow
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
MONGO_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your_jwt_secret_key_change_in_production
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

Start MongoDB (if running locally):

```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

Start the backend server:

```bash
npm run dev
# or for production
npm start
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
gigflow/
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── gigController.js
│   │   └── bidController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Gig.js
│   │   └── Bid.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── gigRoutes.js
│   │   └── bidRoutes.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── utils/
│   │   └── jwt.js
│   ├── socket/
│   │   └── index.js
│   ├── index.js
│   ├── package.json
│   └── .env.example
│
└── client/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── GigFeed.jsx
    │   │   ├── PostGig.jsx
    │   │   └── GigDetail.jsx
    │   ├── store/
    │   │   ├── store.js
    │   │   ├── authSlice.js
    │   │   ├── gigSlice.js
    │   │   └── bidSlice.js
    │   ├── utils/
    │   │   ├── api.js
    │   │   └── socket.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Gigs
- `GET /api/gigs` - Get all open gigs (supports ?search=keyword)
- `GET /api/gigs/:id` - Get gig by ID
- `POST /api/gigs` - Create new gig (protected)

### Bids
- `POST /api/bids` - Create new bid (protected)
- `GET /api/bids/:gigId` - Get bids for a gig (owner only)
- `PATCH /api/bids/:bidId/hire` - Hire a freelancer (atomic transaction)

## 🔒 Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- JWT stored in HttpOnly cookies (not localStorage)
- CORS configured for specific origin
- Authentication middleware on protected routes
- Input validation on all endpoints
- MongoDB injection protection via Mongoose

## ⚡ Key Features Explained

### Atomic Hiring Logic

The hiring process uses MongoDB transactions to ensure data consistency:

1. Verifies gig status is "open"
2. Updates gig status to "assigned"
3. Updates selected bid to "hired"
4. Updates all other bids to "rejected"

If two hire requests occur simultaneously, only one succeeds - the transaction guarantees atomicity.

### Real-time Notifications

When a freelancer is hired:
1. Backend completes hiring transaction
2. Socket.io emits event to specific user
3. Frontend displays toast notification immediately
4. No page refresh required

### No Role System

The app uses behavior-based access control:
- Anyone can view gigs
- Logged-in users can post gigs (become owners)
- Logged-in users can bid on others' gigs (become freelancers)
- Only gig owners can see and manage bids

## 🧪 Testing the Application

1. **Register two users** - one as client, one as freelancer
2. **Post a gig** with the first user
3. **Place a bid** with the second user
4. **View bids** as the gig owner
5. **Hire the freelancer** - notice the real-time notification
6. **Verify atomic behavior** - all other bids are automatically rejected

## 🚧 Production Deployment

### Backend

1. Set environment variables:
   - `MONGO_URI` - Production MongoDB connection string
   - `JWT_SECRET` - Strong random secret
   - `CLIENT_URL` - Production frontend URL
   - `NODE_ENV=production`

2. Ensure MongoDB supports transactions (replica set or Atlas)

### Frontend

1. Build the production bundle:
   ```bash
   npm run build
   ```

2. Update API URL in `src/utils/api.js` for production

3. Deploy to platforms like Vercel, Netlify, or serve with Nginx

## 📝 License

ISC

## 👨‍💻 Developer Notes

- MongoDB transactions require a replica set (use MongoDB Atlas for easy setup)
- Socket.io authentication uses JWT token passed from client
- Redux Toolkit used for clean, maintainable state management
- Tailwind CSS for rapid UI development
- Vite for fast development experience

## 🐛 Troubleshooting

**Socket not connecting:**
- Ensure backend is running on port 5000
- Check CORS settings match CLIENT_URL

**Transactions failing:**
- Verify MongoDB is running as replica set
- Use MongoDB Atlas (supports transactions by default)

**Cookies not being set:**
- Check `withCredentials: true` in axios config
- Verify CORS origin matches exactly
- Ensure sameSite and secure cookie settings

---


