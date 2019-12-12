import express from "express";
import {parseGet} from "../middlewares/parse_get";
import {parsePost} from "../middlewares/parse_post";
import {parseDelete} from "../middlewares/parse_delete";

export const router = express.Router();
export const prefix = '/public';

const {publicStore} = require('../data/DataStore');


router.post("/checkClass", function(req, res) {
  const name = req.body.name.toLowerCase();
  let user = publicStore.get(`classes.${name}`);
  if (user) {
    res
      .status(222)
      .send({ msg: `Class '${req.body.name}' is already a registered class.` });
    return;
  } else {
    res.status(200).send({ msg: `Valid new Class` });
  }
});


router.get('/*', parseGet, function (req, res) {
  const result = req.handleGet(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});

router.post('/*', parsePost, function (req, res) {
  const result = req.handlePost(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});

router.delete('/*', parseDelete, function (req, res) {
  const result = req.handleDelete(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});




