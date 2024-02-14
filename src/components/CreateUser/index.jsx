import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { API_URL } from "../../constants/data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const CreateUser = ({ newUser, setNewUser }) => {
  const notify = (message) => toast(message);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //   New user registration here
  const handleSubmit = (e) => {
    e.preventDefault();
    createNewUser(formData);
    setNewUser(false);
  };

  const createNewUser = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/user/create`, data);
      notify(response?.data?.message);
    } catch (error) {
      console.log("Error white creating new user ===>", error);
    }
  };
  return (
    <Grid container justifyContent="center" mt={4}>
      <Grid item xs={12} sm={12} md={12}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h5" gutterBottom>
            Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              name="address"
              value={formData.address}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  size="small"
                  sx={{
                    backgroundColor: "#00ab7f",
                    "&:hover": { backgroundColor: "#00ab99" },
                  }}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={8} />
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  fullWidth
                  size="small"
                  onClick={() => setNewUser(false)}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateUser;
