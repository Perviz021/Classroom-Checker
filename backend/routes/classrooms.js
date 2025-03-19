import express from "express";
import {
  testClassroomAPI,
  getClassrooms,
  getClassroomById,
  updateClassroom,
} from "../controllers/classroomController.js";

const router = express.Router();

router.get("/test", testClassroomAPI);
router.get("/", getClassrooms);
router.get("/:id", getClassroomById);
router.put("/:id", updateClassroom);

export default router;
