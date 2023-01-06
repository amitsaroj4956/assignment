import express from "express";
// file upload

import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })



import { getAllusers, adduser, getSingleUser, updateSingleuser, removeSingleuser, } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllusers);
router.post("/", upload.single('profilePic'), adduser);
router.get("/:id", getSingleUser);
router.post("/edit/:id",upload.single('profilePic'), updateSingleuser);
router.delete("/:id", removeSingleuser);


export default router;
