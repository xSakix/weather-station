const request = require('postman-request');


const forecast = (latitude, longitude, callback) => {
    console.log(latitude, longitude);
    const url = `http://api.weatherstack.com/current?access_key=51f15d69f339b93e9dfc9acda8d99fd4&query=${latitude}, ${longitude}&units=m`;

    request({url, json:true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to conenct to weather service:'+error);
        }else{
            if(body.current){
                const current = body.current;
                const data =`${current.weather_descriptions[0]}. Current temperature is ${current.temperature} Celsius, but it feels like ${current.feelslike} Celsius. The precipoty for rain is ${current.precip} mm.`;
                callback(undefined,data);
            }else{
                const errorCode = body.error.code;
                const errorMessage = body.error.info;
                callback(`Error: ${errorCode} : ${errorMessage}`);
            }
        }
    });

};

module.exports = forecast;