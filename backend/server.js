const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');

// Handling uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
dotenv.config({ path: 'backend/config/config.env' });

//Connecting Database
connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

// Local development: bind a port and run a long-lived server.
// On Vercel (serverless) `process.env.VERCEL` is set — there we DON'T listen;
// Vercel invokes the exported `app` as the request handler instead.
if (!process.env.VERCEL) {
  const server = app.listen(process.env.PORT || 4000, () => {
    console.log(
      `Server is Working on Port http://localhost:${process.env.PORT || 4000} `
    );
  });

  // unhandled Promise Rejection
  process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(() => {
      process.exit(1);
    });
  });
}

// Export the Express app so Vercel's @vercel/node can use it as the handler.
module.exports = app;
