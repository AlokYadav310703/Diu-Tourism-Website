import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import hotel from './routes/hotel.js';
import restaurant from './routes/restaurant.js';
import transport from './routes/transport.js';
import feedback from './routes/feedback.js';
import adminActivity from './routes/admin_activity.js';
import eventPlan from './routes/eventPlanner.js';
import profile from './routes/profile.js';
import chatbot from './routes/chatbot.js';
import tripReminders from './routes/tripReminders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --------------------------------------------------
// CORS
// --------------------------------------------------

const allowedOrigins = [
  'https://diutourism.vercel.app',
  'https://diutourism-5vl15ugri-thanos15.vercel.app',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Incoming origin:', JSON.stringify(origin));

    // Allow requests without an Origin header
    // such as server-to-server requests.
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log('Blocked origin:', JSON.stringify(origin));

    // Don't throw an error for CORS.
    // Simply don't allow the origin.
    return callback(null, false);
  },

  credentials: true,

  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS'
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With'
  ],

  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(express.json());

// --------------------------------------------------
// Health Check
// --------------------------------------------------

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Diu Tourism API'
  });
});

// --------------------------------------------------
// Routes
// --------------------------------------------------

app.use('/hotel', hotel);
app.use('/restaurant', restaurant);
app.use('/transport', transport);
app.use('/msg', feedback);
app.use('/admin_activity', adminActivity);
app.use('/eventplan', eventPlan);
app.use('/profile', profile);
app.use('/chatbot', chatbot);
app.use('/trip-reminders', tripReminders);

// --------------------------------------------------
// Error Handler
// --------------------------------------------------

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);

  res.status(500).json({
    error: 'Internal server error'
  });
});

// --------------------------------------------------
// Start Server
// --------------------------------------------------

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// --------------------------------------------------
// Server Timeouts
// --------------------------------------------------

server.timeout = 180000;
server.keepAliveTimeout = 180000;
server.headersTimeout = 185000;




// // // import express from 'express';
// // // import cors from 'cors';
// // // import dotenv from 'dotenv';
// // // import hotel from './routes/hotel.js';
// // // import restaurant from './routes/restaurant.js';
// // // import transport from './routes/transport.js';
// // // import feedback from './routes/feedback.js';
// // // import adminActivity from './routes/admin_activity.js';
// // // import eventPlan from './routes/eventPlanner.js';
// // // import profile from './routes/profile.js';
// // // import chatbot from './routes/chatbot.js';
// // // import tripReminders from './routes/tripReminders.js';

// // // dotenv.config();

// // // const app = express();
// // // const PORT = process.env.PORT || 5000;

// // // app.use(cors({
// // //   origin: process.env.CORS_ORIGIN || '*',
// // //   credentials: true
// // // }));
// // // app.use(express.json());

// // // app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// // // // Paths preserved from the original app wherever the resource itself
// // // // didn't change (see README.md for the full old-path -> new-path map).
// // // app.use('/hotel', hotel);
// // // app.use('/restaurant', restaurant);
// // // app.use('/transport', transport);
// // // app.use('/msg', feedback);
// // // app.use('/admin_activity', adminActivity);
// // // app.use('/eventplan', eventPlan);
// // // app.use('/profile', profile);          // new — replaces /login/session, /login/update
// // // app.use('/chatbot', chatbot);          // new — RAG chatbot
// // // app.use('/trip-reminders', tripReminders); // replaces /sendQueryEmail

// // // // Removed: /login, /signup, /adminLogin, /session, /logout, /admin
// // // // (Auth now runs entirely through Supabase Auth on the frontend —
// // // // see client/src/services/supabaseClient.js and AuthContext.jsx.)

// // // app.use((err, req, res, next) => {
// // //   console.error('Unhandled error:', err);
// // //   res.status(500).json({ error: 'Internal server error' });
// // // });

// // // app.listen(PORT, () => {
// // //   console.log(`Server running on port ${PORT}`);
// // // });

// // import express from 'express'; 
// // import cors from 'cors'; 
// // import dotenv from 'dotenv'; 
// // import hotel from './routes/hotel.js'; 
// // import restaurant from './routes/restaurant.js'; 
// // import transport from './routes/transport.js'; 
// // import feedback from './routes/feedback.js'; 
// // import adminActivity from './routes/admin_activity.js'; 
// // import eventPlan from './routes/eventPlanner.js'; 
// // import profile from './routes/profile.js'; 
// // import chatbot from './routes/chatbot.js'; 
// // import tripReminders from './routes/tripReminders.js'; 
 
// // dotenv.config(); 
 
// // const app = express(); 
// // const PORT = process.env.PORT || 5000; 
 
// // app.use(cors({ 
// //   origin: process.env.CORS_ORIGIN || '*', 
// //   credentials: true 
// // })); 

// // app.use(express.json()); 
 
// // app.get('/api/health', (req, res) => res.json({ status: 'ok' })); 
 
// // // Paths preserved from the original app wherever the resource itself 
// // // didn't change (see README.md for the full old-path -> new-path map). 
// // app.use('/hotel', hotel); 
// // app.use('/restaurant', restaurant); 
// // app.use('/transport', transport); 
// // app.use('/msg', feedback); 
// // app.use('/admin_activity', adminActivity); 
// // app.use('/eventplan', eventPlan); 
// // app.use('/profile', profile);          
// // app.use('/chatbot', chatbot);          
// // app.use('/trip-reminders', tripReminders); 
 
// // // Removed: /login, /signup, /adminLogin, /session, /logout, /admin 
// // // (Auth now runs entirely through Supabase Auth on the frontend — 
// // // see client/src/services/supabaseClient.js and AuthContext.jsx.) 
 
// // app.use((err, req, res, next) => { 
// //   console.error('Unhandled error:', err); 
// //   res.status(500).json({ error: 'Internal server error' }); 
// // }); 
 
// // // Start server
// // const server = app.listen(PORT, () => { 
// //   console.log(`Server running on port ${PORT}`); 
// // }); 

// // // Allow requests to run for up to 180000 ms (3 minutes)
// // server.timeout = 180000;

// // // Keep connections alive for up to 180000 ms
// // server.keepAliveTimeout = 180000;

// // // Headers timeout should be slightly higher than keep-alive timeout
// // server.headersTimeout = 185000;

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';

// import hotel from './routes/hotel.js';
// import restaurant from './routes/restaurant.js';
// import transport from './routes/transport.js';
// import feedback from './routes/feedback.js';
// import adminActivity from './routes/admin_activity.js';
// import eventPlan from './routes/eventPlanner.js';
// import profile from './routes/profile.js';
// import chatbot from './routes/chatbot.js';
// import tripReminders from './routes/tripReminders.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// const allowedOrigins = (process.env.CORS_ORIGINS || '')
//   .split(',')
//   .map(origin => origin.trim())
//   .filter(Boolean);

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) {
//       return callback(null, true);
//     }

//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }

//     return callback(new Error(`CORS blocked origin: ${origin}`));
//   },
//   credentials: true
// }));

// app.use(express.json());

// app.get('/api/health', (req, res) => {
//   res.json({ status: 'ok' });
// });

// app.use('/hotel', hotel);
// app.use('/restaurant', restaurant);
// app.use('/transport', transport);
// app.use('/msg', feedback);
// app.use('/admin_activity', adminActivity);
// app.use('/eventplan', eventPlan);
// app.use('/profile', profile);
// app.use('/chatbot', chatbot);
// app.use('/trip-reminders', tripReminders);

// app.use((err, req, res, next) => {
//   console.error('Unhandled error:', err);
//   res.status(500).json({ error: 'Internal server error' });
// });

// const server = app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// server.timeout = 180000;
// server.keepAliveTimeout = 180000;
// server.headersTimeout = 185000;
