const request=require('request')

const forecast=(longitude,lattitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=609e18bf584355a14eb18c7a5c3acd81&query=${longitude,lattitude}`
    request({url,json:true},(error,response)=>{
        const {body}=response
        if(error){
            callback("Unable to connect to the weather service",undefined)
        }else if(body.error){
            callback("Unable to connect to the weather service",undefined)

        } else {
            callback(undefined, `There is ${body.current.temperature} degree out. IT feels like ${body.current.feelslike} degree out.`)
        }
    })

}

module.exports=forecast