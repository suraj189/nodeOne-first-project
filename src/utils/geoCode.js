

const request=require('request')

const geoCode=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/ ${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3VyYWoyMDIxIiwiYSI6ImNrb2VjdXh0dDA5Zzgybm5xbDYzYml2ejQifQ.ZxAiuuXYF-c0CJhp-eBYnQ`
     request({url,json:true},(error,response)=>{
       const {body}=response
      if (error) {
          callback('Unable to connect to the location services',undefined)
        } else if (body.features.length===0) {
          callback('Unable to find location,Try another location',undefined)
        } else {
          callback(undefined,{
            lattitude:body.features[0].geometry.coordinates[0],
            longitude:body.features[0].geometry.coordinates[1],
            location:body.features[0].place_name
          })
      
        }
  })
}
 
module.exports=geoCode
  