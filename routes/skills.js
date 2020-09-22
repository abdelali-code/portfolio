const express = require("express");
const skillsRouter = express.Router();
const Skills = require("../models/skills");
const { upload, addFileToReq } = require("../upload");
let authenticate = require("../authenticate");


skillsRouter.options('*', (req, res) => {
    res.sendStatus(200);
})

skillsRouter.route("/")
    .get((req, res, next) => {
        Skills.findAll()
            .then((Skills) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(Skills)
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single("image"), addFileToReq, (req, res, next) => {
        console.log(req.body);
        console.log(req.headers);
        console.log(req.user.admin);
        Skills.create(req.body)
            .then((Skill) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(Skill);
            })
            .catch(err => {
                next(err)
            });
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.send("put operation not allowed on /Skills");
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Skills.destroy({ truncate: true })
            .then((result) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(result);
            })
            .catch(err => next(err));
    })

module.exports = skillsRouter;