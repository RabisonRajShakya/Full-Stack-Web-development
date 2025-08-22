const express = require("express");
const { validateTokenMiddleware } = require("../middleware/AuthMiddleware");
const { getProfileController, updateProfileController } = require("../controller/profileController");
const upload = require("../middleware/UploadMiddleware"); // Import the upload middleware
const router = express.Router();

// GET profile
router.get("/", validateTokenMiddleware, getProfileController);

// UPDATE profile
router.put("/", validateTokenMiddleware, upload.single("avatar"), updateProfileController);
router.put("/profile/:id", validateTokenMiddleware, upload.single("avatar"), updateProfileController);
router.get(
    "/profile/:id",
    validateTokenMiddleware,
    getProfileController
);

// GET any profile by ID (admins can access other users)
// UPDATE any profile by ID (admins can update other users)
module.exports = router;
