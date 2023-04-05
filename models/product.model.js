const { model, Schema } = require('mongoose');
//formato de base de datos
const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    department: String,
    available: Boolean,
    stock: Number
});
//Crear de base de datos con nombre product y su formato 
module.exports = model('product', productSchema);