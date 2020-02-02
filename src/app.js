const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const app = express()

//Setup handlebars engines and view locations
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title :'Weather ',
        name : 'Nichiket Goyal'
    })
})


app.get('/about',(req,res) => {
    res.render('about',{
        title:'Robot',
        name : 'Nichiket Goyal'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help',
        msg: 'We are here to help',
        name : 'Nichiket Goyal'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({error:'You must provide an address'})
    }

    geocode(req.query.address, (error, geocode_data = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(geocode_data.latitude ,geocode_data.longitude, (error, forecast_data) => {

            if(error){
                return res.send({error })
            }

            res.send({location : geocode_data.location,
                forecast : forecast_data,
                address :req.query.address
            })
        })
    })

    // res.send({temprature: '27 degree',
    //     location :'kkp',
    //     address : req.query.address
    // })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error :'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products :[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title : '404',
        name: 'Nichiket Goyal',
        error : 'help article not found'
    })
})

app.get('/*',(req,res) => {
    res.render('404',{
        title : '404',
        name: 'Nichiket Goyal',
        error : 'Page not found'
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000')
})