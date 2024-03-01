# Chat App using MERN Stack and Socket.IO

This is a real-time chat application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack along with Socket.IO for real-time communication. The application provides features for authentication and authorization, notification sound, real-time chat, and storing chat messages.

## Features

- **Authentication and Authorization:** Users can sign up, log in, and log out securely. Protected routes ensure that only authenticated users can access certain parts of the application.

- **Real-time Chat:** Users can send and receive messages in real-time with other users who are online. Messages are instantly delivered to all participants in the chat room.

- **Notification Sound:** Users receive an audible notification sound when a new message is received. This feature enhances the user experience by providing instant feedback on new messages.

- **Store Chat Messages:** Chat messages are stored in the database, allowing users to view previous conversations and access chat history.

## Technologies Used

- **Frontend:** React.js, Socket.IO Client, HTML, CSS, JavaScript ,TailwindCSS , Zustand 
- **Backend:** Node.js, Express.js, MongoDB, Socket.IO
- **Authentication:** JSON Web Tokens (JWT), bcrypt for password hashing
- **Notification Sound:** HTML5 Audio 
- **Database:** MongoDB Atlas (Cloud-hosted MongoDB database)
- **Deployment:** Render (for backend), Vercel (for frontend)

## How to Run

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies:**
   - Navigate to the project directory and install backend dependencies:
     ```bash
     cd chat-app
     npm install
     ```
   - Install frontend dependencies:
     ```bash
     cd client
     npm install
     ```

3. **Set Environment Variables:**
   - Create a `.env` file in the root directory and add the required environment variables such as MongoDB URI, JWT secret, etc.

4. **Run the Application:**
   - Start the backend server:
     ```bash
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd client
     npm start
     ```
![4](https://github.com/Kumarsatwik/ChatApp/assets/38569860/0c67800a-068f-4428-9f65-6a0e029b13b1)

5. **Access the Application:**
   Access the chat application in your web browser at `http://localhost:5173`.![3](https://github.com/Kumarsatwik/ChatApp/assets/38569860/91d4a84c-9946-443a-a7fe-933b69df4a38)

   Server Access  at `http://localhost:5000`.

## Screenshots

![1](https://github.com/Kumarsatwik/ChatApp/assets/38569860/740f3f95-2d45-48ef-9ac9-eb84eb47c2e8)
![2](https://github.com/Kumarsatwik/ChatApp/assets/38569860/288a5b1b-540c-4c7d-aa3f-e5df87df3f06)
![3](https://github.com/Kumarsatwik/ChatApp/assets/38569860/595b9b15-ef8c-4e2d-8e35-95575e1645bb)
![4](https://github.com/Kumarsatwik/ChatApp/assets/38569860/d6acc82e-c284-4ec4-a641-18c461b4278d)

## Demo Video
- https://youtu.be/t1NZgNBh188
