import React, { useState, useEffect } from 'react';
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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { User, Palette, ShieldAlert, DownloadCloud, Trash2 } from 'lucide-react';

const SettingsPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    console.log('SettingsPage loaded');
    // Load existing settings, e.g., from localStorage or API
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!"); // Replace with proper notification
      return;
    }
    if (newPassword.length < 8) {
      alert("New password must be at least 8 characters long.");
      return;
    }
    console.log('Changing password...');
    // API call to change password
    alert('Password change submitted (simulation).');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    console.log('Theme toggled to:', checked ? 'Dark' : 'Light');
  };
  
  const handleExportData = () => {
    console.log('Exporting user data...');
    alert('Data export initiated (simulation).');
    // Logic to export chat data
  };

  const handleDeleteAccount = () => {
    console.log('Deleting account...');
    alert('Account deletion confirmed (simulation).');
    // Logic to delete account and log out user
    // navigate('/login');
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
          <TabsTrigger value="account"><User className="mr-2 h-4 w-4 inline-block" />Account</TabsTrigger>
          <TabsTrigger value="preferences"><Palette className="mr-2 h-4 w-4 inline-block" />Preferences</TabsTrigger>
          <TabsTrigger value="data"><DownloadCloud className="mr-2 h-4 w-4 inline-block" />Data Management</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Manage your account details and security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <h3 className="text-lg font-semibold">Change Password</h3>
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                  <Input id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} required />
                </div>
                <Button type="submit">Update Password</Button>
              </form>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Danger Zone</h3>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle><ShieldAlert className="mr-2 h-5 w-5 inline-block text-red-500" />Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600">
                        Yes, delete account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Permanently delete your account and all associated data.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Application Preferences</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkMode" className="text-base">Dark Mode</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark themes.</p>
                </div>
                <Switch
                  id="darkMode"
                  checked={isDarkMode}
                  onCheckedChange={handleThemeToggle}
                  aria-label="Toggle dark mode"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications" className="text-base">Enable Notifications</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications for new messages or updates.</p>
                </div>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                  aria-label="Toggle notifications"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Manage your personal data within the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Button onClick={handleExportData}>
                  <DownloadCloud className="mr-2 h-4 w-4" /> Export All Chat Data
                </Button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Download a copy of all your conversations.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;