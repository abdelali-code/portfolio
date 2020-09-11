const express = require("express");
const projectRouter = express.Router();
const Project = require("../models/projects");
const { upload, addFileToReq } = require("../upload");




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
    .post(upload.single("image"), addFileToReq, (req, res, next) => {
        Project.create(req.body)
            .then((project) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(project);
            })
            .catch(err => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.send("put operation not allowed on /projects");
    })
    .delete((req, res, next) => {
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
    .post((req, res, next) => {
        res.statusCode = 403;
        res.send(`post operation not allowed on /projects/${req.params.projectId}`);
    })
    .put((req, res, next) => {
        Project.update(req.body, { where: { id: req.params.projectId } })
            .then((prs) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(prs);
            })
            .catch(err => next(err));
    })
    .delete((req, res, next) => {
        Project.destroy({ where: { id: req.params.projectId } })
            .then((result) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(result);
            })
            .catch(err => next(err));
    })


module.exports = projectRouter;