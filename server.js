// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
const server = app.listen(port, ()=>{console.log('server running'); console.log(`running on localhost: ${port}`);});

// Setup api 
apiKey = '&appid=b6f852ead2d0a171564cc5524ff8bba1';
zipCode = '';
baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';


//Setup a get url and function 
app.get('/all',(req, res)=>{
    console.log('alo');
    res.send(projectData);
});

// Setup a post request to add an entry to the array
app.post('/add',(req,res)=>{
    newEntry = {
        'temperature': req.body.temperature,
        'date': req.body.date,
        'feelings': req.body.feelings,
    }
    projectData.push(newEntry)
    console.log(projectData)
});



// Creating a fetch function
