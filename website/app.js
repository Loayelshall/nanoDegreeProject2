
/* Global Variables */
const apiKey = '&appid=b6f852ead2d0a171564cc5524ff8bba1';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let userData = {}
let weatherNOW = {}

//event listener function
const buttonPressed = async ()=>{
    const weather = await fetchWeather(apiKey)
    try{
          //Getting user input
            let userInput = {
                'temperature': weather.main.temp,
                'date': newDate,
                'feelings': document.getElementById('feelings').value,
            }
            const urlAdd = "/add"
            const urlGet = "/all"
            
            postData(urlAdd,userInput)
            .then(updateUI(urlGet))
        
    } catch (error){
        console.log('error',error)
    }
   
}
// post data function
const postData = async (url,userInput)=>{
    

            const res = await fetch(url,{
                method: 'POST',
                credentials : 'same-origin',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInput),
            });
            try {
              console.log('Posted Successfully')
            } catch (error){
                console.log('error',error)
            }
}
//fetch weather from weatherapi
const fetchWeather = async (API_key)=>{
    // Setup api
    zipCode = document.getElementById('zip').value;
    baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
    const fullUrl = baseUrl + zipCode + API_key

    //Posting data to server.js
    const res = await fetch(fullUrl,{
        method: 'GET',
        credentials: 'same-origin',
    });
    try {
        const weather = await res.json();
        if(weather.cod == '200'){
            return weather;
        } else {
            console.log('error');
        }
    } catch (error) {
        console.log('error',error);
    }

    
} 
//update UI with the latest input
const updateUI = async (url)=>{
    const req = await fetch(url);
    try{
        const allData = await req.json()
        document.getElementById('date').innerHTML = allData[allData.length-1].date;
        document.getElementById('temp').innerHTML = allData[allData.length-1].temperature;
        document.getElementById('content').innerHTML = allData[allData.length-1].feelings;
    } catch(error){
        console.log('error',error);
    }
}
//assiging event listener to the button
const generateButton = document.getElementById('generate')
generateButton.addEventListener('click',buttonPressed)
