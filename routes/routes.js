const router = require('express').Router();
const { dir } = require('console');
const path = require('path');
const { dirname } = require('path/posix');

router.get('/', async (req, res) => {
    res.sendFile(path.join(dirname_, '../views/layouts/main.hbs'))
})

module.exports = router;