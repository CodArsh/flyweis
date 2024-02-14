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
import { API_URL } from "../../constants/data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderAnimation from "../Loader";
import { Delete, Edit } from "@mui/icons-material";

const Product = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const notify = (message) => toast(message);

  useEffect(() => {
    // This api will fetch all products list
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/product/admin/products`
        );
        setData(response?.data?.products);
        console.log("pro... ", response);
      } catch (error) {
        console.log("Error while fetching users list ===> ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // DELETE PRODUCT
  const deleteProduct = async (imageId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/v1/catg/product/delete/${imageId}`
      );
      notify("Product deleted");
      setData(response?.data?.products);
    } catch (error) {
      console.log("Error while fetching users list ===> ", error);
    } finally {
      setLoading(false);
    }
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
            <TotalCount item={`All Product's`} count={data?.length} />
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S.no</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={row?.images[0]?.img} // Use src instead of source
                        style={{ height: 50, width: 50 }}
                        alt="Image" // Provide alt text for accessibility
                      />
                    </TableCell>
                    <TableCell>{row?.name ? row?.name : "-"}</TableCell>

                    <TableCell>{row?.Stock}</TableCell>
                    <TableCell>{row?.createdAt.substring(0, 10)}</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => deleteProduct(row?._id)}
                      >
                        <Delete />
                      </Button>
                      <Button onClick={() => notify("Coming Soon..")}>
                        <Edit />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Product;
