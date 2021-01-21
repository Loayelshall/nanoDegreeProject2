/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let data = {}

// Getting input values
data = {
    'zip': document.getElementById('zip').value,
    'feelings': document.getElementById('feelings').value
}

// Adding event listener for the Generate button
const postData = async (url='/add',data)=>{

    const res = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try{
        //update UI

    } catch (error){
        console.log('error',error);
    }
}


const generateButton = document.getElementById('generate')
generateButton.addEventListener('click',postData)