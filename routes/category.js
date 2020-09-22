const express = require("express");
const categoryRouter = express.Router();
const Category = require("../models/category");
const authenticate = require("../authenticate");



categoryRouter.route("/")
    .get((req, res, next) => {
        Category.findAll()
            .then((ctgs) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(ctgs)
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Category.create(req.body)
            .then((ctg) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(ctg);
            })
            .catch(err => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.send("put operation not allowed on /categories");
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 401;
        res.send("delete operation not allowed on /categories");
    })

categoryRouter.route("/:categoryId")
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Category.findByPk(req.params.categoryId)
            .then((cts) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(cts)
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.send(`post operation not allowed on /categories/${req.params.categoryId}`);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Category.update(req.body, { where: { id: req.params.categoryId } })
            .then((cts) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(cts);
            })
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Category.destroy({ where: { id: req.params.categoryId } })
            .then((result) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(result);
            })
            .catch(err => next(err));
    })


module.exports = categoryRouter;