import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allNotifications, deleteNotification} from "../../redux/actions";
import { Box, Button, Typography } from "@mui/material";
import s from './Notificaciones.module.css'
import error from "../../404.png";
import { useEffect } from "react";

export default function Notifications() {
  let notifications = useSelector((state) => state.allNotifications);
  const userState = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  notifications = notifications.filter(
    (e) => e.userNotificated_id === userState[0]?.id
  );
  notifications = notifications.reverse();
  
  useEffect(() => {
    dispatch(allNotifications())
  }, [dispatch])
  
  //Paginado para los servicios
  const paginas = Math.ceil(notifications.length / 7);
  const [pages, setPages] = useState(1);
  const [notisPerPage] = useState(7);
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

  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(deleteNotification(e.target.id));
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  };

  return (
    <Box
      className={s.boxUno}
    >
      <Box
        className={s.boxDos}
      >
        {notifications.length === 0 ? (
          <Box
            className={s.emptyContainer}
          >
            <Typography variant="h6" mb={5}>
              Sin notificaciones nuevas por el momento
            </Typography>
            {<img src={error} alt="?" width="182px" height="182px" />}
          </Box>
        ) : (
          notisSlice.map((e) => {
            return (
              <Box
                className={s.boxTres}
                key={e.id}
              >
                <Box className={s.boxCuatro}>
                  <Typography className={s.texto}>
                    Notificacion de {e.userNotification?.firstName}{" "}
                  </Typography>
                  <Typography className={s.texto}>
                    {e.message}
                  </Typography>
                </Box>
                <Button
                  className={s.boxBoton}
                  variant="contained"
                  color="error"
                  size="small"
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
      <Box className={s.paginadoDiv}>
          <button className={s.btnPaginado} onClick={handleAnterior}>{'<'}</button>
          {pages} of {paginas}
          <button className={s.btnPaginado} onClick={handleSiguiente}>{'>'}</button>
        </Box>

    </Box>
  );
}
