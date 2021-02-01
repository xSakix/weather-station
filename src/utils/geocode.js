const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieHNha2l4IiwiYSI6ImNra2JhOGtxNTA4NWIydm9hamhyOTVsd3YifQ._PHT8gKBtVLpwTEpgnlCNA&limit=1`;

    request({url, json:true}, (err, {body} = {})=>{
        if(err){
            callback('Unable to connect to Geo location API:'+err);
        }else{
            if(body.message){
                console.error('Geolocation API error: '+body.message);
            }
            else if(body.features && body.features.length === 1){
                callback(undefined,{
                    location: body.features[0].place_name, 
                    latitude: body.features[0].center[1], 
                    longitude: body.features[0].center[0]
                });
            }else{
                callback('Requested geo location not found.');
            }
        }
    });
};

module.exports = geocode;