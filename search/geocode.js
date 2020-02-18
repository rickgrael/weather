const request=require('request');

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicmljYXJkb2dyYWVsIiwiYSI6ImNrNnFtcmc5djF5bWUzbGw5NHc2dGQ3M2IifQ.Ya-GyLV2M4xXfbhajA7-iw'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Não foi possível conectar',undefined)
        }else if(response.body.features[0]===undefined){
            callback('Não foi possível encontrar um local com a referência passada.',undefined)
        }else{
            callback(undefined,{
                longitude: response.body.features[0].center[0],
                latitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode