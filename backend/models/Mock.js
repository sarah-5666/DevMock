const mongoose = require('mongoose')

const mockSchema = new mongoose.Schema(
    {
        // User who owns this mock endpoint
        userId: {
            type: String,
            required: true
        },

        // Endpoint path used by the mock URL
        endpointPath: {
            type: String,
            required: true
        },

        // HTTP method
        method: {
            type: String,
            required: true,
            uppercase: true
        },

        // Kept for compatibility with the existing dashboard
        path: {
            type: String,
            required: true
        },

        // HTTP status code
        statusCode: {
            type: Number,
            required: true,
            default: 200
        },

        // JSON response stored in MongoDB
        jsonPayload: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },

        // Kept for compatibility with the existing dashboard
        responseBody: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Mock', mockSchema)