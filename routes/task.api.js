const express = require("express");
const taskController = require("../controller/task.controller");
const authController = require("../controller/auth.controller");
const router = express.Router();

// C
router.post("/", authController.authenticate, taskController.createTask);

// R
router.get("/", taskController.getTask);
router.get("/:id", taskController.getTaskById);

// U
router.put("/:id", taskController.updateTask);

// D
router.delete("/:id", taskController.deleteTask);

module.exports = router;
