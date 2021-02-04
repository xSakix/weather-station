const form = document.querySelector('form');
const search = document.querySelector('input');

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = search.value;
    const messageOne = document.querySelector('#message-1');                
    const messageTwo = document.querySelector('#message-2');                
    messageOne.textContent = 'Loading....';
    
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = 'Error: '+data.error;
            }else{
                messageOne.textContent = 'Location:'+data.location;
                messageTwo.textContent = 'Forecast:'+data.forecast;
            }
        });
    });
});
