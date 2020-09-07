
const express = require('express')
const router = express.Router()


const productModel = require('../model/product')

// 전체제품 불러오기
router.get('/', (req, res) => {

    productModel
        .find()
        .then(docs => {
            res.json({
                message: 'Successfully get a date',
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4444/product/' + doc._id
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

//지정제품 불러오기
router.get('/:productId', (req, res) => {


    productModel
        .findById(req.params.productId)
        .then(doc => {
            res.json({
                message: 'Successfully get product at ' + req.params.productId,
                productInfo: {
                    id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4444/product'
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.massage
            })
        })
})

// 제품등록 api
router.post('/', (req, res) => {


    const newProduct = new productModel ({
        name: req.body.productname,
        price: req.body.productprice
    })

    newProduct
        .save()
        .then(doc => {
            res.json({
                message: 'saved product',
                productIngo: {
                    id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4444/product',
                        url2: 'http://localhost:4444/product' + doc._id
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

//제품지우기
router.delete('/:productId', (req, res) => {

    productModel
        .findByIdAndDelete(req.params.productId)
        .then(() => {
            res.json({
                message: 'Complete deleted',
                request: {
                    url: 'http://localhost:4444/product'
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

    productModel
        .findByIdAndUpdate(req.params.productId, {$set: updateOps})
        .then(() => {
            res.json({
                message: 'Updated product at ' + req.params.productId
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })

})





module.exports = router