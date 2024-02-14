import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Typography,
  Button,
  Input,
} from "@mui/material";
import { CATEGORY, USER_LIST } from "../../constants/data";

function ModalContainer({
  title,
  name,
  type,
  open,
  handleClose,
  handleSubmit,
  inputValue,
  setInputValue,
}) {
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <TextField
          fullWidth
          label={
            type === USER_LIST
              ? "Notification"
              : type === CATEGORY
              ? "Name"
              : null
          }
          value={inputValue}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={type === USER_LIST ? 4 : 1}
          sx={{ mb: 2 }}
        />
        {type === CATEGORY && (
          <>
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button variant="outlined" component="span">
                Upload Image
              </Button>
            </label>
            <br />
            {selectedImage && (
              <div>
                <Typography variant="h6">Preview:</Typography>
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              </div>
            )}
          </>
        )}
        <Button
          variant="contained"
          sx={{
            marginTop: "15px",
            backgroundColor: "#00ab7f",
            "&:hover": { backgroundColor: "#00ab99" },
          }}
          onClick={() =>
            type === USER_LIST
              ? handleSubmit(inputValue)
              : handleSubmit(inputValue, selectedImage)
          }
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

export default ModalContainer;
