const express = require('express');
const routes = require('./routes')
const exphbs = require('express-handlebars');

const app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/nav', (req, res) => {
    res.render('nav');
});
ç
app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});