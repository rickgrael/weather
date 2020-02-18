const path= require('path')
const express=require('express');
const app=express();
const hbs=require('hbs');
const bodyparser=require('body-parser');
const request=require('request');

const geocode=require('../search/geocode');
const forecast=require('../search/forecast');

app.set('view engine','hbs');
app.use(express.static('public'));
hbs.registerPartials('views/partials')
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Emma Stone',
        title:'about my page'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Ricardo O gomes',
        title:'articles to help you in my page'
    })
})

app.get('',(req,res)=>{
            res.render('index',{
                name:'Ricardo O Gomes',
                title:'Clima 24h'
        })

})

app.get('/weather',(req,res)=>{
    res.send({
        forecast:'está nevando',
        location: 'Alagoinhas',
        name:'Ricardo O Gomes'
    });
});

app.get('/weather_data',(req,res)=>{
    let nome=req.query.adress;

    geocode(nome,(error,data)=>{
        if(error){
            res.send('nada encontrado');
        }
            let latitude= data.latitude;
            let longitude=data.longitude;
            let local=data.location;
        forecast(latitude,longitude,(error,data)=>{
            if(error){
                res.send('não foi possível encontrar uma correspondência para a cidade informada')
            }
            let temp=data.temp;
            let precip=data.precipitation;
            let info=data.info;
            res.send({
                temp,
                precip,
                info,
                local
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        name:'Ricardo O gomes',
        title:'articles to help you in my page',
        errorMsg:'The article in help category could not be found, go to help index to search a new article.'
    })
})

app.get('/*',(req,res)=>{
    res.render('error',{
        name:'Ricardo O gomes',
        title:'articles to help you in my page',
        errorMsg:'we cannot find any correspodency to the url typed. Please go to home'
    })
})


app.listen(8080,()=>{
    console.log('servidor rodando')
});