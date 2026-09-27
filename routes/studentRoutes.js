const express = require("express");
const {
  getStudent,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
} = require("../controller/StudentControler.js");

const router = express.Router();

router.get("/", getStudent);
router.get("/:id", getStudentById);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;