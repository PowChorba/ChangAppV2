const { User, Reviews } = require("../db");
const reviewMail = require("./Emails/sendEmails");

const getReviews = async (req, res) => {
  try {
    return res.status(200).send(
      await Reviews.findAll({
        include: [
          {
            model: User,
            as: "user",
          },
          {
            model: User,
            as: "author",
          },
        ],
      })
    );
  } catch (err) {
    return res.status(400).send(console.log(err.message));
  }
};

const postReviews = async (req, res) => {
  const { message, rate, user_id, author_id, email } = req.body;
  try {
    let reviewCreated = await Reviews.create({
      message,
      rate,
      user_id: user_id,
      author_id: author_id,
      email: email,
    });
    console.log(reviewCreated);
    res.status(201).send("Review created");
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
  const asunto = "Nueva Reseña";
  const mensaje =
    "Tiene una nueva reseña y calificación de servicio en ChangaApp";
  reviewMail.email(email, asunto, mensaje);
};

const getUserReview = async (req, res) => {
  const { id } = req.params;
  try {
    const userReview = await Reviews.findAll({
      where: { user_id: id },
    });
    console.log(id);
    res.status(200).send(userReview);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getReviews,
  postReviews,
  getUserReview,
};
