const request = require('postman-request');


const forecast = (latitude, longitude, callback) => {
    console.log(latitude, longitude);
    const url = `http://api.weatherstack.com/current?access_key=${process.env.FORECAST_KEY}&query=${latitude}, ${longitude}&units=m`;

    request({url, json:true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to conenct to weather service:'+error);
        }else{
            if(body.current){
                const current = body.current;
                const data =`${current.weather_descriptions[0]}.
                Current temperature is ${current.temperature} Celsius, and it feels like ${current.feelslike} Celsius.
                The precipitation for rain is ${current.precip} mm. 
                Current wind speed is ${current.wind_speed} m/s and wind is blowing unded ${current.wind_degree} degrees from ${current.wind_dir}.
                Current pressure is ${current.pressure} hPa`;
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