import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Assuming this is for react-hot-toast or similar
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ChatInterfacePage from "./pages/ChatInterfacePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

// A simple mock for auth status - replace with actual auth context/logic
const isAuthenticated = () => {
  // For demonstration, assume login sets a simple flag or token
  // In a real app, check for a valid token in localStorage or context
  // This is a placeholder, actual login logic is in LoginPage.
  // For routing, we might need a more robust check here or a protected route component.
  // For now, LoginPage will handle redirection upon successful login.
  return !!localStorage.getItem('mockAuthToken'); // Example: after login, set this token
};

// Placeholder: Update LoginPage to set 'mockAuthToken' on successful login
// e.g., localStorage.setItem('mockAuthToken', 'true'); navigate('/chat');

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to so we can send them along after they login.
    return <Navigate to="/login" replace />;
  }
  return children;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/chat" 
            element={
              <ProtectedRoute>
                <ChatInterfacePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } 
          />

          {/* Default route: redirect to login if not authenticated, else to chat */}
          <Route 
            path="/" 
            element={isAuthenticated() ? <Navigate to="/chat" replace /> : <Navigate to="/login" replace />} 
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;