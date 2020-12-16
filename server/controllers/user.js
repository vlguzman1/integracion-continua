'use strict';

const fs = require('fs');
const path = require('path');

const bcrypt = require('bcrypt-nodejs');
const moment = require('moment');

const User = require('../models/user');

const jwt = require('../services/jwt');

const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');

function createUser(req, res) {
  let user = new User();
  let params = req.body;

  let dispatchSave = () => {
    user.name = !params.name ? '' :  params.name;
    user.email = !params.email ? '' :  params.email;
    user.created_at = moment().format('DD/MM/YYYY');
    user.last_login = '';

    bcrypt.hash(params.password, null, null, (err, hash) => {
      if (err) {
        res.status(500).send({
          message: '[ERROR] - Generating hash of the password'
        })
      } else {
        user.password = hash;
        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({
              message: '[ERROR] - Saving the user'
            })
          } else {
            res.status(200).send({
              message: 'Usuario registrado con exito.',
              user: userStored
            })
          }
        })
      }
    })
  }

  let validatorEmail = () => {
    User.findOne({ email: params.email.toLowerCase() }, (err, userFound) => {
      if (err) {
        res.status(500).send({
          message: 'Checking if the user is already registered'
        })
      } else {
        if (!userFound) {
          dispatchSave();
        } else {
          res.status(500).send({
            message: 'El Email ya que se encuentra registrado.'
          })
        }
      }
    })
  }

  if (!params || !params.email || !params.password) {
    res.status(500).send({
      message: 'Los campos requeridos son: name, email, password. Validar la información enviada'
    })
  } else {
    validatorEmail();
  }
}

function recoveryPassword(req, res) {
  const data = req.params.email;
  User.findOne({ email: data }, (err, userFound) => {
    if (err) {
      res.status(500).send({
        message: 'Error encontrando el usuario.'
      })
    } else {
      if (!userFound) {
        res.status(500).send({
          message: 'No hay usuarios registrados con ese email.'
        })
      } else {
        console.log(data)
        let messageEmail = {
          to: `<${data}>`,
          subject: 'Recuperación de tu contraseña',
          template: 'recovery-password',
          context: {
            link: `${process.env.IPPROD}/recuperar-contrasena?user=${userFound._id}`,
          },
        }

        const EmailRecovery = {};
        EmailRecovery.transporter = nodemailer.createTransport(
            {
                service: 'Gmail',
                auth: {
                  user: process.env.EMAIL_APPLICATION,
                  pass: process.env.PASSWORD_EMAIL_APPLICATION
                },
            }
        );
        EmailRecovery.transporter.use('compile', hbs({
          viewEngine: {
            extName: '.hbs',
            partialsDir: path.join(__dirname, '../views/templates-email'),
            layoutsDir: path.join(__dirname, '../views/templates-email'),
            defaultLayout: 'recovery-password.hbs',
          },
          extName: '.hbs',
          viewPath: path.join(__dirname, '../views/templates-email')
        }));
        EmailRecovery.transporter.sendMail(messageEmail, (error, info) => {
          if (error) {
            console.log(error);
            res.status(500).send({
              message: '[ERROR] Sending email user to recovery password'
            })

            return;
          }

          EmailRecovery.transporter.close();
          res.status(200).send({
            message: 'Se ha enviado un email con las instrucciones para recuperar tu contraseña.',
          })
        })
      }
    }
  })
}

function login(req, res) {
  const params = req.body;
  const email = params.email;
  const password = params.password;

  function validatorPassword (password, userToValidate) {
    bcrypt.compare(password, userToValidate.password, (err, check) => {
      if (err) {
        res.status(500).send({
          message: 'La contraseña es incorrecta.',
          error: err
        })
      } else {
        if (check) {
          res.status(200).send({
            message: 'Login correcto.'
          })
        }
      }
    })
  }

  function validatorEmail () {
    User.findOne({ email: params.email.toLowerCase() }, '+password', (err, userFound) => {
      if (err) {
        res.status(500).send({
          message: 'Hubo un error en la comprobación del usuario.'
        })
      } else {
        validatorPassword(password, userFound);
      }
    })
  }

  if (!email || email == '' && !password || password == '') {
    res.status(500).send({
      message: 'Los campos email y contraseña son requeridos.'
    })
  } else {
    validatorEmail();
  }
}

function getAll(req, res) {
  User.find({}, function (err, users) {
    if (err) {
      res.status(500).send({
        message: '[ERROR] - No se encontraron usuarios registrados'
      })
    } else {
      res.status(200).send({
        users: users
      })
    }
  })
}

module.exports = {
  createUser,
  recoveryPassword,
  login,
  getAll
}