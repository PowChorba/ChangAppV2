import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRequest,
  postNotification,
} from "../../../redux/actions";
import { Button, Box, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Review from "../../Review";
import error from '../../../404.png'
import CloseIcon from "@mui/icons-material/Close";
import Stripe from "../../Stripe";
import s from './StateOfer.module.css'

export default function StateRequester() {
  const userState = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  //PARA TRAER LOS REQUEST
  const requestState = useSelector((state) => state.allRequest);
  const filterById = requestState.filter(
    (e) => e.requester_id === userState[0]?.id
  );

  //Paginado para los servicios
  const paginas = Math.ceil(filterById.length / 5)
  const [pages, setPages] = useState(1)
  const [requestPerPage] = useState(5)
  const ultima = pages * requestPerPage
  const primera = ultima - requestPerPage
  const requestSlice = filterById.slice(primera, ultima).reverse()

  const handleAnterior = (e) => {
    e.preventDefault()
    setPages(pages - 1)
      if(pages < 2){
        setPages(1)
      }
      window.scrollTo(0,0)
  }

  const handleSiguiente = () => {
    setPages(pages + 1)
    if(pages >= paginas){
      setPages(paginas)
    }
    window.scrollTo(0,0)
}


  //PARA ENVIAR NOTIFIACION CON MENSAJE PERSONALIZADO
  const [noti, setNoti] = useState({
    message: "",
    userNotification_id: "",
    userNotificated_id: "",
  });

  const [del, setDel] = useState({
    id: 0,
  });

  const [hide, setHide] = useState(true);
  const [pagar, setPagar] = useState(true);
  const [rev, setRev] = useState(true);


  const handlePagar = (e) => {
    e.preventDefault(e);
    setNoti({
      ...noti,
      userNotificated_id: e.target.name,
    });
    setDel({
      id: e.target.id,
    });
    setPagar(!pagar);
  }

  const handleRev = (e) => {
    e.preventDefault(e);
    setNoti({
      ...noti,
      userNotificated_id: e.target.name,
    });
    setDel({
      id: e.target.id,
    });
    setRev(!rev);
  }


  const handleClic = (e) => {
    e.preventDefault(e);
    setNoti({
      ...noti,
      userNotificated_id: e.target.name,
    });
    setDel({
      id: e.target.id,
    });
    setHide(!hide);
  };

  const handleNotification = (e) => {
    e.preventDefault();
    setNoti({
      ...noti,
      message: e.target.value,
      userNotification_id: userState[0]?.id,
    });
  };

  const handleClear = (e) => {
    e.preventDefault();
    dispatch(postNotification(noti));
    dispatch(deleteRequest(del.id));
    setTimeout(() => {
      window.location.reload(true);
    }, 2000);
  };

  const handleDele = (e) => {
    e.preventDefault();
    dispatch(deleteRequest(e.target.id));
    setTimeout(() => {
      window.location.reload(true);
    }, 2000);
  };

  return (

    <Box className={s.contenedorGeneral} 
    >
      
      {filterById.length === 0 ? (
        <Box className={s.emptyContainer}>
          <Typography variant="h5" mb={5}>Aun no has realizado ninguna solicitud</Typography>
             <img src={error} alt="?" width="250px" height="150px" />
        </Box>
      ) : (
        <Box className={s.boxUno}>
          {
        requestSlice.map((e) => {
          return (
            <Box
            sx={{width:'100%'}}
              className={
                e.state === "rechazado"
                  ? s.rejected
                  : e.sate === "aceptado"
                  ? s.acepted
                  : s.pending
              }
            >
              <Box className={s.nombreServicioBox}>
                <Typography variant="h7">{e.services?.name}</Typography>
              </Box>
              <Box
                className={s.boxDos}
              >
                <Typography variant="h7">
                  El servicio esta solicitado para el dia {e.day} a las{" "}
                  {e.hours}
                  hs
                </Typography>
                <Typography variant="h7">Estado: {e.state}</Typography>
              </Box>

              {e.state === "rechazado" ? (
                <Button
                  variant="contained"
                  color="error"
                  id={e.id}
                  onClick={handleDele}
                >
                  Eliminar
                </Button>
              ) : (
                <div>
                  {e.state === "aceptado" ? (
                    <Box>
                      <div>
                        <Button
                            variant="contained"
                            sx={{ width: "100%", margin: "2%" }}
                            onClick={handlePagar}
                          >
                            Pagar
                          </Button>
                      <Dialog open={!pagar} fullScreen={true}>
                      <span onClick={handlePagar}>
                        <CloseIcon />
                        </span>
                          <Stripe id={e.service_id}/>
                      </Dialog>
                      </div>
                      <Button
                        sx={{ width: "100%", margin: "2%" }}
                        variant="contained"
                        name={e.services?.user_id}
                        id={e.id}
                        onClick={handleClic}
                      >
                        Cancelar
                      </Button>
                      <div>
                        <Dialog open={!hide}>
                          <div>
                            <form onSubmit={(p) => handleClear(p)}>
                              <label>
                                Deja un mensaje explicando el motivo de
                                cancelacion
                              </label>
                              <br />
                              <input
                                type="text"
                                name="message"
                                value={noti.message}
                                onChange={handleNotification}
                              />
                              <br />
                              <button type="submit" id={e.id}>
                                Enviar
                              </button>
                            </form>
                            <button onClick={handleClic}>Cerrar</button>
                          </div>
                        </Dialog>
                      </div>
                    </Box>
                  ) : (
                    <div>
                      {e.state === "Pagado" ? (
                        <div>
                          <Button onClick={handleRev} sx={{ width: "100%", margin: "2%" }} variant="contained">Dejar reseña</Button>
                        <Dialog open={!rev}>
                        <span onClick={handleRev}>
                        <CloseIcon />
                        </span>
                          <Review
                          id={e.service_id}
                          />
                        </Dialog>
                        </div>
                      ) : (
                        <div>
                          <Button
                            variant="contained"
                            name={e.services?.user_id}
                            id={e.id}
                            onClick={handleClic}
                          >
                            Cancelar
                          </Button>
                          <Dialog open={!hide}>
                            <Box
                              className={s.boxTres}
                            >
                              <form style={{textAlign:'center', width:'80%'}} onSubmit={(p) => handleClear(p)}>
                                <label style={{padding:'5px 0'}}>
                                  Deja un mensaje explicando el motivo de
                                  cancelacion
                                </label>
                                <textarea
                                  rows='5'
                                  cols='50'
                                  name="message"
                                  value={noti.message}
                                  onChange={handleNotification}
                                  style={{resize:'none'}}
                                />
                                <Box className={s.botonCancelarDialog}>
                                  <Button variant='contained' type="submit" id={e.id}>
                                    Enviar
                                  </Button>
                                  <Button variant='contained' onClick={handleClic}>Cerrar</Button>
                                </Box>

                              </form>
                              
                            </Box>
                          </Dialog>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Box>
          );
        })
          }
        </Box>
      )}
      <div className={s.paginadoDiv}>
          <button className={s.btnPaginado} onClick={handleAnterior}>{'<'}</button>
          {pages} of {paginas}
          <button className={s.btnPaginado} onClick={handleSiguiente}>{'>'}</button>
        </div>
    </Box>
  );
}
