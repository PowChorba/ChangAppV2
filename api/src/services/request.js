const { Category, Services, Request, User } = require("../db");
const requestMail = require("./Emails/sendEmails");
const requestAceptadoMail = require("./Emails/sendEmails");
const requestRechazadoMail = require("./Emails/sendEmails");
const deleteRequestMail = require("./Emails/sendEmails");

const getRequest = async (req, res) => {
  try {
    return res.status(200).send(
      await Request.findAll({
        include: [
          {
            model: Services,
            as: "services",
            include: {
              model: Category,
              as: "category",
            },
          },
          {
            model: Services,
            as: "services",
            include: {
              model: User,
              as: "user",
            },
          },
          {
            model: User,
            as: "userRequester",
          },
        ],
      })
    );
  } catch (err) {
    return res.status(400).send(console.log(err.message));
  }
};

const postRequest = async (req, res) => {
  const { day, hours, service_id, requester_id, email } = req.body;
  try {
    await Request.create({
      state: "pendiente",
      day,
      hours,
      service_id,
      requester_id,
      email,
    });
    res.status(201).send("Request created");
  } catch (error) {
    res.status(404).send(error);
  }
  const asunto = "Solicitud de Servicio";
  const mensaje = "Tiene una nueva solicitud de servicio en ChangaApp";
  requestMail.email(email, asunto, mensaje);
};

const putRequest = async (req, res) => {
  const { state, id, email } = req.body;

  console.log(email);

  try {
    await Request.update(
      {
        state,
      },
      {
        where: {
          id,
        },
      },
      {
        email,
      }
    );
    if (state === "aceptado") {
      const asunto = "Novedades en su solicitud de servicio";
      const mensaje =
        "Su solicitud de servicio ha sido aceptada. Felicitaciones";
      requestAceptadoMail.email(email, asunto, mensaje);
    } else {
      const asunto = "Novedades en su solicitud de servicio";
      const mensaje = "Su solicitud de servicio ha sido rechazada";
      requestRechazadoMail.email(email, asunto, mensaje);
    }
    res.status(201).send("Request updated");
  } catch (error) {
    // console.log(error);
    res.status(404).send(error);
  }
};

const deleteRequest = async (req, res) => {
  const { id } = req.params;
  try {
    await Request.destroy({
      where: {
        id,
      },
    });
    res.send("Request deleted");
  } catch (error) {
    console.log(error);
  }
  const email = "pfhenrychangapp@gmail.com";
  const asunto = "Eliminacion de Solicitud";
  const mensaje = `Se ha eliminado la solicitud de servicio exitosamente`;
  deleteRequestMail.email(email, asunto, mensaje);
};

module.exports = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
