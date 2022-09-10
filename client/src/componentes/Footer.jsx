import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../redux/actions";
import { Link, NavLink } from "react-router-dom";
import emailjs from "emailjs-com";
import s from './Footer.module.css'


export default function Footer() {
  let category = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  category = category.slice(0, 4);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const form = useRef();

  const sendMail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_rk2klb4",
        "template_hlxsows",
        form.current,
        "zeuTKJmSq8Vw0WoI3"
      )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className={s.footer}>
      <div className={s.seccionFooterLista}>
        <ul>
          <p>Categorias</p>
          {category &&
            category.map((c) => {
              return (
                <Link key={c.id} to="/home/todos">
                  <div>
                    <li className={s.footerListaItem}>
                      <p>{c.name}</p>
                    </li>
                  </div>
                </Link>
              );
            })}
          <li className={s.footerListaItem}>
            <p>Otras</p>
          </li>
        </ul>
      </div>
      <div className={s.seccionFooterLista}>
        <ul className={s.footerLista}>
          <p>Legal</p>
          <li className={s.footerListaItem}>
            <p>Quienes Somos</p>
          </li>
          <li className={s.footerListaItem}>
            <p>Politica de Privacidad</p>
          </li>
          <li className={s.footerListaItem}>
            <p>Programa de Fidelidad</p>
          </li>
          <li className={s.footerListaItem}>
            <NavLink style={{ color: "white" }} to="/home/createService">
              <p>Anuncie Aqui</p>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* <div className={s.seccionFooterLista}>
        <ul className={s.footerLista}>
          <p>Desarrollado por</p>
          <li className={s.footerListaItem}>
            <a
              className={s.footerLinkedIn}
              href="https://www.linkedin.com/in/enrique-gomez-naar-fullstackdeveloper/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enrique Gomez Naar
            </a>
          </li>
          <li className={s.footerListaItem}>
            <a
              className={s.footerLinkedIn}
              href="https://www.linkedin.com/in/lucas-axel-hess/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lucas Hess
            </a>
          </li>
          <li className={s.footerListaItem}>
            <a
              className={s.footerLinkedIn}
              href="https://www.linkedin.com/in/juan-pablo-cuadrelli-full-stack-dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Juan Pablo Cuadrelli
            </a>
          </li>
          <li className={s.footerListaItem}>
            <a
              className={s.footerLinkedIn}
              href="https://www.linkedin.com/in/agop-chorbadjian-369767218/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Agop Chorbadjian
            </a>
          </li>
          <li className={s.footerListaItem}>
            <a
              className={s.footerLinkedIn}
              href="https://www.linkedin.com/in/claudio-amaya-fullstack/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Claudio Amaya
            </a>
          </li>
        </ul>
      </div> */}

      <form ref={form} onSubmit={sendMail} className={s.formulario}>
        <h3 className={s.formularioTitulo}>Contactanos</h3>
        <div className={s.formularioCampo}>
          <label>&nbsp;Nombre</label>
          <input name="name" type="text" className={s.formularioInput} />
        </div>
        <div className={s.formularioCampo}>
          <label className={s.formularioLabel}>&nbsp;Email</label>
          <input name="email" type="email" className={s.formularioInput} />
        </div>
        <div className={s.formularioCampo}>
          <label className={s.formularioLabel}>&nbsp;Asunto</label>
          <input name="subject" type="text" className={s.formularioInput} />
        </div>
        <div className={s.formularioCampo}>
          <label className={s.formularioLabel}>&nbsp;Escribe tu mensaje</label>
          <textarea name="message" className={s.formularioTextarea}></textarea>
        </div>
        <input
          type="submit"
          className={s.formularioBoton}
          value="Enviar Mensaje"
        />
      </form>
    </div>
  );
}
