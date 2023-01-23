require('dotenv').config();

const path = require('path');
const express = require('express');

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
const config = {
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    helpers,
};
const hbs = exphbs.create(config);

const app = express();
const PORT = process.env.PORT || 3005;

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Router
app.use(routes);

//required for Express Handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});


