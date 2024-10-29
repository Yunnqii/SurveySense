import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SurveyDesigner from "./components/SurveyDesigner";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <Navbar />
        <SignIn />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <SurveyDesigner />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
