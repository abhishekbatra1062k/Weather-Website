const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=8ff76380ce293845930aeffee18fbba8&query='+ latitude +','+ longitude +'&units=m'
    request({url, json: true},(error,response)=>{
        if (error) {
            callback("Unable to connect to weather services :/", undefined);
          } else if (response.body.error) {
            callback("Unable to find location.", undefined);
          } else {
            callback(undefined, 
                `<center><b>${response.body.location.name}, ${response.body.location.region}, ${response.body.location.country}</b></center><br>
                <b>DATA:</b><br>Temperature is actually ${response.body.current.temperature}°C but feels like ${response.body.current.feelslike}°C !<br>
                <b>Precipitation:</b> ${response.body.current.precip} MM<br>
                <b>Wind:</b> ${response.body.current.wind_speed} Km/Hr ${response.body.current.wind_dir} <br>
                <center><img src=${response.body.current.weather_icons[0]} style="border-radius: 50%; border: 1px solid black;" alt="Weather-Icon" /><br><b>${response.body.current.weather_descriptions[0]}</b></center><br>
                Last Updated at ${response.body.current.observation_time}<br>`);
          }
    })
}


module.exports=forecast
