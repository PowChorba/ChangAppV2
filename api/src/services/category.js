const { Category } = require("../db");
const { Op } = require("sequelize");
const createCategoryMail = require("./Emails/sendEmails");
const deleteCategoryMail = require("./Emails/sendEmails");

const getCategories = async (req, res) => {
  try {
    let categories = await Category.findAll();
    return res.status(200).send(categories);
  } catch (err) {
    return res.status(400).send(console.log(err.message));
  }
};

const postCategorie = async (req, res) => {
  try {
    const { name, img } = req.body;
    Category.create({
      name,
      img,
    });

    res.status(201).send("Category created");
    const email = "pfhenrychangapp@gmail.com";
    const asunto = "Creacion de Categoria";
    const mensaje = `Se ha creado la categoria ${name} exitosamente`;
    createCategoryMail.email(email, asunto, mensaje);
  } catch (error) {
    res.status(404).send(error);
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await Category.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Category deleted");
  } catch (error) {
    res.status(404).send(error);
  }
  const email = "pfhenrychangapp@gmail.com";
  const asunto = "Eliminacion de Categoria";
  const mensaje = `Se ha eliminado la categoria exitosamente`;
  deleteCategoryMail.email(email, asunto, mensaje);
};

const searchCategory = async (req, res) => {
  try {
    const { name } = req.query;
    const response = await Category.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    res.send(response);
  } catch (error) {
    console.log(error)
  }
};


module.exports = {
  getCategories,
  postCategorie,
  deleteCategory,
  searchCategory
};
