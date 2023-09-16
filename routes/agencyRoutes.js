const express = require("express");
const {
  registerAgency,
  authAgency,

} = require("../controllers/agencyControllers");
const { protect } = require("../middleware/agencyMiddleware");

const router = express.Router();

// router.route("/").get(protect, allUsers);
router.route("/").post(registerAgency);
router.post("/login", authAgency);

module.exports = router;