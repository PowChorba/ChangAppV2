import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices, deleteService } from "../../redux/actions";
import { Link } from "react-router-dom";
import service from './Estilos/service'

export default function Services() {
    const services = useSelector(state => state.services)
    const dispatch = useDispatch()
   
    useEffect(() => {
        dispatch(getAllServices())
    }, [dispatch])

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteService(e.target.id))
        window.location.reload() 
    }

  //Paginado para los servicios
  const paginas = Math.ceil(services.length / 4)
  const [pages, setPages] = useState(1)
  const [requestPerPage] = useState(4)
  const ultima = pages * requestPerPage
  const primera = ultima - requestPerPage
  const serviceSlice = services.slice(primera, ultima)

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


  return( 
    <div>
        <div style={service.titulo}>
            <h2>Servicios creados por los Usuarios</h2>
        </div>
        <div style={service.contenedorCard}>
        {
            services?.length === 0 ? <div style={service.sinSolicitudes}><p>Por el momento no se encuntran servicios creados</p></div>
            : serviceSlice?.map(s => {
                return(
                    <div key={s.id} style={service.card}>
                        <p>ID: {s.id}</p>
                        <h4>Nombre del Servicio: {s.name}</h4>
                        <p>Precio: ${s.price}</p>
                        <p>Dias disponibles: {s.day}</p>
                        <p>Horas disponibles: {s.hours}</p>
                        <h5>Creado por: <Link style={service.link} to={`/admin/users/${s.user?.id}`}>{s.user?.firstName} {s.user?.lastName}</Link></h5>
                        <button id={s.id} style={service.btn} onClick={handleDelete}>Borrar Servicio</button>
                        
                    </div>)
            })
        }
        </div>
        <div style={service.paginadoDiv}>
          <button style={service.btnPaginado} onClick={handleAnterior}>{'<'}</button>
          {''} {pages} de {paginas} {''}
          <button style={service.btnPaginado} onClick={handleSiguiente}>{'>'}</button>
        </div>
    </div>)
}
