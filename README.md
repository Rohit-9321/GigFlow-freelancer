# GigFlow - Freelance Marketplace

A full-stack freelance marketplace application where users can post gigs, submit bids, and hire freelancers. Built with React, Node.js, MongoDB, and Socket.io featuring real-time notifications, atomic transaction-safe hiring logic, and responsive design for both mobile and web.

## ✨ Features

### Core Functionality
- **User Authentication**: Secure JWT-based authentication with HttpOnly cookies
- **Gig Management**: Create, browse, and manage freelance gigs
- **Bidding System**: Submit bids on open gigs with price and message
- **Atomic Hiring**: Race-condition safe hiring logic using MongoDB transactions
- **Real-time Notifications**: Socket.io powered instant notifications when hired
- **Live Search**: Debounced real-time search functionality for gigs
- **My Gigs Dashboard**: View and manage your posted gigs with bid counts
- **My Bids Dashboard**: Track all your submitted bids and their statuses
- **Protected Routes**: Secure client-side route protection

### User Experience
- **Responsive Design**: Fully optimized for mobile phones, tablets, and desktop
- **Sticky Navigation**: Persistent navbar with user dropdown menu
- **Toast Notifications**: User-friendly feedback for all actions
- **Hero Section**: Eye-catching landing page with CTAs
- **Status Tracking**: Visual status indicators (open/assigned, pending/hired/rejected)

### Technical Features
- **No Duplicate Bids**: Database-level constraint prevents multiple bids per user per gig
- **Proxy Trust**: Configured for deployment behind reverse proxies
- **Error Handling**: Comprehensive error handling across frontend and backend
- **CORS Support**: Secure cross-origin resource sharing
- **MongoDB Transactions**: Ensures data consistency during concurrent operations

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Modern UI library (Vite build tool)
- **Redux Toolkit** - State management with slices (auth, gigs, bids)
- **React Router v6** - Client-side routing with protected routes
- **Tailwind CSS 3** - Utility-first responsive styling
- **Axios** - HTTP client with interceptors
- **Socket.io Client** - Real-time bidirectional communication
- **React Hot Toast** - Beautiful toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Socket.io** - Real-time WebSocket communication
- **Cookie Parser** - Parse HTTP cookies
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Request validation middleware
- **dotenv** - Environment variable management

## 📁 Project Structure

```
gigflow/
├── Backend/
│   ├── index.js                 # Express server & Socket.io initialization
│   ├── package.json             # Backend dependencies
│   ├── controllers/
│   │   ├── authController.js    # Register, login, logout, getMe
│   │   ├── gigController.js     # CRUD operations for gigs
│   │   └── bidController.js     # Create bid, hire freelancer, get bids
│   ├── middlewares/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── User.js              # User schema (name, email, password)
│   │   ├── Gig.js               # Gig schema (title, description, budget, status)
│   │   └── Bid.js               # Bid schema (gigId, freelancerId, price, status)
│   ├── routes/
│   │   ├── authRoutes.js        # /api/auth routes
│   │   ├── gigRoutes.js         # /api/gigs routes
│   │   └── bidRoutes.js         # /api/bids routes
│   ├── socket/
│   │   └── index.js             # Socket.io event handlers
│   └── utils/
│       └── jwt.js               # JWT token generation
├── Frontend/
│   ├── index.html               # HTML entry point
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── postcss.config.js        # PostCSS configuration
│   ├── src/
│   │   ├── main.jsx             # React app entry point
│   │   ├── App.jsx              # Root component with routing
│   │   ├── index.css            # Global styles & Tailwind imports
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Sticky navigation with mobile menu
│   │   │   ├── HeroSection.jsx  # Landing page hero section
│   │   │   ├── Footer.jsx       # Application footer
│   │   │   └── ProtectedRoute.jsx  # Route protection wrapper
│   │   ├── pages/
│   │   │   ├── Register.jsx     # User registration page
│   │   │   ├── Login.jsx        # User login page
│   │   │   ├── GigFeed.jsx      # Browse & search gigs
│   │   │   ├── GigDetail.jsx    # View gig details & submit bid
│   │   │   ├── PostGig.jsx      # Create new gig
│   │   │   ├── MyGigs.jsx       # User's posted gigs dashboard
│   │   │   └── MyBids.jsx       # User's submitted bids dashboard
│   │   ├── store/
│   │   │   ├── store.js         # Redux store configuration
│   │   │   ├── authSlice.js     # Auth state & actions
│   │   │   ├── gigSlice.js      # Gig state & async thunks
│   │   │   └── bidSlice.js      # Bid state & async thunks
│   │   └── utils/
│   │       ├── api.js           # Axios instance with interceptors
│   │       └── socket.js        # Socket.io client setup
│   └── public/                  # Static assets
└── README.md                    # This file
```

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (v5 or higher) - Local or cloud instance (MongoDB Atlas)
- **npm** or **yarn**

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Rohit-9321/GigFlow-freelancer.git
cd gigflow
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:

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
cd Frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000


## 🔑 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user (sets JWT in HttpOnly cookie)
- `POST /logout` - Logout user (clears cookie)
- `GET /me` - Get current authenticated user

### Gigs (`/api/gigs`)
- `GET /` - Get all gigs (query param: `?search=keyword`)
- `GET /:id` - Get single gig by ID with populated owner details
- `POST /` - Create new gig (protected)

### Bids (`/api/bids`)
- `POST /` - Create new bid on a gig (protected, prevents duplicate bids)
- `GET /mine` - Get all bids submitted by current user (protected)
- `GET /:gigId` - Get all bids for a specific gig (owner only, protected)
- `PATCH /:bidId/hire` - Hire freelancer (atomic transaction, protected)

## 🔒 Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Authentication**: Stored in HttpOnly cookies (not localStorage)
- **CORS Protection**: Configured for specific origin with credentials
- **Route Protection**: Authentication middleware on sensitive routes
- **Input Validation**: Express-validator on all endpoints
- **MongoDB Injection Protection**: Mongoose sanitization
- **Unique Constraints**: Prevent duplicate emails and duplicate bids
- **Proxy Trust**: Configured for deployment behind reverse proxies

## 🌐 Real-time Features

### Socket.io Events
- **Connection**: User connects with their userId
- **Notifications**: Real-time notification when hired (`bid-hired` event)
- **Auto-disconnect**: Cleanup on user logout

### Implementation
```javascript
// Backend emits
socket.to(userId).emit('bid-hired', { gigId, gigTitle, bidId })

// Frontend listens
socket.on('bid-hired', (data) => { /* show toast notification */ })
```

## ⚡ Key Features Explained

### 1. Atomic Hiring with MongoDB Transactions

Prevents race conditions when multiple users try to hire simultaneously:

```javascript
// Uses MongoDB session with transaction
1. Start session and transaction
2. Check if gig is still "open"
3. Update gig status to "assigned"
4. Update bid status to "hired"
5. Commit transaction
6. Send real-time notification
```

### 2. Responsive Design

- **Mobile-first**: Tailwind CSS responsive utilities (`sm:`, `lg:` breakpoints)
- **Flexible layouts**: Grid and flexbox for adaptive content
- **Viewport meta tag**: Proper scaling on mobile devices
- **Mobile menu**: Hamburger navigation for small screens

**Built with  using React, Node.js, MongoDB, and Socket.io**
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



