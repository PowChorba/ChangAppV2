const { Category, Services, User, Reviews, Request, Notification } = require("../db");
const registerMail = require("./Emails/sendEmails");
const bannedMail = require("./Emails/sendEmails");
const desbannedMail = require("./Emails/sendEmails");

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    birthDate,
    email,
    description,
    img,
    offerer,
    admin,
    banned,
    location,
  } = req.body;

  try {
    const users = await User.findAll({
      include: {
        model: Services,
        as: "services",
        include: {
          model: Category,
          as: "category",
        },
      },
    });
    if (!firstName || !lastName || !birthDate || !email)
      return res.send("Los datos ingresados estan incompletos");
    const filterEmail = users.filter((e) => e.email === email);
    if (filterEmail[0]) {
      return res.send("El email ya se encuentra registrado");
    } else {
      const newUser = await User.create({
        firstName,
        lastName,
        birthDate,
        email,
        img,
        description,
        location,
        offerer,
        admin,
        banned,
      });
      res.status(201).send(newUser);
    }
  } catch (error) {
    return res.status(400).send(console.log(error.message));
  }
  const asunto = "Registro Usuario";
  const mensaje =
    "Bienvenido a ChangaApp. Su usuario ha sido registrado exitosamente";
  registerMail.email(email, asunto, mensaje);
};

const getUsers = async (req, res) => {
  const users = await User.findAll({
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
          model: Request,
          as: "request",
        },
      },
      {
        model: Reviews,
        as: "reviews",
      },
    ],
  });

  return res.status(200).send(users);
};

const updateUser = async (req, res) => {
  const {
    firstName,
    lastName,
    birthDate,
    img,
    description,
    location,
    admin,
    banned,
  } = req.body;

  const { email } = req.params;

  await User.update(
    {
      firstName,
      lastName,
      birthDate,
      email,
      img,
      description,
      location,
      admin,
      banned,
    },
    {
      where: {
        email,
      },
    }
  );

  return res.status(201).send("User updated");
};

const filterUser = async (req, res) => {
  const { email } = req.params;
  if (email) {
    const users = await User.findAll({
      include: [{
        model: Services,
        as: "services",
        include: [{
          model: Category,
          as: "category",
        },
        {
          model: Request,
          as: "request",
        }]
      },
      {
        model: Request,
        as: 'requester'
      },
      {
        model: Reviews,
        as: 'reviews'
      },
      ],
    });
    const filterEmail = users.filter((e) => e.email === email);
    if (filterEmail) {
      return res.send(filterEmail);
    } else {
      return res.send("Email not found");
    }
  }
};

const userById = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const user = await User.findAll({
        // include: {
        //   model: Services,
        //   as: "services",
        //   include: {
        //     model: Category,
        //     as: "category",
        //   },
        // },
        where: {
          id,
        },
      });
      if (user) {
        return res.json(user);
      }
    } catch (error) {
      return res.send("No se encontro el usuario solicitado");
    }
  }
};

const userLocation = async (req, res) => {
  const { location } = req.params;
  const userLocation = await User.findAll({
    include: {
      model: Services,
      as: "services",
      include: {
        model: Category,
        as: "category",
      },
    },
  });
  const filterLocation = userLocation.filter((e) => e.location === location);
  if (filterLocation) {
    return res.send(filterLocation);
  } else {
    return res.send("Location not found");
  }
};

const bannState = async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      const { banned, email } = req.body;
      console.log(banned);
      const user = await User.update(
        {
          banned: banned,
        },
        {
          where: {
            id,
          },
        },
        {
          email: email,
        }
      );
      if (banned === true) {
        const asunto = "Usuario baneado";
        const mensaje =
          "Su usuario ha sido baneado de ChangaApp, por favor comuniquese con soporte para ver su situacion";
        bannedMail.email(email, asunto, mensaje);
      } else {
        const asunto = "Usuario desbaneado";
        const mensaje = "Su usuario ha sido desbaneado de ChangaApp.";
        desbannedMail.email(email, asunto, mensaje);
      }
      res.status(201).send(user);
      console.log(banned, "BANNED");
    } catch (error) {
      res.status(404).send("inbloqueable bro 😎");
    }
  }
};

const adminState = async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      const { admin } = req.body;
      console.log(admin);
      const user = await User.update(
        {
          admin: admin,
        },
        {
          where: {
            id,
          },
        }
      );
      return res.status(201).send(user);
    } catch (error) {
      res.status(404).send("inbloqueable bro 😎");
    }
  }
};

const deleteUsuario = async (req,res) => {
  try {
    const {id} = req.params
    await User.destroy({
      where:{
        id
      }
    })
    res.send('borrado pa')
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  register,
  getUsers,
  updateUser,
  filterUser,
  bannState,
  userById,
  userLocation,
  deleteUsuario,
  adminState,
};
