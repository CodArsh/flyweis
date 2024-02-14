import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LocalMallIcon from "@mui/icons-material/LocalMall";
export const API_URL = "https://chetan-project-backend.vercel.app";

export const dashboard_details = [
  {
    name: "All Product",
    quantity: 61,
    bgcolor: "#3c335d",
    icon: <LocalGroceryStoreIcon style={{ color: "#3c335d" }} />,
  },
  {
    name: "All Category",
    quantity: 11,
    bgcolor: "#023b5b",
    icon: <CategoryIcon style={{ color: "#023b5b" }} />,
  },
  {
    name: "All Sub-Category",
    quantity: 18,
    bgcolor: "#72909e",
    icon: <FolderCopyIcon style={{ color: "#72909e" }} />,
  },
  {
    name: "All User",
    quantity: 11,
    bgcolor: "#2f6967",
    icon: <PersonIcon style={{ color: "#2f6967" }} />,
  },
  {
    name: "All Sub-Category",
    quantity: 18,
    bgcolor: "#04649b",
    icon: <LocalMallIcon style={{ color: "#04649b" }} />,
  },
  {
    name: "Not Delievered",
    quantity: 24,
    bgcolor: "#ff9b3f",
    icon: <LocalMallIcon style={{ color: "#ff9b3f" }} />,
  },
];

export const USER_LIST = "USER_LIST";
export const CATEGORY = "CATEGORY";
