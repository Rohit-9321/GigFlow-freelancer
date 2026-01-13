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

### 3. Live Search with Debouncing

- **Debounced input**: 300ms delay to reduce API calls
- **Real-time results**: Updates as user types
- **MongoDB text search**: Case-insensitive search on gig titles

### 4. State Management

- **Redux Toolkit**: Centralized state with slices
- **Async Thunks**: Handle API calls with loading/error states
- **Persistent Auth**: Check authentication on app load

## 📱 Mobile & Web Support

This application is **fully responsive** and optimized for:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

**Key responsive features:**
- Viewport meta tag for proper scaling
- Tailwind CSS responsive breakpoints
- Mobile-friendly navigation menu
- Touch-optimized buttons and forms
- Flexible grid layouts

## 🚀 Deployment

### Backend Deployment (e.g., Heroku, Railway, Render)

1. Set environment variables:
   - `MONGO_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Strong secret key
   - `CLIENT_URL` - Your frontend URL
   - `NODE_ENV=production`

2. The backend is configured for proxy (`app.set('trust proxy', 1)`)

### Frontend Deployment (e.g., Vercel, Netlify)

1. Build the project:
   ```bash
   npm run build
   ```

2. Update API URL in `Frontend/src/utils/api.js` to point to your deployed backend

3. Deploy the `dist` folder

## 🛠️ Development Tips

### Running Both Servers

Use two terminal windows:
```bash
# Terminal 1 - Backend
cd Backend
npm run dev

# Terminal 2 - Frontend
cd Frontend
npm run dev
```

### Database Management

View your MongoDB data:
```bash
mongosh
use gigflow
db.users.find()
db.gigs.find()
db.bids.find()
```

### Testing Real-time Notifications

1. Open app in two browser windows (different users)
2. User A posts a gig
3. User B submits a bid
4. User A hires User B
5. User B receives instant notification 🔔

## 📝 Future Enhancements

- [ ] File upload for gig attachments
- [ ] User profiles with ratings and reviews
- [ ] Message system between users
- [ ] Payment integration
- [ ] Advanced filtering (category, budget range, date)
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Gig categories/tags

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Your Name - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- React & Redux documentation
- Tailwind CSS for utility classes
- Socket.io for real-time features
- MongoDB for flexible data modeling

---

**Built with ❤️ using React, Node.js, MongoDB, and Socket.io**
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


