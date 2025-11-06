/// <reference types="vite/client" />

interface User {
  id: number;
  username: string;
  email: string;
  password: string; // In real app, never store plain text passwords
  role: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  lastLogin: string;
}

/*export const users: User[] = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    password: "Test@123", // In real app, never store plain text passwords
    role: "user",
    firstName: "John",
    lastName: "Doe",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    lastLogin: "2023-11-06T10:30:00Z"
  },
  {
    id: 2,
    username: "admin",
    email: "admin@example.com", 
    password: "Admin@123",
    role: "admin",
    firstName: "Admin",
    lastName: "User",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    lastLogin: "2023-11-05T15:45:00Z"
  },
  {
    id: 3,
    username: "jane_smith",
    email: "jane@example.com",
    password: "Jane@123",
    role: "user",
    firstName: "Jane",
    lastName: "Smith",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    lastLogin: "2023-11-04T09:15:00Z"
  }
];

// Sample login validation function
export const validateLogin = (email, password) => {
  return users.find(user => 
    user.email === email && user.password === password
  );
};*/
