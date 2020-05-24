const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');

//initialization
const app = express();

//setting
app.set('port', process.env.port || 3000);
app.set('views', path.join(__dirname,'view'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs');


// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//routes
app.use(require('./routes'));
app.use("/links",require("./routes/links"));


//static
app.use(express.static(path.join(__dirname, 'public')));
//starting server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});