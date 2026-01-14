import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import { store } from '../store/store';
import { addGig, updateGigStatus } from '../store/gigSlice';

let socket = null;

// Get Socket URL from environment (remove /api suffix if present)
const getSocketURL = () => {
  const envURL = import.meta.env.VITE_API_URL;
  if (envURL) {
    // Remove /api suffix for socket connection
    return envURL.replace(/\/api$/, '');
  }
  return 'http://localhost:5000';
};

// Socket authentication now relies on HttpOnly cookie; no token is passed from client
export const connectSocket = () => {
  if (socket) {
    console.log('Socket already connected:', socket.id);
    return socket;
  }

  const socketURL = getSocketURL();
  
  console.log('Connecting to socket server:', socketURL);
  
  socket = io(socketURL, {
    withCredentials: true,
    transports: ['websocket', 'polling']
  });

  socket.on('connect', () => {
    console.log('✅ Socket connected successfully:', socket.id);
  });

  socket.on('connect_error', (error) => {
    console.error('❌ Socket connection error:', error.message);
  });

  socket.on('hired_notification', (data) => {
    console.log('Received hire notification:', data);
    toast.success(data.message, {
      duration: 5000,
      position: 'top-right'
    });
    // Update gig status to "assigned" in Redux
    if (data.gigId) {
      store.dispatch(updateGigStatus({ gigId: data.gigId, status: 'assigned' }));
    }
  });

  socket.on('new_bid', (data) => {
    console.log('Received new bid notification:', data);
    toast.success(data.message, {
      duration: 4000,
      position: 'top-right'
    });
  });

  socket.on('gig_updated', (data) => {
    console.log('Received gig update notification:', data);
    if (data.message) {
      toast.info(data.message, {
        duration: 4000,
        position: 'top-right'
      });
    }
    // Update gig status to "assigned" in Redux when notified of other assignments
    if (data.gigId) {
      store.dispatch(updateGigStatus({ gigId: data.gigId, status: 'assigned' }));
    }
  });

  socket.on('gig_created', (gig) => {
    console.log('Received new gig via socket:', gig);
    try {
      store.dispatch(addGig(gig));
    } catch (err) {
      console.error('Error dispatching addGig from socket:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
