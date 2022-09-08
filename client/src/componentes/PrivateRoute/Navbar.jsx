/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../css/navBar.css";
import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Logout from "@mui/icons-material/Logout";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allNotifications, getUserEmail } from "../../redux/actions";
import NotificationsIcon from "@mui/icons-material/Notifications";

const styles = {
  container: {
    padding: "5px 0",
    backgroundColor: "#1F2937",
    color: "#fff",
  },
  button: {
    color: "#fff",
  },
  asd: {
    textDecoration: "none",
    color: "#fff",
  },
  divPrueba: {
    position: "relative",
  },
  prueba: {
    display: "none",
  },
  prueba2: {
    display: "block",
    backgroundColor: "#1F2937",
    textAlign: "center",
    position: "absolute",
    right: "-60px",
    borderRadius: "5px",
    width: "150px",
    height: "150px",
    fontSize: "14px",
    zIndex: "10",
  },
  asdd: {
    margin: "15px 5px",
    backgroundColor: "#fff",
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
  cero: {
    backgroundColor: "#fff",
    textAlign: "center",
    color: "#000",
    margin: "15px 5px",
  },
  noAdmin: {
    display: "none",
  },
  admin: {
    display: "block",
    textDecoration: "none",
    color: "#000",
  },
};

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handlerClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (e) => {
    logout();
    navigate("/");
  };

  //PARA TRAER LA FOTO DEL USUARIO
  const estado = useSelector((state) => state.filter);
  let notifications = useSelector((state) => state.allNotifications);
  notifications = notifications.filter(
    (e) => e.userNotificated_id === estado[0]?.id
  );
  notifications = notifications.splice(0, 4);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserEmail(user?.email));
    dispatch(allNotifications());
  }, [dispatch, user?.email]);

  //PROBANDO
  const [noti, setNoti] = useState(true);
  const handleNotification = (e) => {
    e.preventDefault();
    setNoti(!noti);
  };

  return (
    <Box style={styles.container} className="navBar">
      <Typography variant="h4">
        <Link style={styles.asd} to="/home">
          ChangApp
        </Link>
      </Typography>

      <SearchBar style={styles.button} />
      <div>
        <Link style={{ textDecoration: "none" }} to="/home/createService">
          <Button style={styles.button}>Crear Servicio</Button>
        </Link>
      </div>

      <div style={styles.divPrueba}>
        {notifications.length === 0 ? (
          <NotificationsIcon value={noti} onClick={handleNotification} />
        ) : (
          <NotificationsActiveIcon value={noti} onClick={handleNotification} />
        )}
        <div style={noti ? styles.prueba : styles.prueba2}>
          {notifications.length === 0 ? (
            <p style={styles.cero}>No hay notificaciones nuevas</p>
          ) : (
            notifications.map((e) => {
              return (
                <div key={e.id} style={styles.asdd}>
                  <p>
                    <Link style={styles.link} to="/settings/notifications">
                      Nueva Notificacion
                    </Link>
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* </Link> */}

      <Tooltip title="Account settings">
        <IconButton
          onClick={handlerClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 52, height: 52 }}>
            {estado[0]?.img ? (
              <img src={estado[0]?.img} alt="?" width="52px" height="52px" />
            ) : (
              "?"
            )}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {
          user?.isAnonymous === false ? <div>
            <Link to="/settings/profile" style={styles.admin}>
          <MenuItem>
            <Avatar /> Perfil
          </MenuItem>
        </Link>
        <Divider />        
          </div>
          : <div>
            <Link to="/register" style={styles.admin}>
          <MenuItem>
            <Avatar /> Registrarse
          </MenuItem>
        </Link>
        <Divider />
          </div>
        }
        <Link
          style={estado[0]?.admin === true ? styles.admin : styles.noAdmin}
          to="/admin/dashboard"
        >
          <MenuItem>
            <Settings /> Admin
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={handleClick}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar sesion
        </MenuItem>
      </Menu>
    </Box>
  );
}
