import express from "express";
import {parseGet} from "../middlewares/parse_get";
import {parsePost} from "../middlewares/parse_post";
import {parseDelete} from "../middlewares/parse_delete";
import bcrypt from 'bcrypt';
import {userFilter} from "../filters/user";

export const router = express.Router();
export const prefix = '/public';

const {publicStore} = require('../data/DataStore');
const saltRounds = 10;

router.get('/*', parseGet, function (req, res) {
  const result = req.handleGet(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});


/**
 * Given a name and pass, will create a user
 * if one with that name doesn't exist in the
 * database.
 */
router.post('/create', function (req, res) {
  if (!req.body.name || !req.body.pass) {
    res.status(401).send({msg: 'Expected a payload of name and pass.'});
    return;
  }

  const name = req.body.name.toLowerCase();
  const pass = req.body.pass;


  let user = publicStore.get(`users.${name}`);
  if (user) {
    res.status(401).send({msg: `User '${req.body.name}' is already a registered user.`});
    return;
  }

  bcrypt.hash(pass, saltRounds, (err, hash) => {
    publicStore.set(`users.${name}`, {
      passwordHash: hash,
      data: req.body.data
    });
    res.send({data: userFilter(publicStore.get(`users.${name}`)), status: 'Successfully made account'});
  });

});

router.delete('/*', parseDelete, function (req, res) {
  const result = req.handleDelete(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});
