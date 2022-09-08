import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../../redux/actions";
 


export default function RenderCard(){
    const services = useSelector(state => state.services)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllServices())
    }, [dispatch])

    
    return(
        <div>
            {
                services && services?.map(e => {
                    return(
                        <div key={e.id}>
                            <h4>{e.user?.firstName}</h4>
                       
                            <p>{e.description}</p>
                            <p>${e.price}</p>
                        </div>
                        )
                })
            }
        </div>)
}