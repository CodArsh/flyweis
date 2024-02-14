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
import { API_URL, USER_LIST } from "../../constants/data";
import ModalContainer from "../ModalContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateUser from "../CreateUser";
import LoaderAnimation from "../Loader";

const UserList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [newUser, setNewUser] = useState(false);
  const notify = (message) => toast(message);

  useEffect(() => {
    // This api will fetch all users list
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/user/all`);
        setData(response?.data?.users);
      } catch (error) {
        console.log("Error while fetching users list ===> ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [newUser]);

  // Here Notification Modal handling
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmitModal = (notify_data) => {
    sendNotification(notify_data);
  };

  const sendNotification = async (notify_data) => {
    try {
      const data = { message: notify_data };
      await axios.post(`${API_URL}/api/v1/notify`, data);
      setInputValue("");
      notify("Notification send successfully");
    } catch (error) {
      console.log("Error while send notification ===> ", error);
    } finally {
      handleCloseModal();
    }
  };

  // new user registration here
  const handleCreateNewUser = () => {
    setNewUser(true);
  };
  return (
    <div style={{ padding: "20px", height: "100vh" }}>
      <Welcome />
      {loading ? (
        <LoaderAnimation />
      ) : (
        <div>
          {!newUser ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TotalCount item={`All User's`} count={data?.length} />
                <span>
                  <Button
                    variant="contained"
                    sx={{ marginRight: "10px" }}
                    onClick={handleOpenModal}
                  >
                    Send Notification
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleCreateNewUser()}
                  >
                    Create New
                  </Button>
                </span>
              </div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>S.no</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Phone number</TableCell>
                      <TableCell>Email</TableCell>
                      {/* NOTE: It returns nothing that's why i comment it <TableCell>Payment mode</TableCell> */}
                      <TableCell>Created At</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Delivered Boy</TableCell>
                      <TableCell>Address Change Request</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.name ? row.name : "-"}</TableCell>
                        <TableCell>{row.phone ? row.phone : "-"}</TableCell>
                        <TableCell>{row.email ? row.email : "-"}</TableCell>
                        {/* <TableCell>{row.paymentMode}</TableCell> */}
                        <TableCell>{row.createdAt?.substring(0, 10)}</TableCell>
                        {/* This verified returns boolean */}
                        <TableCell>
                          {row.verified ? "Active" : "Deactive"}
                        </TableCell>
                        <TableCell>{row.role}</TableCell>
                        <TableCell>
                          <Button variant="contained">Accept</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <ToastContainer />
            </>
          ) : (
            <CreateUser newUser={newUser} setNewUser={setNewUser} />
          )}

          <ModalContainer
            title={"Send Notification"}
            open={modalOpen}
            handleClose={handleCloseModal}
            handleSubmit={handleSubmitModal}
            setInputValue={setInputValue}
            inputValue={inputValue}
            type={USER_LIST}
          />
        </div>
      )}
    </div>
  );
};

export default UserList;
