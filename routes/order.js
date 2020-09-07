
const express = require('express')
const router = express.Router()


const orderModel = require('../model/order')

router.get('/', (req, res) => {

    orderModel
        .find()
        .then(docs => {
            res.json({
                message: 'You got those',
                count: docs.length,
                productInfo: docs.map(doc => {
                    return{
                        id: doc._id,
                        product: doc.product,
                        quality: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4444/order/' + doc._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})


router.get('/:productId', (req, res) => {

    orderModel
        .findById(req.params.productId)
        .then(doc => {
            res.json({
                message: 'you got this!!' + req.params.productId,
                productInfo: {
                    id: doc._id,
                    product: doc.product,
                    quantity: doc.quality,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4444/order'
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})


router.post('/', (req, res) => {

    const newOrder = new orderModel({
        product: req.body.productId,
        quantity: req.body.qty
    })

    newOrder
        .save()
        .then(doc => {
            res.json({
                message: 'Order saved',
                orderInfo: {
                    id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4444/order/' + doc._id,
                        url2: 'http://localhost:4444/order'
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })

})


router.patch('/:productId', (req, res) => {

    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }

    orderModel
        .findByIdAndUpdate(req.params.productId, {$set: updateOps})
        .then(() => {
            res.json({
                message: 'You chaneged' + req.params.productId,
                request: {
                    type: 'GET',
                    url: 'http://localhost:4444/order'
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

router.delete('/:productId', (req, res) => {

    orderModel
        .findByIdAndDelete(req.params.productId)
        .then(() => {
            res.json({
                message: 'You lose yours',
                request: {
                    type: 'GET',
                    url: 'http://localhost:4444/order'
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})



module.exports = router