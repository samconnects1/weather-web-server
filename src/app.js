const path = require('path')
const request = require('postman-request')
const express =require('express')
const hbs = require('hbs')
const app = express()
const geoCode =require('./geocode')
const forecast =require('./forecast')

//Absolute paths - Public and views folder
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsDir =path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')



//define the handlebars engine and views directory
app.set('view engine','hbs')
app.set('views',viewsDir )
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render("index",{
        title:'Weather App',
        name: 'Sam'
    })
})
app.get('/about',(req,res)=>{
    res.render("about",{
        name:'Sam',
        course:'NodeJS',
        title:"About Me"
    })
})
app.get('/help',(req,res)=>{
    res.render("help",{
        message:'Email me at samconnects@gmail.com',
        title:'Help',
        name:'Sam'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide a search term."
        })
    }
    geoCode(req.query.address, (error, {latitude,longitude,location} ={}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({error:error})
            }
           return  res.send({Location: location,
            Lat:latitude,long:longitude,forecast:forecastdata})

            // res.render("weather",{location:location,forecast:forecastdata,title:"Weather",name:"Sam"})

        })
    })
})

// const searchTerm = req.query.address
//     res.render("Weather",{location:req.query.address,forecast:20,title:"Weather",name:"Sam"})
//

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term."
        })
    }
    // console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render("notfoundpage",{
        message:"Help article not found",
        title:"Help",
        name:"Sam"
    })
})

app.get('*',(req,res)=>{
    res.render("notfoundpage",{
        message: "Page not found",
        title:"Unknown page",
        name:"Sam"
    })
})

// app.get('/help',(req,res) =>{
//     res.send('Help Page')
// })
//
// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1')
// })

app.listen(3001,() =>{
    console.log('Server running on port 3001')
})