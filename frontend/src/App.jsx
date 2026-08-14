import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [mocks, setMocks] = useState([])

    const [userId, setUserId] = useState('101')
    const [method, setMethod] = useState('GET')
    const [path, setPath] = useState('')
    const [statusCode, setStatusCode] = useState(200)
    const [responseBody, setResponseBody] = useState('')

    const [editingId, setEditingId] = useState(null)

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const fetchMocks = async () => {
        try {
            const response = await fetch(
                'http://localhost:5000/api/mocks'
            )

            const data = await response.json()

            if (data.success) {
                setMocks(data.mocks)
            }
        } catch (error) {
            console.error(error)
            setErrorMessage('Unable to load mock APIs.')
        }
    }

    useEffect(() => {
        fetchMocks()
    }, [])

    const validateForm = () => {
        setErrorMessage('')
        setSuccessMessage('')

        if (!userId.trim()) {
            setErrorMessage('Please enter a User ID.')
            return false
        }

        if (!path.trim()) {
            setErrorMessage('Please enter an API path.')
            return false
        }

        if (!path.startsWith('/')) {
            setErrorMessage(
                'API path must start with /. Example: /users'
            )
            return false
        }

        const code = Number(statusCode)

        if (!Number.isInteger(code) || code < 100 || code > 599) {
            setErrorMessage(
                'Status code must be between 100 and 599.'
            )
            return false
        }

        if (!responseBody.trim()) {
            setErrorMessage('Please enter a response body.')
            return false
        }

        try {
            JSON.parse(responseBody)
        } catch {
            setErrorMessage(
                'Response Body must contain valid JSON.'
            )
            return false
        }

        return true
    }

    const createMock = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        const parsedResponse = JSON.parse(responseBody)

        try {
            const response = await fetch(
                'http://localhost:5000/api/mocks',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: userId.trim(),
                        endpointPath: path.trim(),
                        method,
                        path: path.trim(),
                        statusCode: Number(statusCode),
                        jsonPayload: parsedResponse,
                        responseBody: parsedResponse
                    })
                }
            )

            const data = await response.json()

            if (data.success) {
                setSuccessMessage(
                    'Mock API created successfully!'
                )

                clearForm()
                fetchMocks()
            } else {
                setErrorMessage(
                    data.message || 'Failed to create mock API.'
                )
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(
                'Could not connect to the backend.'
            )
        }
    }

    const deleteMock = async (id) => {
        setErrorMessage('')
        setSuccessMessage('')

        try {
            const response = await fetch(
                `http://localhost:5000/api/mocks/${id}`,
                {
                    method: 'DELETE'
                }
            )

            const data = await response.json()

            if (data.success) {
                setSuccessMessage(
                    'Mock API deleted successfully!'
                )

                fetchMocks()
            } else {
                setErrorMessage(
                    data.message || 'Failed to delete mock API.'
                )
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(
                'Could not connect to the backend.'
            )
        }
    }

    const testMock = async (mock) => {
        setErrorMessage('')
        setSuccessMessage('')

        try {
            const mockUserId = mock.userId || '101'
            const mockPath =
                mock.endpointPath || mock.path

            const response = await fetch(
                `http://localhost:5000/mock/${mockUserId}${mockPath}`,
                {
                    method: mock.method
                }
            )

            const data = await response.json()

            alert(JSON.stringify(data, null, 2))
        } catch (error) {
            console.error(error)
            setErrorMessage(
                'Failed to test mock API.'
            )
        }
    }

    const startEdit = (mock) => {
        setEditingId(mock._id)

        setUserId(mock.userId || '101')
        setMethod(mock.method)
        setPath(
            mock.endpointPath || mock.path
        )
        setStatusCode(mock.statusCode)

        setResponseBody(
            JSON.stringify(
                mock.jsonPayload || mock.responseBody,
                null,
                2
            )
        )

        setErrorMessage('')
        setSuccessMessage('')

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const updateMock = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        const parsedResponse = JSON.parse(responseBody)

        try {
            const response = await fetch(
                `http://localhost:5000/api/mocks/${editingId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: userId.trim(),
                        endpointPath: path.trim(),
                        method,
                        path: path.trim(),
                        statusCode: Number(statusCode),
                        jsonPayload: parsedResponse,
                        responseBody: parsedResponse
                    })
                }
            )

            const data = await response.json()

            if (data.success) {
                setSuccessMessage(
                    'Mock API updated successfully!'
                )

                clearForm()
                fetchMocks()
            } else {
                setErrorMessage(
                    data.message || 'Failed to update mock API.'
                )
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(
                'Could not connect to the backend.'
            )
        }
    }

    const clearForm = () => {
        setEditingId(null)
        setUserId('101')
        setMethod('GET')
        setPath('')
        setStatusCode(200)
        setResponseBody('')
    }

    return (
        <div className="app">

            <div className="header">
                <h1>DevMock</h1>

                <p>
                    Create, manage and test mock APIs
                </p>
            </div>

            <div className="form-card">

                <h2>
                    {editingId
                        ? 'Edit Mock API'
                        : 'Create Mock API'}
                </h2>

                <form
                    onSubmit={
                        editingId
                            ? updateMock
                            : createMock
                    }
                >

                    <div className="form-group">
                        <label>User ID</label>

                        <input
                            type="text"
                            placeholder="101"
                            value={userId}
                            onChange={(e) =>
                                setUserId(e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Method</label>

                        <select
                            value={method}
                            onChange={(e) =>
                                setMethod(e.target.value)
                            }
                        >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">
                                DELETE
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Endpoint Path</label>

                        <input
                            type="text"
                            placeholder="/users"
                            value={path}
                            onChange={(e) =>
                                setPath(e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Status Code</label>

                        <input
                            type="number"
                            value={statusCode}
                            onChange={(e) =>
                                setStatusCode(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Response Body</label>

                        <textarea
                            rows="8"
                            placeholder='{"message":"Hello"}'
                            value={responseBody}
                            onChange={(e) =>
                                setResponseBody(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    {errorMessage && (
                        <p className="error-message">
                            {errorMessage}
                        </p>
                    )}

                    {successMessage && (
                        <p className="success-message">
                            {successMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="primary-button"
                    >
                        {editingId
                            ? 'Update Mock'
                            : 'Create Mock'}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={clearForm}
                        >
                            Cancel
                        </button>
                    )}

                </form>
            </div>

            <h2>Mock APIs</h2>

            {mocks.length === 0 ? (
                <p className="empty-message">
                    No mock APIs found.
                </p>
            ) : (
                mocks.map((mock) => {
                    const displayUserId =
                        mock.userId || '101'

                    const displayPath =
                        mock.endpointPath || mock.path

                    const liveUrl =
                        `http://localhost:5000/mock/${displayUserId}${displayPath}`

                    const displayResponse =
                        mock.jsonPayload ||
                        mock.responseBody

                    return (
                        <div
                            className="mock-card"
                            key={mock._id}
                        >

                            <div className="mock-header">

                                <div>
                                    <span className="method">
                                        {mock.method}
                                    </span>

                                    <span className="path">
                                        {displayPath}
                                    </span>
                                </div>

                                <span className="status">
                                    Status: {mock.statusCode}
                                </span>

                            </div>

                            <p>
                                <strong>
                                    User ID:
                                </strong>{' '}
                                {displayUserId}
                            </p>

                            <p>
                                <strong>
                                    Live Mock URL:
                                </strong>{' '}
                                <code>
                                    {liveUrl}
                                </code>
                            </p>

                            <pre className="response">
                                {JSON.stringify(
                                    displayResponse,
                                    null,
                                    2
                                )}
                            </pre>

                            <div className="button-group">

                                <button
                                    type="button"
                                    className="test-button"
                                    onClick={() =>
                                        testMock(mock)
                                    }
                                >
                                    Test API
                                </button>

                                <button
                                    type="button"
                                    className="edit-button"
                                    onClick={() =>
                                        startEdit(mock)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() =>
                                        deleteMock(mock._id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    )
                })
            )}

        </div>
    )
}

export default App
