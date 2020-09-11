const express = require("express");
const messageRouter = express.Router();
const Message = require("../models/messages");
const authenticate = require("../authenticate");

messageRouter.route("/")
    .get((req, res, next) => {
        Message.findAll()
            .then((messages) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(messages)
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Message.create(req.body)
            .then((message) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(message);
            })
            .catch(err => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.send("put operation not allowed on /messages");
    })
    .delete((req, res, next) => {
        Message.destroy({ truncate: true })
            .then((result) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(result);
            })
            .catch(err => next(err));
    })

messageRouter.route("/:messageId")
    .get((req, res, next) => {
        Message.findByPk(req.params.messageId)
            .then((message) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(message)
            })
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.send(`post operation not allowed on /messages/${req.params.messageId}`);
    })
    .put((req, res, next) => {
        Message.update(req.body, { where: { id: req.params.messageId } })
            .then((msg) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(msg);
            })
            .catch(err => next(err));
    })
    .delete((req, res, next) => {
        Message.destroy({ where: { id: req.params.messageId } })
            .then((result) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(result);
            })
            .catch(err => next(err));
    })


module.exports = messageRouter;