
const express = require('express')
const morgan = require('morgan')
const BP = require('body-parser')
const mongoose = require('mongoose')
const app = express()


const dbAdress = "mongodb+srv://bangnany:4275@cluster0.2a5z8.mongodb.net/Test_3?retryWrites=true&w=majority"
const dbOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose
    .connect(dbAdress, dbOption)
    .then(() => console.log("Mongo DB connected.."))
    .catch(err => console.log(err))



const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')





app.use(morgan('dev'))
app.use(BP.json())
app.use(BP.urlencoded({ extended: false }))




app.use('/product', productRoute)
app.use('/order', orderRoute)



const port = 4444

app.listen(port, console.log('server started'))

