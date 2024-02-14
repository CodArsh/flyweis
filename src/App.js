import React, { useState } from "react";
import { Grid, Paper, List, ListItem, ListItemText } from "@mui/material";
import UserList from "./components/UserList";
import Dashboard_Data from "./components/Dashboard";
import Category from "./components/Category";
import Subcategory from "./components/SubCategory";
import Product from "./components/Product";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
const menuItems = [
  "Dashboard",
  "User List",
  "Category",
  "Subcategory",
  "Product",
];

function App() {
  const [selectedItem, setSelectedItem] = useState("User List");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container>
        <Grid
          item
          xs={2}
          style={{ height: "100vh", backgroundColor: "#00ab7f" }}
        >
          <h3
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            ADMIN PANEL
          </h3>
          <List>
            {menuItems?.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleItemClick(item)}
                style={{
                  backgroundColor:
                    selectedItem === item ? "rgb(4,125,206)" : "inherit",
                  color: "white",
                }}
              >
                {item === "Dashboard" ? (
                  <DashboardIcon />
                ) : item === "User List" ? (
                  <PersonIcon />
                ) : item === "Category" ? (
                  <CategoryIcon />
                ) : item === "Subcategory" ? (
                  <FolderCopyIcon />
                ) : (
                  <LocalGroceryStoreIcon />
                )}
                &nbsp;&nbsp;
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid
          item
          xs={10}
          style={{
            height: "100vh",
            backgroundColor: "#e0e0e0",
            overflowY: "scroll",
          }}
        >
          <Paper elevation={3} sx={{ height: "100vh", overflowY: "scroll" }}>
            {selectedItem === "Dashboard" ? (
              <Dashboard_Data />
            ) : selectedItem === "User List" ? (
              <UserList />
            ) : selectedItem === "Category" ? (
              <Category />
            ) : selectedItem === "Subcategory" ? (
              <Subcategory />
            ) : (
              <Product />
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
