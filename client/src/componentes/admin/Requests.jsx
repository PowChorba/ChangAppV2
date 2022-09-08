import { style } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allRequest, deleteRequest } from "../../redux/actions";
import request from './Estilos/request'

export default function Request() {
  const allReq = useSelector((state) => state.allRequest);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allRequest());
  }, [dispatch]);

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteRequest(e.target.id))
        setTimeout(() => {
           window.location.reload() 
        }, 1000);
    }

    return(
        <div>
            <div style={request.titulo}>
                <h2>Solicitudes de Servicios</h2>
            </div>
            <div style={request.contenedorCard}>
                {
                    allReq?.length === 0 ? <div style={request.sinSolicitudes}><p>Por el momento no se realizaron solicitudes</p></div>
                    : allReq?.map(r => {
                        return(
                            <div key={r.id} style={request.card}>
                              <h5>En base al servicio: {r.services?.name}</h5>
                              <p>ID: {r.id}</p>
                              <p>Estado: {r.state}</p>
                                <p>Fecha de creacion: {r.createdAt}</p>
                                <p>Ultima actualizacion: {r.updatedAt}</p>
                                <button id={r.id} style={request.btn} onClick={handleDelete}>Borrar solicitud</button>    
                            </div>)
                    })
                }
            </div>
        </div>)
}

