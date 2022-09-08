import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { NavLink, Outlet, Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function Adminnavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Box
        component="div"
        onChange={handleChange}
        value={value}
        aria-label="Tabs where selection follows focus"
        selectionfollowsfocus="true"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          color: "white",
          backgroundColor: "#1F2937",
        }}
      >
        <div>
          <Link style={{ textDecoration: "none", color: "#fff" }} to="/home">
            <h2>ChangApp</h2>
          </Link>
        </div>

        <Box sx={{ display: "flex" }}>
          <NavLink to="dashboard">
            <Button
              sx={{ color: "white", textDecoration: "none" }}
              label="ADMIN"
            >
              Admin
            </Button>
          </NavLink>
          <NavLink to="users">
            <Button
              sx={{ color: "white", textDecoration: "none" }}
              label="USUARIOS"
            >
              Usuarios
            </Button>
          </NavLink>
          <NavLink to="services">
            <Button
              sx={{ color: "white", textDecoration: "none" }}
              label="SERVICIOS"
            >
              Servicios
            </Button>
          </NavLink>
          <NavLink to="requests">
            <Button
              sx={{ color: "white", textDecoration: "none" }}
              label="SOLICITUDES"
            >
              Solicitudes
            </Button>
          </NavLink>
          <NavLink to="categories">
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "white", textDecoration: "none" }}
              label="CATEGORIAS"
            >
              Categorias
            </Button>
          </NavLink>
        </Box>

        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            color: "white",
            textDecoration: "none",
            background: "#ffffff",
            opacity: "0.8",
          }}
        >
          <NavLink
            sx={{
              color: "white",
              textDecoration: "none",
              backgroundColor: "black",
            }}
            to="createCategory"
          >
            <MenuItem
              sx={{
                color: "white",
                textDecoration: "none",
                backgroundColor: "black",
              }}
              onClick={handleClose}
            >
              Agregar
            </MenuItem>
          </NavLink>
          <NavLink
            sx={{
              color: "white",
              textDecoration: "none",
              backgroundColor: "black",
            }}
            to="deleteCategory"
          >
            <MenuItem
              sx={{
                color: "white",
                textDecoration: "none",
                backgroundColor: "black",
              }}
              onClick={handleClose}
            >
              Eliminar
            </MenuItem>
          </NavLink>
        </Menu>
      </Box>
      <Outlet />
    </Box>
  );
}
