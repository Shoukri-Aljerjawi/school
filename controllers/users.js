const Users = require('../models/users');
var bcrypt = require('bcryptjs');

//Create a new user
exports.addUser = (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      var user = new Users({
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: Number(req.body.phoneNumber),
        password: hash,
        gender: req.body.gender,
        roler: req.body.roler,
      });
      user
        .save()
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(400).send(err);
          console.log(err);
        });
    });
  });
};

// login users
exports.loginUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  Users.findOne({ email: email }).then((user) => {
    if (!user) {
      console.log('user not found');
      res.send('error');
    }
    bcrypt
      .compare(password, user.password)
      .then((doMatch) => {
        if (doMatch) {
          res.status(200).send(user);
        } else {
          console.log('wrong password');
          res.status(400).send('wrong password');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

// fetch users as status and role required
exports.getUsers = (req, res) => {
  const status = req.params.status;
  const roler = req.params.roler;
  Users.find({ status: status, roler: roler })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

//found user by id and update the status
exports.updateUserByID = (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  Users.findOneAndUpdate({ _id: id }, { status: status }, function (
    error,
    result
  ) {
    if (error) {
      console.log(err);
    } else {
      res.send('');
    }
  });
};

exports.deleteUser = (req, res) => {
  const id = req.body.id;
  Users.findByIdAndDelete(id, (error, data) => {
    if (error) {
      console.log('error in deleting!');
      throw error;
    } else {
      console.log('user has been deleted', data);
      res.status(200);
    }
  });
};

//found user by id and update logout
exports.updateLastLogin = (req, res) => {
  const id = req.body.id;
  const lastLogin = req.body.lastLogin;
  Users.findOneAndUpdate({ _id: id }, { lastLogin: lastLogin }, function (
    error,
    result
  ) {
    if (error) {
      console.log(err);
    } else {
      res.send('');
    }
  });
};