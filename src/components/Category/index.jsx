import React, { useState, useEffect } from "react";
import Welcome from "../Welcome";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import TotalCount from "../TotalCount";
import { API_URL, CATEGORY } from "../../constants/data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateUser from "../CreateUser";
import LoaderAnimation from "../Loader";
import ModalContainer from "../ModalContainer";
import { Delete, Edit } from "@mui/icons-material";

const Category = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [imgName, setImageName] = useState(null);
  const [updateActive, setUpdateActive] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const notify = (message) => toast(message);

  useEffect(() => {
    // This api will fetch all category list
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/catg`);
        setData(response?.data?.categories);
      } catch (error) {
        console.log("Error while fetching users list ===> ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    if (!modalOpen) {
      setInputValue("");
    }
  }, [modalOpen]);

  // Here Notification Modal handling
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmitModal = (imageName, imagePath) => {
    if (updateActive) {
      updateCategory(updateId,imageName, imagePath);
    } else {
      categotyApiIntegration(imageName, imagePath);
    }
  };

  const categotyApiIntegration = async (name, path) => {
    const formData = { name: name, image: path };
    try {
      const res = await axios.post(`${API_URL}/api/v1/catg/create`, formData);
      setInputValue("");
      notify("Category Created successfully");
    } catch (error) {
      console.log("Error while send notification ===> ", error);
    } finally {
      handleCloseModal();
    }
  };

  // DELETE CATEGORY
  const deleteCategory = async (imageId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/v1/catg/delete/category/${imageId}`
      );
      notify("Category deleted");
      setData(response?.data?.categories);
    } catch (error) {
      console.log("Error while fetching users list ===> ", error);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE CATEGORY
  const updateCategory = async (imageId, name, path) => {
    const formData = { name: name, image: path };
    try {
      const response = await axios.put(
        `${API_URL}/api/v1/catg/update/${imageId}`,
        formData
      );

      console.log("imag... .. . . ",response)
      notify("Image Updated");
      setData(response?.data?.categories);
    } catch (error) {
      console.log("Error while fetching users list ===> ", error);
    } finally {
      handleCloseModal();
      setLoading(false);
    }
  };

  const handleUpdate = (name, id) => {
    setUpdateId(id);
    setUpdateActive(true);
    setImageName(name);
    setModalOpen(true);
  };
  return (
    <div
      style={{
        padding: "20px",
        height: "100vh",
      }}
    >
      <Welcome />
      {loading ? (
        <LoaderAnimation />
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TotalCount item={`All Categories's`} count={data?.length} />
            <span>
              <Button
                variant="contained"
                sx={{ marginRight: "10px" }}
                onClick={handleOpenModal}
              >
                Add Category
              </Button>
            </span>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S.no</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={row.image} // Use src instead of source
                        style={{ height: 50, width: 50 }}
                        alt="Image" // Provide alt text for accessibility
                      />
                    </TableCell>
                    <TableCell>{row.name ? row.name : "-"}</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => deleteCategory(row?._id)}
                      >
                        <Delete />
                      </Button>
                      <Button onClick={() => handleUpdate(row?.name, row?._id)}>
                        <Edit />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ToastContainer />

          <ModalContainer
            title={"Create New Category"}
            open={modalOpen}
            handleClose={handleCloseModal}
            handleSubmit={handleSubmitModal}
            setInputValue={setInputValue}
            inputValue={inputValue}
            type={CATEGORY}
            name={imgName}
          />
        </div>
      )}
    </div>
  );
};

export default Category;
