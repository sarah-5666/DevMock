const express = require('express')
const cors = require('cors')

const connectDB = require('./config/db')
const Mock = require('./models/Mock')

const app = express()
const PORT = 5000

connectDB()

app.use(cors())
app.use(express.json())

// Test route
app.get('/', (req, res) => {
    res.json({
        message: 'DevMock backend is running!'
    })
})

// Frontend connection test
app.post('/api/test', (req, res) => {
    console.log('Data received from frontend:', req.body)

    res.json({
        success: true,
        message: 'Frontend successfully connected to backend!',
        receivedData: req.body
    })
})

// Create a mock API
app.post('/api/mocks', async (req, res) => {
    try {
        const {
            userId,
            endpointPath,
            method,
            path,
            statusCode,
            jsonPayload,
            responseBody
        } = req.body

        const newMock = await Mock.create({
            userId: userId || '101',
            endpointPath: endpointPath || path,
            method,
            path: path || endpointPath,
            statusCode: statusCode || 200,
            jsonPayload: jsonPayload || responseBody,
            responseBody: responseBody || jsonPayload
        })

        res.status(201).json({
            success: true,
            message: 'Mock API created successfully!',
            mock: newMock
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create mock API',
            error: error.message
        })
    }
})

// Get all mock APIs
app.get('/api/mocks', async (req, res) => {
    try {
        const mocks = await Mock.find().sort({ createdAt: -1 })

        res.json({
            success: true,
            count: mocks.length,
            mocks
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch mock APIs',
            error: error.message
        })
    }
})

// Delete a mock API
app.delete('/api/mocks/:id', async (req, res) => {
    try {
        const deletedMock = await Mock.findByIdAndDelete(req.params.id)

        if (!deletedMock) {
            return res.status(404).json({
                success: false,
                message: 'Mock API not found'
            })
        }

        res.json({
            success: true,
            message: 'Mock API deleted successfully!',
            mock: deletedMock
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete mock API',
            error: error.message
        })
    }
})

// Update a mock API
app.put('/api/mocks/:id', async (req, res) => {
    try {
        const {
            userId,
            endpointPath,
            method,
            path,
            statusCode,
            jsonPayload,
            responseBody
        } = req.body

        const updatedMock = await Mock.findByIdAndUpdate(
            req.params.id,
            {
                userId: userId || '101',
                endpointPath: endpointPath || path,
                method,
                path: path || endpointPath,
                statusCode: statusCode || 200,
                jsonPayload: jsonPayload || responseBody,
                responseBody: responseBody || jsonPayload
            },
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedMock) {
            return res.status(404).json({
                success: false,
                message: 'Mock API not found'
            })
        }

        res.json({
            success: true,
            message: 'Mock API updated successfully!',
            mock: updatedMock
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update mock API',
            error: error.message
        })
    }
})

// =====================================================
// INTERNSHIP CORE FEATURE
// Dynamic mock API route
//
// Example:
// GET /mock/101/products
//
// userId = 101
// endpointPath = /products
// =====================================================

app.get('/mock/:userId/*splat', async (req, res) => {
    try {
        const userId = req.params.userId
        const endpointPath = '/' + req.params.splat

        const mock = await Mock.findOne({
            userId: userId,
            endpointPath: endpointPath,
            method: 'GET'
        })

        if (!mock) {
            return res.status(404).json({
                success: false,
                message: 'Mock API not found'
            })
        }

        res.status(mock.statusCode).json(
            mock.jsonPayload
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to execute mock API',
            error: error.message
        })
    }
})

// Start server
app.listen(PORT, () => {
    console.log(
        `DevMock backend running on http://localhost:${PORT}`
    )
})