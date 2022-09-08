import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./css/review.css";
import { useDispatch, useSelector } from "react-redux";
import {
  allRequest,
  deleteRequest,
  getAllServices,
  getUserEmail,
  postNotification,
  postReview,
} from "../redux/actions";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/authContext";

export default function Review({id}) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [rev, setRev] = useState("");
  const [btn, setBtn] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userData = useSelector((state) => state.filter);
  let service = useSelector((state) => state.services);
  service = service.filter((p) => p.id === id);
  let request = useSelector((state) => state.allRequest);
  request = request.filter((p) => p.state === "Pagado");
  request = request.filter((p) => p.service_id === id);

  //PARA MANDAR NOTIFICACION
  const [noti] = useState({
    message: `Te han dejado una reseña por tu servicio ${service[0]?.name}`,
    userNotification_id: "",
    userNotificated_id: "",
  });

  useEffect(() => {
    dispatch(getUserEmail(user?.email));
    dispatch(getAllServices());
    dispatch(allRequest());
    if(rev && rating ){
      setBtn(false)
    }else{
      setBtn(true)
    }
  }, [dispatch, user?.email, rev,rating]);

  const postRevieew = async (e) => {
    e.preventDefault();
    dispatch(
      postReview({
        message: rev,
        rate: rating,
        author_id: userData[0]?.id,
        user_id: service[0]?.user_id,
        email: service[0]?.user.email,
      })
    );
    dispatch(
      postNotification({
        ...noti,
        userNotification_id: request[0]?.requester_id,
        userNotificated_id: service[0]?.user_id,
      })
    );
    dispatch(deleteRequest(request[0]?.id));
    setRev("");
    toast.success("Gracias por dejar su reseña");
    setTimeout(() => {
      navigate("/home");
    }, 1000);

  };

  function handleInput(e) {
    e.preventDefault();
    const value = e.target.value;
    const value2 = value.charAt(0).toUpperCase() + value.slice(1);
    setRev(value2);
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {/* <Navbar /> */}
      {request.length === 0 ? (
        <p>Ya realizaste una review del servicio, no puedes realizar mas</p>
      ) : (
        <div className="reviews">
          <h3>
            Reseña: 
          </h3>
            <textarea value={rev} onChange={(e) => handleInput(e)}  className='textareaReview' cols='30' rows='4'/>
          <div className="solo">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
              <div className="stars">
                <label>
                  <input
                    className="input-review"
                    type="radio"
                    name="rate"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <FaStar
                    className="star"
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    size={50}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                  </label>
              </div>
            );
          })}
          </div>
          <button onClick={postRevieew} className='btnReview' disabled={btn}>Publicar</button>
        </div>
      )}

      {/* <Footer /> */}
    </div>
  );
}
