const router = require('express').Router();

// router.get('/', (req, res) => {
//   res.render('main');
// });

router.get('/', async (req, res) => {
  res.render('all');
});

// router.get('/', (req, res) => {
//   if (req.isAuthenticated()) {
//     const user = {
//       user: req.session.passport.user,
//       isloggedin: req.isAuthenticated()
//     };
//     res.render('dashboard', user);
//   } else {
//     res.render('dashboard');
//   }
// });

router.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;
