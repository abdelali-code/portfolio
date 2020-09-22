const express = require("express");
const projectRouter = express.Router();
const Project = require("../models/projects");
const { upload, addFileToReq } = require("../upload");
let authenticate = require("../authenticate");


projectRouter.options('*', (req, res) => {
    res.sendStatus(200);
})

projectRouter.route("/")
    .get((req, res, next) => {
        Project.findAll()
            .then((projects) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(projects)
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single("image"), addFileToReq, (req, res, next) => {
        console.log(req.body);
        console.log(req.headers);
        console.log(req.user.admin);
        Project.create(req.body)
            .then((project) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(project);
            })
            .catch(err => {
                next(err)
            });
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.send("put operation not allowed on /projects");
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Project.destroy({ truncate: true })
            .then((result) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(result);
            })
            .catch(err => next(err));
    })

projectRouter.route("/:projectId")
    .get((req, res, next) => {
        Project.findByPk(req.params.projectId)
            .then((project) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(project)
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.send(`post operation not allowed on /projects/${req.params.projectId}`);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, upload.single("image"), addFileToReq, (req, res, next) => {
        Project.update(req.body, { where: { id: req.params.projectId } })
            .then((prs) => {
                if (prs[0] >= 1) {
                    Project.findByPk(req.params.projectId)
                        .then((pr) => {
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(pr);
                        }).catch(err => next(err))
                }
                // send some message to user to tell him the project does not updated
            })
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        console.log(req.body)
        console.log(req.headers.authorisation);
        Project.destroy({ where: { id: req.params.projectId } })
            .then((result) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(result);
            })
            .catch(err => next(err));
    })


module.exports = projectRouter;