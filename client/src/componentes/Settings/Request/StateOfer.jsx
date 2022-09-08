import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import {
  allRequest,
  deleteRequest,
  getUserEmail,
  postNotification,
} from "../../../redux/actions";
import { Button, Box, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import '../../css/empty.css'
import Review from "../../Review";
import error from '../../../404.png'
import CloseIcon from "@mui/icons-material/Close";
import Stripe from "../../Stripe";


export default function StateRequester() {
  const { user } = useAuth();
  const userState = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  //PARA TRAER LOS REQUEST
  const requestState = useSelector((state) => state.allRequest);
  const filterById = requestState.filter(
    (e) => e.requester_id === userState[0]?.id
  );
 
  // useEffect(() => {
  //   dispatch(getUserEmail(user?.email));
  //   dispatch(allRequest());
  // }, [dispatch, user?.email]);

  //Paginado para los servicios
  const paginas = Math.ceil(filterById.length / 3)
  const [pages, setPages] = useState(1)
  const [requestPerPage] = useState(3)
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

  const styles = {
    acepted: {
      display: "flex",
      border: "solid #58CC22 2px",
      margin: "2%",
      padding: "2%",
      borderRadius: "10px",
      alignItems: "center",
    },
    rejected: {
      display: "flex",
      border: "solid #E00A0A 2px",
      margin: "2%",
      padding: "2%",
      borderRadius: "10px",
      alignItems: "center",
    },
    pending: {
      display: "flex",
      border: "solid grey 2px",
      margin: "2%",
      padding: "2%",
      borderRadius: "10px",
      alignItems: "center",
    },
    btnPaginado: {
      cursor: "pointer",
      backgroundColor: "#1F2937",
       border: "none",
        padding: "5px 20px",
        borderRadius: "20px",
        color: '#fff',
        outline: '0'
    },
    paginadoDiv: {
      // marginTop: '5px',
      textAlign: 'center',
      marginBottom:"5px"
    }
  };


  return (

    <Box sx={{
      width: "70%",
      height:'88vh',
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection:'column'
    }} 
    style={hide === false ? styles.con : styles.no}
    >
      
      {filterById.length === 0 ? (
        <Box className="empty-container" sx={{textAlign: 'center', display: 'flex', flexDirection:'column', alignItems: 'center'}}>
          <Typography variant="h5" mb={5}>Aun no has realizado ninguna solicitud</Typography>
          {/* <Avatar sx={{ width: 182, height: 182, boxShadow:' rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px' }}> */}
             <img src={error} alt="?" width="250px" height="150px" />
          {/* </Avatar> */}
        </Box>
      ) : (
        <Box sx={{display:'flex', flexDirection:'column', width:'80%', alignItems:'center',justifyContent: "center", height:'100%'}}>
          {
        requestSlice.map((e) => {
          return (
            <Box
            sx={{width:'100%'}}
              style={
                e.state === "rechazado"
                  ? styles.rejected
                  : e.sate === "aceptado"
                  ? styles.acepted
                  : styles.pending
              }
            >
              <Box sx={{ width: "20%", fontSize: "1.2rem" }}>
                <Typography variant="h7">{e.services?.name}</Typography>
              </Box>
              <Box
                sx={{
                  width: "60%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
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
                  sx={{ backgroundColor: "#1F2937" }}
                  variant="contained"
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
                        {/* <Typography> */}
                        <Button
                            variant="contained"
                            sx={{ width: "100%", margin: "2%" }}
                            onClick={handlePagar}
                          >
                            Pagar
                          </Button>
                      {/* </Typography> */}
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
                          <div
                            style={hide === true ? styles.hide : styles.nohide}
                          >
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
                              sx={{display:'flex', padding:'30px 0', justifyContent:'center'}}
                              style={
                                hide === true ? styles.hide : styles.nohide
                              }
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
                                <Box sx={{width:'50%', margin:'2% auto',display:'flex', justifyContent:'space-around'}}>
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
      <div style={styles.paginadoDiv}>
          <button style={styles.btnPaginado} onClick={handleAnterior}>{'<'}</button>
          {pages} of {paginas}
          <button style={styles.btnPaginado} onClick={handleSiguiente}>{'>'}</button>
        </div>
    </Box>
  );
}
