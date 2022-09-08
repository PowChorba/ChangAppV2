import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  allNotifications,
  deleteNotification,
  getUserEmail,
} from "../../redux/actions";
import { useAuth } from "../../context/authContext";
import { Box, Button, Typography } from "@mui/material";
import "../css/empty.css";

import styles from "./Request/style";
import error from "../../404.png";

export default function Notifications() {
  const { user } = useAuth();
  let notifications = useSelector((state) => state.allNotifications);
  const userState = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  notifications = notifications.filter(
    (e) => e.userNotificated_id === userState[0]?.id
  );
  notifications = notifications.reverse();

  //Paginado para los servicios
  const paginas = Math.ceil(notifications.length / 3);
  const [pages, setPages] = useState(1);
  const [notisPerPage] = useState(3);
  const ultima = pages * notisPerPage;
  const primera = ultima - notisPerPage;
  const notisSlice = notifications.slice(primera, ultima);

  const handleAnterior = (e) => {
    e.preventDefault();
    setPages(pages - 1);
    if (pages < 2) {
      setPages(1);
    }
    window.scrollTo(0, 0);
  };

  const handleSiguiente = () => {
    setPages(pages + 1);
    if (pages >= paginas) {
      setPages(paginas);
    }
    window.scrollTo(0, 0);
  };

  // useEffect(() => {
  //   dispatch(allNotifications());
  //   dispatch(getUserEmail(user?.email));
  // }, [dispatch, user?.email]); 
  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(deleteNotification(e.target.id));
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  };

  return (
    <Box
      sx={{
        width: "70%",
        height:'88vh',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection:'column'
      }}
    >
      <Box
        sx={{
          width: "95%",
          height:'80%',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "4%",
        }}
      >
        {notifications.length === 0 ? (
          <Box
            className="empty-container"
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" mb={5}>
              Sin noticias actualmente
            </Typography>

            {<img src={error} alt="?" width="182px" height="182px" />}
            {/* </Avatar> */}
          </Box>
        ) : (
          notisSlice.map((e) => {
            return (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  border: "solid grey 1px",
                  borderRadius: "10px",
                  margin: "1% 0px",
                }}
                key={e.id}
              >
                <Box sx={{ padding: "2%" }}>
                  <Typography sx={{ fontSize: "1.3rem" }}>
                    Notificacion de {e.userNotification?.firstName}{" "}
                  </Typography>
                  <Typography sx={{ fontSize: "1.3rem" }}>
                    {e.message}
                  </Typography>
                </Box>
                <Button
                  sx={{
                    borderRadius: "0 10px 10px 0",
                    backgroundColor: "#1F2937",
                  }}
                  variant="contained"
                  id={e.id}
                  onClick={handleOnClick}
                >
                  X
                </Button>
              </Box>
            );
          })
        )}

      </Box>
      <Box style={styles.paginadoDiv}>
          <button style={styles.btnPaginado} onClick={handleAnterior}>{'<'}</button>
          {pages} of {paginas}
          <button style={styles.btnPaginado} onClick={handleSiguiente}>{'>'}</button>
        </Box>

    </Box>
  );
}
