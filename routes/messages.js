const express = require("express");
const messageRouter = express.Router();
const Message = require("../models/messages");
const authenticate = require("../authenticate");


messageRouter.route("/")
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Message.findAll({ order: [['createdAt', 'DESC']] })
            .then((messages) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(messages)
            })
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        console.log(req.body);
        Message.create(req.body)
            .then((message) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(message);
            })
            .catch(err => next(err));
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.send("put operation not allowed on /messages");
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Message.destroy({ where: { id: req.body } })
            .then((result) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(result);
            })
            .catch(err => next(err));
    })

messageRouter.route("/:messageId")
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Message.findByPk(req.params.messageId)
            .then((message) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(message)
            })
            .catch(err => next(err));
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.send(`post operation not allowed on /messages/${req.params.messageId}`);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Message.update(req.body, { where: { id: req.params.messageId } })
            .then((msg) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(msg);
            })
            .catch(err => next(err));
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Message.destroy({ where: { id: req.params.messageId } })
            .then((result) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(result);
            })
            .catch(err => next(err));
    })


module.exports = messageRouter;