let StockModel = require('../models/stock.model')
let express = require('express')
let router = express.Router();
const {Stock,validatedata}= require('../models/stock.model')

router.post('/stock', async(req, res) => {
//const { error } = validatedata(req.body);
if (error) {
    return res.status(400).send(error.details[0].message);
}



    let stock = await Stock.findOne({ symbol: req.body.symbol});
    if (stock) {
        return res.status(400).send('symbol is already exisit!');
    } else {
        // Insert the new user if they do not exist yet
        stock = new Stock({
            symbol: req.body.symbol,
            open:req.body.open,
            last:req.body.last,
            change:req.body.change,
            high:req.body.high,
            low:req.body.low     
        });
        await stock.save();
        res.send(stock);
    }
});


router.get('/stock', (req, res) => {
    
    // res.status(200).send('Get Request hit...').json();
    // Stock.find({}).then(data =>{
    //     res.json(data)
    // })
     console.log('product list');
})


router.get('/stock',async(req,res)=>{
    Stock.find({}).then(data =>{
        res.json(data);
        console.log('product list');
    })
})

module.exports = router