const router = require('express').Router();

const {
  findUsers, findUserById, createUser, patchUser, patchUserAvatar,
} = require('../controllers/users');

router.get('/users', findUsers);

router.get('/users/:userId', findUserById);

router.post('/users', createUser);

router.patch('/users/me', patchUser);

router.patch('/users/me/avatar', patchUserAvatar);

module.exports = router;
