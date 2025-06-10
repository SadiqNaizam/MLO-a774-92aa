import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

// Default credentials for testing:
// Email: user@example.com
// Password: password123

const LoginPage = () => {
  const [email, setEmail] = useState('user@example.com'); // Default for testing
  const [password, setPassword] = useState('password123'); // Default for testing
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('LoginPage loaded');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('Login attempt with:', { email, password });

    // Basic validation (replace with actual auth logic)
    if (email === 'user@example.com' && password === 'password123') {
      console.log('Login successful');
      // Store auth state (e.g., in context or local storage)
      navigate('/chat'); // Navigate to chat interface on successful login
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome Back!</CardTitle>
          <CardDescription className="text-center">
            Sign in to continue to your AI chat assistant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/register')}>
              Register here
            </Button>
          </p>
          <Button variant="link" size="sm" className="text-xs text-gray-500 dark:text-gray-400">
            Forgot password?
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;