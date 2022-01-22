const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

const port=process.env.PORT || 3000

// // Define paths for Express Config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewDirectoryPath=path.join(__dirname,'../templates/views')
const partialDirectoryPath=path.join(__dirname,'../templates/partials')

// // Setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewDirectoryPath)
hbs.registerPartials(partialDirectoryPath)

// // Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Abhishek Batra'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Abhishek Batra'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name: 'Abhishek Batra',
        title: 'Help Page',
        message: 'Mention Your Issue!'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address,(error,{Latitude: lat,Longitude: lon,Location: loc}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(lat,lon,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                Location: loc,
                Forecast: forecastdata,
                Address: req.query.address
            })
        }) 
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Abhishek Batra',
        errorText: 'Help Article Not Found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Abhishek Batra',
        errorText: 'Page Not Found!'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})