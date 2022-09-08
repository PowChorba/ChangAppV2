const { Router } = require("express");

const {
  register,
  getUsers,
  updateUser,
  filterUser,
  bannState,
  userById,
  userLocation,
  adminState,
  deleteUsuario,

} = require("../services/user");
const {
  getServices,
  getServicebyId,
  postService,
  getByName,
  updateService,
  deleteService,
} = require("../services/service");
const { email } = require("../services/Emails/sendEmails");
const { getCategories, postCategorie, deleteCategory, searchCategory } = require("../services/category");
const { paymentMethod } = require("../services/payment");
const {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} = require("../services/request");

const {
  getReviews,
  postReviews,
  getUserReview,
} = require("../services/reviews");

const {
  getNotifications,
  postNotifications,
  deleteNotification,
} = require("../services/notifications");


// Importar todos los routers;

const router = Router();

//user routes
router.post("/user", register);
router.get("/user", getUsers);
router.put("/user/:email", updateUser);
router.get("/user/:email", filterUser);
router.put("/users/:id", bannState || adminState)
router.get("/users/:id", userById)
router.put('/userr/:id', adminState)
router.get("/user", userLocation);
router.delete('/user/:id', deleteUsuario)

//services routes
router.post("/services", postService);
router.get("/services", getServices);
router.get("/services/search", getByName);
router.get("/services/:id", getServicebyId);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

//category routes
router.get("/category", getCategories);
router.post("/category", postCategorie);
router.delete('/category/:id', deleteCategory)
router.get('/category/search', searchCategory)
//request routes
router.get("/request", getRequest);
router.post("/request", postRequest);
router.put("/request", putRequest);
router.delete("/request/:id", deleteRequest);

//payment routes
router.post("/payment", paymentMethod);

//review routes
router.get("/reviews", getReviews);
router.get("/reviews/user/:id", getUserReview);
router.post("/reviews", postReviews);

//sendEmail routes
router.post("/sendemail", email);

//notifications routes
router.get("/notifications", getNotifications);
router.post("/notifications", postNotifications);
router.delete("/notifications/:id", deleteNotification);

module.exports = router;
