const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6886a9f04b471591c9cf232922ee7f1b/' +latitude+','+longitude

    request({url : url , json : true},(error, response) => {
        if(error){
            callback("Unable to reach the internet service",undefined)
        }
        else if(response.body.error){
            callback("Unable to find the location",undefined)
        }
        else{
            callback(undefined, response.body.daily.data[0].summary + " it is currently " + response.body.currently.temperature + " degrees out. There is a " + response.body.currently.precipProbability + "% chance of rain.")
        }
    })

}

module.exports = forecast