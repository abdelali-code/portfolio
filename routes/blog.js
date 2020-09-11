const express = require("express");
const blogtRouter = express.Router();
const Blog = require("../models/blog");
const User = require("../models/users");

blogtRouter.route("/")
    .get((req, res, next) => {
        Blog.findAll()
            .then((blogs) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(blogs)
            })
            .catch(err => next(err));
    })
    // don't forget to change this later
    .post((req, res, next) => {
        User.findByPk(1)
            .then((user) => {
                req.body.UserId = user.id;
                Blog.create(req.body)
                    .then((blog) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(blog)
                    }).catch(err => next(err))
            }).catch(err => next(err))
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.send("put operation not allowed on /articles");
    })
    .delete((req, res, next) => {
        Blog.destroy({ truncate: true })
            .then((result) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(result);
            })
            .catch(err => next(err));
    })

blogtRouter.route("/:articleId")
    .get((req, res, next) => {
        Blog.findByPk(req.params.articleId)
            .then((blog) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(blog)
            })
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.send(`post operation not allowed on /articles/${req.params.articleId}`);
    })
    .put((req, res, next) => {
        Blog.update(req.body, { where: { id: req.params.articleId } })
            .then((plg) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(plg);
            })
            .catch(err => next(err));
    })
    .delete((req, res, next) => {
        Blog.destroy({ where: { id: req.params.articleId } })
            .then((result) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(result);
            })
            .catch(err => next(err));
    })


module.exports = blogtRouter;