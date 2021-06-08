const express = require('express');
const router = express.Router();

const { getStatuses, createStatus, deleteStatus, updateStatus } = require('../controllers/statuses');

router.route('/')
    .get(getStatuses)
    .post(createStatus)

router.route('/:id')
    .delete(deleteStatus)
    .patch(updateStatus)

module.exports = router