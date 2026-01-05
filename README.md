# Auth API

A simple authentication API built with Node.js, Express, and MongoDB. Provides user registration and login functionality with JWT-based authentication.

## Features

- User signup with email and password
- User signin with JWT token generation
- Password hashing using bcrypt
- Input validation using Zod
- MongoDB for data storage

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcrypt for password hashing
- **Validation**: Zod

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd authAPI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   
   Create a `.env` file in the root directory and add the following:
   ```
   JWT_SECRET=your_secret_key_here
   MONGO_URL=your_mongo_url_for_connection
   PORT=****
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

   The server will start on the specified PORT (default: 3000).

## API Endpoints

### POST /signup
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "You are signed up"
}
```

### POST /signin
Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "jwt_token_here"
}
```

## Validation Rules

- **Signup**:
  - Name: 3-100 characters
  - Email: Valid email format, max 100 characters
  - Password: 8-20 characters

- **Signin**:
  - Email: Valid email format
  - Password: Minimum 8 characters

## Error Handling

- 403: Invalid input or user already exists
- 500: Internal server error
- 401: Invalid token (for protected routes, if implemented)

## Upcoming updates
- Refreshing tokens
- Token blacklisting and logout support
- Forgot or reset password
- Rate limiting

## License

ISC