const express = require('express')
const app = express()
app.use(express.json())

app.get('/' , (req,res) => {
    res.send('usage /weather/(place to search)')
})


const weatherRouter = require('./modules/weather')

app.use('/weather' , weatherRouter)


app.listen(process.env.PORT || 5000)