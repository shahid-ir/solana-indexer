"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
exports.databaseConfig = {
    uri: process.env.MONGODB_URI,
    connectionFactory: (connection) => {
        connection.on('connected', () => {
            console.log('✅ MongoDB connected successfully');
            console.log('📊 Database:', connection.name);
            console.log('🔗 URI:', connection.host + ':' + connection.port);
        });
        connection.on('error', (error) => {
            console.error('❌ MongoDB connection error:', error);
        });
        connection.on('disconnected', () => {
            console.log('⚠️ MongoDB disconnected');
        });
        return connection;
    },
};
//# sourceMappingURL=database.config.js.map