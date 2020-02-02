const request = require('request')

const geocode = (address, callback) => {

    const geo_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmljaGlrZXQiLCJhIjoiY2s1aHNsNWppMDZrcTNvc2MxNjRlbWY3eiJ9.yhCvMQ6vu3-gG94a_z2RMw&limit=1'
    
    request({url : geo_url , json : true},(error,response) => {
        if (error){
            callback('Unable to connect to internet',undefined)
        }
        else if(response.body.features.length === 0){
            callback('Unable to get the correct location, please try some other location',undefined)
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode