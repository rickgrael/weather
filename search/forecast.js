const request=require('request');

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/454d145758ad94172f42c005424ffcff/'+latitude+','+longitude+'?units=si&lang=pt'
    
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Não foi possível conectar',undefined);
        }else if(response.body.daily.data[0]===undefined){
            callback('Não foi possível encontrar a localização especificada',undefined);
        }else{
            callback(undefined,{
                temp:response.body.currently.temperature,
                precipitation:response.body.currently.precipProbability,
                info:response.body.daily.data[0].summary
            })
        }
    })
}






module.exports=forecast;

