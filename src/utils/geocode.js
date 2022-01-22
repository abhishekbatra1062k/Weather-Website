const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWJoaWJhdHJhMzciLCJhIjoiY2tudTk0dDZzMGFxcTJ3bmozb3E2dm5hZyJ9.EtXK52-uulLTtVoOpWrKkQ&limit=1'
    request({url, json: true},(error,{body: data})=>{
        if(error){
            callback('Unale To Connect To Location Services!',undefined)
        }else if(data.features.length===0){
            callback('Unable To Find Location, Try Another Search!',undefined)
        }else{
            callback(undefined,{
                Latitude: data.features[0].center[1],
                Longitude: data.features[0].center[0],
                Location: data.features[0].place_name
            })
        }
    })
}

module.exports=geocode
