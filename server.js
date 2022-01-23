//initializes express module
const express=require('express');

//links to Routes
const apiRoutes = require('./Routes/apiRoutes');
const htmlRoutes = require('./Routes/htmlRoutes');

//sets app as express and sets port
const app=express();
const PORT = process.env.PORT || 3001;


//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

//tells express to use listed folders
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


//listen on port 3001
app.listen(PORT, ()=>{
    console.log(`Note taking server now on port ${PORT}!`);
});