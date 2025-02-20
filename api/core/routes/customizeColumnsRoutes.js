const express = require("express");
const { getColumns, saveColumns } = require("../controllers/customizeColumnsController");

const router = express.Router();

router.get("/", getColumns);
router.post("/", saveColumns);

module.exports = router;