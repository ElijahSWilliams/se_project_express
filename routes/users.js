const router = require("express").Router(); //import express and express router

router.get("/", () => console.log("GETTING USERS")); //no '/users' because routes are cumulative; default '/users' route is in index.js
router.get("/:userId", () => console.log("GETTING USERS BY ID"));
router.post("/", () => console.log("POSTING"));

module.exports = router;
