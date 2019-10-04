  
let mongoose = require('mongoose')
//const mongo = require('mongodb').MongoClient;
//format = require('util').format;

//LocalPath of your db for server mention your usernm,pwd,key
 const url = 'mongodb://localhost:27017/stock';
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useUnifiedTopology: true
};
mongoose.connect(url, { 'useNewUrlParser': true })
mongoose.set('useCreateIndex', true);

 Stock = mongoose.model('Stock',new mongoose.Schema({
    symbol: {
        type: String,
        minlength:3,
        maxlength:6,
        required: true
    },
    open: {
        type: Number,
        required: true
    },
    last: {
        type: Number,
        required: true
    },
    change: {
        type: Number,
        required: true
    },
    high: {
        type: Number,
        required: true
    },
    low:{
        type: Number,
        required: true
    }
}));
   
        
function validatedata(post) {
    const schema = {
        symbol:Joi.string().min(3).max(6).required(),
        open: Joi.number().positive().required(),
        last: Joi.number().positive().required(),
        change:Joi.number().required(),
        low: Joi.number().positive().required(),
        high: Joi.number().positive().required()
    };
    return Joi.validate(post, schema);
}
exports.Stock=Stock;
exports.validatedata=validatedata;
module.exports = mongoose.model('Stock')