const http = require('http');
const app = require('./app');  // Import the express app
const logger = require('./utils/logger'); // Import the logger
const getAvailablePort = (startPort) => {
    return new Promise((resolve, reject) => {
        const server = http.createServer();
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(getAvailablePort(startPort + 1));
            } else {
                reject(err);
            }
        });
        server.listen(startPort, () => {
            server.close(() => resolve(startPort));
        });
    });
};

const startServer = async () => {
    const basePort = process.env.PORT || 4000;
    try {
        const port = await getAvailablePort(basePort);
        const server = http.createServer(app);
        
        // Handle unexpected errors globally
        server.on('error', (err) => {
            logger.error('Server error:', err); // Use logger for server errors
            process.exit(1);
        });

        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        return server;
    } catch (err) {
        logger.error('Failed to start server:', err); // Use logger for server start errors
        process.exit(1);
    }
};

// Start the server and handle global errors
startServer();

// Handle unhandled promise rejections globally
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason); // Use logger for unhandled rejections
    // Gracefully exit the process after unhandled rejections
    process.exit(1);
});

// Handle uncaught exceptions globally
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err); // Use logger for uncaught exceptions
    // Exit the process with failure code after an uncaught exception
    process.exit(1);
});
