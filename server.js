// const express = require('express');
// const exphbs = require('express-handlebars');


// const app = express();

// app.engine('hbs', exphbs({
//     defaultLayout: 'main',
//     extname: '.hbs'
// }));

// app.set('view engine', 'hbs');

// app.get('/', (req, res) => {
//     res.render('home');
// });

// app.get('/nav', (req, res) => {
//     res.render('nav');
// });

// app.listen(3000, () => {
//     console.log('The web server has started on port 3000');
// });

// This was working earlier, trying 45:24 of class hbs ^^^  https://stackabuse.com/guide-to-handlebars-templating-engine-for-node

const express = require('express');
const path = require('path');

// I cannot npm path ^^^

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./config/connection'));

//

// app.engine('hbs', exphbs({
//     defaultLayout: 'main',
//     extname: '.hbs'
// }));

// my server crashes in this blocked section ^^^

app.listen(PORT, () => {
    console.log('Server is listening')
});