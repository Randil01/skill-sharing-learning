import React from "react";
import logo from "./Logo.png";
import { navigationMenue } from "./navigationMenu";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Store/Auth/Action";


const Navigation = () => {
  const {auth} = useSelector(store=>store)
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout=()=>{
    console.log("logout")
    handleClose()
    dispatch(logOut())
  }

  return (
    <div className="h-full">
      <div>
        <div className="py-5">
          <img
            src={logo}
            alt="Description"
            style={{ width: "90px", height: "90px" }}
          />
        </div>

        <div className="space-y-6">
          {navigationMenue.map((item) => (
            <div
              key={item.tittle}
              className="cursor-pointer flex space-x-3 items-center"
              onClick={() =>
                item.tittle === "Profile"
                  ? navigate(`/profile/${auth.user?.id}`)
                  : navigate(item.path)
              }
            >
              {item.icon}
              <p className="text-x1">{item.tittle}</p>
            </div>
          ))}
        </div>

        <div className="py-10 ml-[-10px]">
          <Button
            sx={{
              width: "200px",
              borderRadius: "30px",
              py: "10px",
              bgcolor: "#1e88e5",
            }}
            variant="contained"
          >
            Post your idea
          </Button>
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center space-x-3">
            <Avatar
              alt="username"
              src={auth.user?.profilepic}
            />
            <div>
              <p>{auth.user?.fullName}</p>
              <span className="opacity-70">@{auth.user?.fullName.split(" ").join("_").toLowerCase()}</span>
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
    </div>
  );
};

export default Navigation;
