const router = require("express").Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const foodCtrl = require("../controllers/foodcontroller");

router
  .route("/foods")
  .get(foodCtrl.getfoods)
  .post(auth, authAdmin, foodCtrl.createfood);

router
  .route("/foods/:id")
  .put(auth, authAdmin, foodCtrl.updatefood)
  .delete(auth, authAdmin, foodCtrl.deletefood);

module.exports = router;
