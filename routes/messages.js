import express from "express";
import {parseGet} from "../middlewares/parse_get";
import {parsePost} from "../middlewares/parse_post";
import {parseDelete} from "../middlewares/parse_delete";
import {authenticateUser} from "../middlewares/auth";

export const router = express.Router();
export const prefix = '/messages';

const {messagesStore} = require('../data/DataStore');

/**
 * Every request to this route needs
 * to be made from an authenticated user.
 */
router.use(authenticateUser);

router.get('/class', parseGet, function (req, res) {
  const result = req.handleGet(messagesStore);
  if (typeof result !== 'undefined') {
    res.send({
        user: id,
        class: classid,
        content: `class.${messages}`
    })
  }
});

router.post('/*', parsePost, function (req, res) {
  const result = req.handlePost(messagesStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});

router.delete('/*', parseDelete, function (req, res) {
  const result = req.handleDelete(messagesStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});
