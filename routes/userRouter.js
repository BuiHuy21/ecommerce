const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

router.post("/login", userCtrl.login);
router.post("/register", userCtrl.register);
router.get("/logout", userCtrl.logout);
router.get("/refresh_token", userCtrl.refreshToken);
router.get("/infor", auth, userCtrl.getUser);

router.patch("/addCart", auth, userCtrl.addCart);

module.exports = router;
