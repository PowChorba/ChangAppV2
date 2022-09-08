import React, { useEffect } from "react";
import Navbar from "../../PrivateRoute/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../../redux/actions";
import { NavLink, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormCategory from "./FormCategory";
import "../../css/filter-services.css"
import '../../css/empty.css'
import "../../css/card-services.css"
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import error from '../../../404.png'
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Footer from '../../Footer'

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

  
  if (services.length === 0)
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
    <div className="service-container-full">
      <Navbar />
      
      <FormCategory />
      <div className="container-services">
      
      <div style={{ margin:"15px", color: '#fff'}}>
      <Typography variant="h5">{param.name}</Typography>
      </div>
      {filterUsers.length === 0 ? (
        <Box className="empty-container" sx={{textAlign: 'center', display: 'flex', flexDirection:'column', alignItems: 'center', maxWidth:'80%', position: 'relative', margin: '40px auto'  }} >
            <Box>
                <Typography variant="h5" mb={5}>  
                    No se encuentra ningun servicio para esta categoria{" "}
                    <NavLink className='linkk' to="/home/createService">se el primero en postularte!</NavLink>
                </Typography>
            { 
              <img src={error} alt="?" width="182px" height="182px" />
            }
            </Box>
        </Box>
      ) : (
        userSlice?.map((e) => {
          return (
            <div className="cards-services"
              key={e.id}
            >
              <img src={e.user?.img} alt="No tiene" width='64px' height="64px"/>
              <h3>Servicio: {e.name}</h3>
              <h4>{e.user?.firstName}</h4>
              <p>{e.description}</p>
              <p>${e.price}</p>
              <Link to={`/home/services/${e.id}`}>
                <Button variant="contained"  sx={{ backgroundColor: "#354152", margin: '5px' }} >Haz tu reserva</Button>
              </Link>
              <Link to={`/home/public/${e.user?.id}`}>
                <Button variant="contained"  sx={{ backgroundColor: "#354152" }} >Ver Perfil</Button>
              </Link>
            </div>
          );
        })
      )}
    </div>
    <div style={{textAlign: 'center'}}>
      <Button  variant="contained" sx={{ backgroundColor: "#354152", margin: '5px', color:'#fff' }} onClick={handleAnterior}>{'<'}</Button>
      <span style={{color: '#fff'}}>{pages} de {paginas}</span>
      <Button  variant="contained" sx={{ backgroundColor: "#354152", margin: '5px', color:'#fff' }} onClick={handleSiguiente}>{'>'}</Button>
    </div>
  </div>
  );
}
