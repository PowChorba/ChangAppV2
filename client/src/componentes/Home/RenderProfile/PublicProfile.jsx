import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { allUsers, getAllServices } from "../../../redux/actions";
import Navbar from "../../PrivateRoute/Navbar";
import { Link } from "react-router-dom";
import {Rating, Dialog} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import s from './RenderProfile.module.css'


export default function PublicProfile() {
  let userServices = useSelector((state) => state.services);
  const allUser = useSelector((state) => state.users);
  const param = useParams();
  const dispatch = useDispatch();
  const filterUser = allUser.filter((n) => n.id === param.id);
  userServices = userServices.filter((e) => e.user?.id === param.id);
  const filtrarReviews = filterUser[0]?.reviews.slice(0, 2);
  //ESTADO PARA EL POP UP
  const [btn, setBtn] = useState(false);
  useEffect(() => {
    dispatch(getAllServices());
    dispatch(allUsers());
  }, [dispatch]);

  const handleOnClic = (e) => {
    e.preventDefault();
    window.history.back();
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setBtn(!btn);
  };
  console.log(filtrarReviews)
 
  return(
    <div>
      <Navbar/>
      <div className={s.btnDiv}>
        <button className={s.btn} onClick={handleOnClic}>Volver atras</button>
      </div>
      <div className={s.container}>
        <div className={s.usuario}>
          <div className={s.datosUsuario}>
            <h2>Datos del usuario</h2>
            <img src={filterUser[0]?.img} alt={filterUser[0]?.firstName} width='150px'/>
            <h4>{filterUser[0]?.firstName} {filterUser[0]?.lastName}</h4>
            <p><LocationOnIcon/> {filterUser[0]?.location}</p>
            <p>{filterUser[0]?.createdAt}</p>
          </div>
          <div className={s.divDesc}>
            <p>Descripcion</p>
            <p className={s.letras}>{filterUser[0]?.description}</p>
          </div>
        </div>
        <div className={s.services}>
          <h2 className={s.titulo}>Servicios Publicados</h2>
          {
            userServices && userServices.map(e => {
              return(
                <div key={e.id} className={s.eachService}>
                  <img src={e.category?.img} alt="Roto" className={s.imagen}/>
                  <h3>{e.name}</h3>
                  <p>${e.price}</p>
                  {/* <p>Dias: {e.day}</p> */}
                  <Link to={`/home/services/${e.id}`} className={s.reservarAhora}><button className={s.btn}>Reservar Ahora</button></Link>
                </div>)
            })
          }
        </div>
        <div className={s.reviews}>
          <h3>Reviews</h3>
          {
            filterUser[0]?.reviews?.length === 0 ? <p>Sin reseñas por el momento</p>
            : filtrarReviews?.map(e => {
              return(
                <div key={e.id}>
                  <span><Rating defaultValue={e.rate} readOnly/> </span>
                  <p>{e.message}</p>
                </div>)
            })
          }
          <button className={filtrarReviews?.length === 0 ? s.btnHide : s.btn} onClick={handleOpen}>Ver mas</button>
          <Dialog open={btn}>
            <span onClick={handleOpen}><CloseIcon/></span>
            {
              filterUser[0]?.reviews?.map(e => {
                return(
                  <div key={e.id}>
                    <span><Rating defaultValue={e.rate} readOnly/> </span>
                    <p>{e.message}</p>
                  </div>)
              })
            }
          </Dialog>
        </div>
      </div>
      
    </div>)
}
