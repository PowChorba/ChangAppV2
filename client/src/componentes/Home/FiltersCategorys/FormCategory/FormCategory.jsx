import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { getAllCategories, getAllServices, sortServices } from "../../../../redux/actions";
import s from './FormCategory.module.css'

export default function FormCategory(){
    const categoryState = useSelector(state => state.categories)
    const dispatch = useDispatch()
    const [cat, setCat] = useState('')
    const [select, setSelect] = useState('')    
    const navigate = useNavigate()
    
    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(getAllServices())
    }, [dispatch])


    const handleOnClick = (e) => {
        if(cat === ''){
            setCat(e.target.value);
        }
        else if(cat !== e.target.value){
            document.getElementById(cat).checked = false;
            setCat(e.target.value);
        }
    }
    
    const handleOnSubmit = (e) => {
        e.preventDefault()
        if(cat === '') {
           return navigate(`/home/todos`)
        }
        navigate(`/home/${cat}`)
    }

    const handleSort = (e) => {
        setSelect(e.target.value);
        dispatch(sortServices(e.target.value));
      };
    
    return(
        <div className={s.formFilters}>
            <select className={s.select} name="precios" onChange={handleSort}>
                <option value="neutro">Ordenar por: </option>
                <option value="mayor">Mayor precio</option>
                <option value="menor">Menor precio</option>
            </select>
            <form onSubmit={e => handleOnSubmit(e)} className="filter-category" >
                <div 
                className={s.filterDivBox}
                >
                    <input id="todos" type="radio" value='todos' onChange={(e)=>handleOnClick(e)} className={s.input} />
                    <label>Todos</label>
                </div>
                {
                    categoryState.map(el => {
                        return(
                            <div key={el.id} className={s.filterDivBox}>
                                <input id={el.name} type="radio" value={el.name} name={el.name} onChange={(e)=>handleOnClick(e)} className={s.input} />
                                <label>{el.name}</label>
                            </div>
                        )
                    })
                }
                <div className={s.divBtn}>
                <button variant="contained" className={s.btn} type="submit">Filtrar</button>
                </div>
            </form>
        </div>)
}
