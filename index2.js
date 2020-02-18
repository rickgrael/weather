const geocode=require('./search/geocode')
const forecast=require('./search/forecast')

if(process.argv[2]!=undefined){
  geocode(process.argv[2],(error,data)=>{
    if(error){
        return console.log(error);
    };
    let latitude= data.latitude;
    let longitude=data.longitude;
    let local=data.location;

    forecast(latitude,longitude,(error,data)=>{
        let temp=data.temp;
        let precip=data.precipitation;
        let info=data.info;
        console.log(local)
        console.log(`Atualmente fazem ${temp} na sua região. A possibilidade de chuva é de ${precip}%.
${info}`)
    })

})
  
}else{
    geocode('salvador',(error,data)=>{
        if(error){
            return console.log(error);
        };
        let latitude= data.latitude;
        let longitude=data.longitude;
        let local=data.location;
    
        forecast(latitude,longitude,(error,data)=>{
            let temp=data.temp;
            let precip=data.precipitation;
            let info=data.info;
            console.log(local)
            console.log(`Atualmente fazem ${temp} na sua região. A possibilidade de chuva é de ${precip}%.
            ${info}`)
        })
    
    })
}




