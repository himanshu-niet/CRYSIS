const express = require("express");
const {
  registerUser,
  authUser,
  requestUser,
  getActiveRequestUser,
  getHistoryRequestUser,
  getUser,

} = require("../controllers/userControllers");
const { protect } = require("../middleware/userAuthMiddleware");

const router = express.Router();

router.route("/get").get(protect,getUser);
router.route("/history").get(protect, getHistoryRequestUser);
router.route("/active").get(protect, getActiveRequestUser);
router.route("/help").post(protect, requestUser);
router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;