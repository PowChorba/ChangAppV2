import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import "./css/stripe.css";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import toast, { Toaster } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import {
  allRequest,
  getAllServices,
  postNotification,
  updateRequest,
} from "../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const publicUrl =
  "pk_test_51Lb2ZIKO72YUdcCNim89I44LXzpgG2vz57CjEn0ZAqmTZVW4D1o9y1ea5rzYeeH3dMFE4CAclOjOUqfc5NXncwMe00Zzkr0H1d";
const stripePromise = loadStripe(publicUrl);

const CheckoutForm = ({id}) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  let service = useSelector((state) => state.services);
  let request = useSelector((state) => state.allRequest);
  request = request.filter((p) => p.state === "aceptado");
  request = request.filter((p) => p.service_id === id);
  service = service.filter((p) => p.id === id);

  useEffect(() => {
    dispatch(allRequest());
    dispatch(getAllServices());
  }, [dispatch]);

  const [reque] = useState({
    state: "Pagado",
    id: "",
  });

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const email = service[0]?.user.email;
      const { id } = paymentMethod;
      await axios.post("/payment", {
        id,
        amount: request[0]?.services.price,
        email: email,
      });
      toast.success("Pago completado con exito! Redireccionando...");


      dispatch(updateRequest({ ...reque, id: request[0]?.id }));
      dispatch(
        postNotification({
          message: `Recibiste un pago por el servicio ${service[0]?.name}`,
          userNotification_id: request[0]?.requester_id,
          userNotificated_id: service[0]?.user_id,
        })
      );

      elements.getElement(CardElement).clear();
      setTimeout(() => {
        window.location.reload()
      }, 3000);
    }
  };

  return (
    <div className="container-flex">
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handlerSubmit} className="input">
        <img
          src="https://seeklogo.com/images/V/VISA-logo-62D5B26FE1-seeklogo.com.png"
          className="logo-card"
          alt="Not found"
        />
        <CardElement />
        <button className="proceed">
          <svg className="sendicon" width="24" height="24" viewBox="0 0 24 24">
            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
          </svg>
        </button>
        <h3>
          {<br />}Amount: ${service[0]?.price}
        </h3>
      </form>
    </div>
  );
};

export default function Stripe({id}) {
  let request = useSelector((state) => state.allRequest);
  let prueba = request.filter((p) => p.state === "aceptado");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(allRequest());
    dispatch(getAllServices());
  }, [dispatch]);

  prueba = prueba?.filter((p) => p.service_id === id);
  return (
    <div className="pay-container">
      {prueba[0]?.state !== "aceptado" ? (
        navigate("/settings/requester")
      ) : (
        <Elements stripe={stripePromise}>
          <CheckoutForm id={id} />
        </Elements>
      )}
    </div>
  );
}
