/* Global Variables */
apiKey = '&appid=b6f852ead2d0a171564cc5524ff8bba1';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let userData = {}



// Adding event listener for the Generate button
const postData = async ()=>{
    // Setup api
    zipCode = document.getElementById('zip').value;
    baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
    const fullUrl = baseUrl + zipCode + apiKey

    //Posting data to server.js
    const res = await fetch(fullUrl,{
        method: 'GET',
        credentials: 'same-origin',
    });

    try{
        //Wait for response from api
        const tempJSON = await res.json();

        //Update server data
        if(tempJSON.cod == '200'){
            //Getting user input
            userInput = {
                'temperature': tempJSON.main.temp,
                'date': newDate,
                'feelings': document.getElementById('feelings').value,
            }

            const res1 = await fetch('/add',{
                method: 'POST',
                credentials : 'same-origin',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInput),
            });
            try {
                const tempStore = await res1
                // Update UI using /all
                const res2 = await fetch('/all',{
                    method: 'GET',
                    credentials: 'same-origin',
                });
                try {
                    console.log(res2)
                } catch(error){
                    console.log('error',error)
                }

            } catch (error){
                console.log('error',error)
            }
        }        
    } catch (error){
        console.log('error',error);
    }
}


const generateButton = document.getElementById('generate')
generateButton.addEventListener('click',postData)