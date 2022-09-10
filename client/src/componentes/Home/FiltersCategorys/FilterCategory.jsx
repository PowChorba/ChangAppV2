import React, { useEffect } from "react";
import Navbar from "../../PrivateRoute/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../../redux/actions";
import { NavLink, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormCategory from "./FormCategory/FormCategory";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import error from '../../../404.png'
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Footer from '../../Footer'
import s from './FilterCategory.module.css'


export default function FilterCategory() {
  const services = useSelector((state) => state.services);
  const dispatch = useDispatch();
  const param = useParams();
  const filterUsers = services.filter((e) => e.category?.name === param.name);

  //PAGINADO 
  const paginas = Math.ceil(filterUsers?.length / 4)
  const [pages, setPages] = useState(1)
  const [servicePerPage] = useState(4)
  const ultimo = pages * servicePerPage
  const primero = ultimo - servicePerPage
  const userSlice = filterUsers.slice(primero, ultimo)

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

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  
  if (!services)
    return (
      <div style={{backgroundColor: 'rgba(0, 0, 0, 0.644)'}}>
        <Navbar />
      <div style={{display:'flex' ,height: '80vh', alignItems:'center', justifyContent: 'center'}}>
        <CircularProgress />
      </div>
        <Footer/>
      </div>
    );
  else  
  return (
    <div>
      <Navbar />
      <div className={s.contenedor}>
      <div>
        <FormCategory />
      </div>
      <div className={s.containerSegundo}>
      
      <div className={s.contenedorTodo}>
      <Typography variant="h5">{param.name}</Typography>
      </div>
      {filterUsers.length === 0 ? (
        <div className={s.emptyContainer} >
            <Box>
                <Typography variant="h5" mb={5}>  
                    No se encuentra ningun servicio para esta categoria{" "}
                    <NavLink className={s.link} to="/home/createService">se el primero en postularte!</NavLink>
                </Typography>
            { 
              <img src={error} alt="?" width="182px" height="182px" />
            }
            </Box>
        </div>
      ) : (
        userSlice?.map((e) => {
          return (
            <div className={s.cardServices}
              key={e.id}
            >
              <div className={s.cardServicesUno}>
                <img src={e.user?.img} alt="No tiene" className={s.imagen}/>
              </div>
              <div className={s.cardServicesDos}>
                <h3>Servicio: {e.name}</h3>
                <h4>{e.user?.firstName}</h4>
                <p>{e.description}</p>
                <p>${e.price}</p>
                <Link to={`/home/services/${e.id}`}>
                  <button className={s.btn} >Haz tu reserva</button>
                </Link>
                <Link to={`/home/public/${e.user?.id}`}>
                  <button  className={s.btn} >Ver Perfil</button>
                </Link>
              </div>
            </div>
          );
        })
      )}
    <div className={filterUsers.length === 0 ? s.hide : s.noHide}>
      <button  className={s.btn} onClick={handleAnterior}>{'<'}</button>
      <span>{pages} de {paginas} </span>
      <button  className={s.btn} onClick={handleSiguiente}>{'>'}</button>
    </div>
    </div>
  </div>
  </div>
  );
}

