// const Item = require('../models/item');

// module.exports.createItem = async (itemObj) => {
//     const item =  { title: itemObj.title, price: itemObj.price };    
//     const createdItem = await Item.create(item);    
//     return createdItem;
// }

// module.exports.getById = async (itemId) => {
//     const item = await Item.findOne({ _id: itemId }).lean();
//     return item;
// }

// module.exports.getAllItems = () => {
//     return Item.find().lean();
// }

// module.exports.updateItem = async (itemId, itemTitle, itemPrice) => {
//     const updatedItem = await Item.updateOne({ _id: itemId }, { title: itemTitle, price: itemPrice });
//     return updatedItem;
// }

