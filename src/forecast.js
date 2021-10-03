const request = require('postman-request')
const forecast = (lat,long,callback) => {
    const forecasturl = 'http://api.weatherstack.com/current?access_key=24ff47a268ba02ab5d542e8a323fdae6&query='+lat+","+long
    request({url:forecasturl, json:true},(error, {body}) =>{
        if(error){
            callback(error,undefined)
            console.log('Unable to reach forecast services. Check network'+error)
        }
        else if(body.error){
            callback(error,undefined)
            console.log('Something went wrong with the query. Try another search!')
        }
        else{
            callback(undefined, 'The current temperature is '+body.current.temperature+'. There is a '+body.current.precip+ '% chance of rain at ' +body.location.name+
            '\nThe humidity is '+ body.current.humidity +'\n. The current wind speed is ' + body.current.wind_speed+'.')


            }
        })
    }
module.exports = forecast

