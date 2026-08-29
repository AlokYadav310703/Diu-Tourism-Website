import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Routes"; // Importing the router from routes.js
import { AuthProvider } from "./context/AuthContext";
import ChatWidget from "./components/ChatWidget/ChatWidget";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ChatWidget />
    </AuthProvider>
  );
}

export default App;
