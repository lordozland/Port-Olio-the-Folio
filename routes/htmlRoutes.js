const router = require('express').Router();
const Museums = require('../models/museums');
const Trails = require('../models/trails');
const Restaurants = require('../models/restaurant');
const Parks = require('../models/parks');

module.exports = (db) => {
  // Load register page
  // NOTES FROM KATELIN: this is connected to 'views/register.handlebars' and
  // 'controls/authControler' - bc there is a catch is the email is already in use.
  router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('register');
    }
  });

  // Load profile page
  // NOTES FROM KATELIN: Based on the profile.handlebars page is looks like this html route
  // gives us the profile page where a user can update their profile info (email, name, etc)
  // and that seems to be connected to the 'controllers/authControler' file where the
  // 'update user' is located
  // for the googleController like this ASK JOHN P ABOUT THIS!!
  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        // console.log(user);
        res.render('profile', user);
      });
    } else {
      res.redirect('/');
    }
  });

  // Load dashboard page
  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // Load dashboard page
  // NOTES FROM KATELIN: this looks like the page we could use to have the list of
  // the individual user's trips. Its connected to 'views/dashboard.handlebars'
  router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // Load example index page
  // NOTES FROM KATELIN: This looks like the page we could use to display a user's
  // individual trips maybe? So instead of 'db.Example.findALL' it could be 'db.Location'
  // connected to 'views/example.handlebars'
  router.get('/example', function (req, res) {
    if (req.isAuthenticated()) {
      db.Example.findAll({ where: { UserId: req.session.passport.user.id }, raw: true }).then(function (dbExamples) {
        res.render('example', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          msg: 'Welcome!',
          examples: dbExamples
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // router.get('/example', (req, res, next) => {
  //   if (req.isAuthenticated()) {
  //     const user = {
  //       user: req.session.passport.user,
  //       isloggedin: req.isAuthenticated()
  //     };
  //     res.render('example', { 
  //       user,
  //       msg: 'Here are some choices!',
  //       data: placeDataCollection
  //     });
  //   } else {
  //     res.redirect('/');
  //   }
  // });

  // Load example page and pass in an example by id
  // NOTES FROM KATELIN: here is the individual examples, so maybe the locations by id?
  // we could also take it further for when the user clicks on the museums, or parks, or
  // trails, or restaurants they's saved, then they are taken to that restaurant.id page
  // using this as a base model?
  // Connected to 'views/example-detail.handlebars'
  router.get('/example/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.Example.findOne({ where: { id: req.params.id }, raw: true }).then(function (dbExample) {
        res.render('example-detail', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          example: dbExample
        });
      });
    } else {
      res.redirect('/');
    }
  });
  // **PROB WANT TO CHANGE HTML ROUTE**
  // Should probably be '/user' bc most likely user page
  // ALSO NEED HANDLEBAR IT CONNECTS TO

  router.get('/location', function (req, res) {
    if (req.isAuthenticated()) {
      db.Location.findAll({ where: { UserId: req.session.passport.user.id },
        raw: true }).then(function (dbLocations) {
        res.render('location', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          msg: 'Welcome Back USER!',
          examples: dbLocations
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // AGAIN will prob need to change route depending on front end
  // ALSO NEED HANDLEBAR IT CONNECTS TO
  router.get('/location/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.Location.findOne({ where: { id: req.params.id,
        include: [Museums, Trails, Parks, Restaurants] },
      raw: true }).then(function (dbSingleLoc) {
        res.render('location-detail', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          example: dbSingleLoc
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Logout
  // NOTES FROM KATELIN: Looks like there IS NOT a handlebar for this yet. BUT at the
  // top of 'views/nav/nav-block.handlebars' there is a '/logout' option. We just need
  // to decide what our logout page looks like - does it ask if you want to be directed
  // to the login page?
  router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect('/');
    });
  });

  // Render 404 page for any unmatched routes
  // NOTES FROM KATELIN: This one is 'views/404.handlebars' and its our
  // straightforward 404 user error page! Maybe you guys could look up something
  // fun to put here? Maybe an api that changes to a diff NC picture everytime
  // it appears? Might be more work that we want but worth a thought :)
  router.get('*', function (req, res) {
    res.render('404');
  });

  return router;
};

// Change to "new" for the handlebars I am creating.

router.get('/NCDis', (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = {
      user: req.session.passport.user,
      isloggedin: req.isAuthenticated()
    };
    res.render('NCDis', user);
  } else {
    res.render('NCDis');
  }
});

router.get('/materialize', (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = {
      user: req.session.passport.user,
      isloggedin: req.isAuthenticated()
    };
    res.render('materialize', user);
  } else {
    res.render('materialize');
  }
});

router.get('/savedtrips', (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = {
      user: req.session.passport.user,
      isloggedin: req.isAuthenticated()
    };
    res.render('savedtrips', user);
  } else {
    res.render('savedtrips');
  }
});

router.get('/login', (req, res, next) => {
  res.render('loginpage');
});

router.get('/create', (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = {
      user: req.session.passport.user,
      isloggedin: req.isAuthenticated()
    };
    res.render('create', user);
  } else {
    res.render('create');
  }
});

router.get('/current', (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = {
      user: req.session.passport.user,
      isloggedin: req.isAuthenticated()
    };
    res.render('current', user);
  } else {
    res.render('current');
  }
});