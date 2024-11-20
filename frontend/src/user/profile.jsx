import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  TextField,
  Avatar,
  Paper,
  Divider,
} from "@mui/material";
import { UserContext } from "../component/GeneralContext";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "https://wonderlust-backend.onrender.com/api/auth/password",
        changePassword,
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Password changed successfully");
        setChangePassword({ oldPassword: "", newPassword: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://wonderlust-backend.onrender.com/api/auth/logout",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUser(null);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-blue-50 to-white">
      {/* Sidebar */}
      <Box className="md:w-1/4 bg-white shadow-md p-6">
        <Box className="flex flex-col items-center mb-6">
          <Avatar
            alt={user?.username || "User"}
            sx={{ width: 100, height: 100 }}
            className="mb-4 shadow-lg"
          />
          <Typography variant="h6" className="font-bold">
            {user?.username || "User"}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            {user?.email || "user@example.com"}
          </Typography>
        </Box>

        <Tabs
          orientation="vertical"
          value={activeTab}
          onChange={handleTabChange}
          className="w-full text-gray-600"
        >
          <Tab label="Overview" className="font-semibold" />
          <Tab label="Settings" className="font-semibold" />
          <Tab
            label="Logout"
            className="font-semibold text-red-500"
            onClick={handleLogout}
          />
        </Tabs>
      </Box>

      {/* Main Content */}
      <Box className="flex-1 p-6">
        {activeTab === 0 && <Overview user={user} />}
        {activeTab === 1 && (
          <Settings
            changePassword={changePassword}
            setChangePassword={setChangePassword}
            handlePasswordChange={handlePasswordChange}
          />
        )}
      </Box>
    </Box>
  );
};

// Overview Component
const Overview = ({ user }) => (
  <Paper elevation={3} className="p-6 rounded-lg bg-white shadow-md">
    <Typography variant="h5" className="mb-4 font-bold text-gray-700">
      Profile Overview
    </Typography>
    <Divider className="mb-4" />
    <Box className="space-y-2">
      <Typography>
        <strong>Name:</strong> {user?.username || "John Doe"}
      </Typography>
      <Typography>
        <strong>Email:</strong> {user?.email || "user@example.com"}
      </Typography>
      <Typography>
        <strong>Joined:</strong> {new Date(user?.createdAt).toDateString()}
      </Typography>
    </Box>
  </Paper>
);

// Settings Component
const Settings = ({ changePassword, setChangePassword, handlePasswordChange }) => (
  <Paper elevation={3} className="p-6 rounded-lg bg-white shadow-md">
    <Typography variant="h5" className="mb-4 font-bold text-gray-700">
      Account Settings
    </Typography>
    <Divider className="mb-4" />
    <form className="space-y-4" onSubmit={handlePasswordChange}>
      <TextField
        fullWidth
        label="Enter old password"
        value={changePassword.oldPassword}
        type="password"
        onChange={(e) =>
          setChangePassword({ ...changePassword, oldPassword: e.target.value })
        }
        name="oldPassword"
        variant="outlined"
        className="mb-4"
      />
      <TextField
        fullWidth
        label="Enter new password"
        value={changePassword.newPassword}
        type="password"
        onChange={(e) =>
          setChangePassword({ ...changePassword, newPassword: e.target.value })
        }
        name="newPassword"
        variant="outlined"
        className="mb-4"
      />
      <Button variant="contained" color="primary" fullWidth type="submit">
        Save Changes
      </Button>
    </form>
  </Paper>
);

export default Profile;
