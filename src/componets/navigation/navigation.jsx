import React from "react";
import logo from "./Logo.png";
import { navigationMenue } from "./navigationMenu";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Navigation = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout=()=>{
    console.log("logout")
    handleClose()
  }

  return (
    <div className="h-screen sticky top-0">
      <div>
        <div className="py-5">
          <img
            src={logo}
            alt="Description"
            style={{ width: "70px", height: "70px" }}
          />
        </div>

        <div className="space-y-6">
          {navigationMenue.map((item) => (
            <div
              className="cursor-pointer flex space-x-3 items-center"
              onClick={() =>
                item.tittle === "Profile"
                  ? navigate(`/profile/${5}`)
                  : navigate(item.path)
              }
            >
              {item.icon}
              <p className="text-x1">{item.tittle}</p>
            </div>
          ))}
        </div>

        <div className="py-10">
          <Button
            sx={{
              width: "100%",
              borderRadius: "20px",
              py: "10px",
              bgcolor: "#1e88e5",
            }}
            variant="contained"
          >
            Post your idea
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar
            alt="username"
            src="https://lh3.googleusercontent.com/ogw/AF2bZyg7pm6HgBOykIariQMy7GfONtoFonwYHbQDTgdu4lcdre0=s64-c-mo"
          />
          <div>
            <span>Malik Akthar</span>
          </div>

          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
