const categoyCtrl = require("../controllers/categorycontroller");
const router = require("express").Router();
const authAdmin = require("../middleware/authAdmin");
const auth = require("../middleware/auth");

router
  .route("/category")
  .get(categoyCtrl.getCategory)
  .post(auth, authAdmin, categoyCtrl.createCategory);

router
  .route("/category/:id")
  .delete(auth, authAdmin, categoyCtrl.deleteCategory)
  .put(auth, authAdmin, categoyCtrl.updateCategory);

module.exports = router;
