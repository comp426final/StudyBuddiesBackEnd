import express from "express";
import {parseGet} from "../middlewares/parse_get";
import {parsePost} from "../middlewares/parse_post";
import {parseDelete} from "../middlewares/parse_delete";

export const router = express.Router();
export const prefix = '/public';

const {publicStore} = require('../data/DataStore');
const {accountStore} = require('../data/DataStore');

router.get('/checkUser', function (req, res) {
  console.log(res);
  const name = req.param.name.toLowerCase();
    let user = accountStore.get(`users.${name}`);
if (user) {
  res.status(401).send({msg: `User '${req.body.name}' is already a registered user.`});
  return;
} else {
  res.status(200).send({msg: `Valid new Username`});
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


