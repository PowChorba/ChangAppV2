const { Category, Services, Request, User } = require("../db");
const { Op } = require("sequelize");
const serviceMail = require("./Emails/sendEmails");
const deleteServiceMail = require("./Emails/sendEmails");
const updateServiceMail = require("./Emails/sendEmails");

const getServices = async (req, res) => {
  const { category } = req.query;
  try {
    const services = await Services.findAll({
      include: [
        {
          model: Category,
          as: "category",
        },
        {
          model: User,
          as: "user",
        },
        {
          model: Request,
          as: "request",
          include: {
            model: User,
            as: "userRequester",
          },
        },
      ],
    });
    category
      ? res
          .status(200)
          .send(services.filter((el) => el.categories[0].name === category))
      : res.status(200).send(services);
  } catch (e) {
    return res.status(400).send(console.log(e.message));
  }
};

const getServicebyId = async (req, res) => {
  const { id } = req.params;
  try {
    const services = await Services.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Category,
          as: "category",
        },
        {
          model: User,
          as: "user",
        },
      ],
    });

    return res.status(200).send(services);
  } catch (e) {
    return console.log(e);
  }
};

const postService = async (req, res) => {
  const { name, description, price, day, hours, category_id, user_id, email } =
    req.body;

  let serviceCreated = await Services.create({
    name,
    description,
    price,
    day,
    hours,
    user_id: user_id,
    category_id: category_id,
    email,
  });
  console.log(serviceCreated);
  res.send("Service Created");
  const asunto = "Creacion de Servicio";
  const mensaje =
    "Su servicio se ha creado exitosamente en ChangaApp. Felicitaciones.";
  serviceMail.email(email, asunto, mensaje);
};

const getByName = async (req, res) => {
  try {
    const { name } = req.query;
    const response = await Services.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: {
        model: Category,
        as: "category",
      },
    });
    res.send(response);
  } catch (error) {
    res.status(500).end();
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      name,
      description,
      price,
      day,
      hours,
      user_id,
      category_id,
      email,
    } = req.body;
    await Services.update(
      {
        name,
        description,
        price,
        day,
        hours,
        user_id: user_id,
        category_id: category_id,
        email,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(201).send("Service Updated");
    const asunto = "Modificacion de Servicio";
    const mensaje =
      "Su servicio se ha modificado exitosamente en ChangaApp. Felicitaciones.";
    updateServiceMail.email(email, asunto, mensaje);
  } catch (error) {
    console.log(error);
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await Services.destroy({
      where: {
        id,
      },
    });
    res.status(201).send("Service deleted");
  } catch (error) {
    res.status(404).send(error);
  }
  const email = "pfhenrychangapp@gmail.com";
  const asunto = "Eliminacion de Servicio";
  const mensaje = `Se ha eliminado el servicio exitosamente`;
  deleteServiceMail.email(email, asunto, mensaje);
};

module.exports = {
  getServices,
  getServicebyId,
  getByName,
  postService,
  updateService,
  deleteService,
};
