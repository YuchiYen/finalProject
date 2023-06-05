// const router = require('express').Router();
// const { isAuthorized } = require('../middleware/auth');
// const { getItemById, createOrder, getAllByUserId, getAll, getOrderById } = require('../daos/order');

// router.post("/", isAuthorized, async (req, res, next) => {
//     try {
//         let total = 0;
//         const items = req.body

//         for (let i of items) {
//             let item = await getItemById(i);
//             if (!item)
//                 return res.status(400).send();
//             total += item.price;
//         }

//         const orderData = {
//             userId: req.userData._id,
//             items: items,
//             total: total
//         }

//         const createdOrder = await createOrder(orderData);
//         res.json(createdOrder);
//     } catch (e) {
//         next(e)
//     }
// });

// router.get("/", isAuthorized, async (req, res, next) => {
//     try {
//         const orders = req.userData.roles.includes('admin')
//         ? await getAll()
//         : await getAllByUserId(req.userData._id);

//         const ordersNew = orders.map((item) => {
//             const itemsNew = item.items.map((i) => i.toString());
//             return {
//                 items: itemsNew,
//                 userId: item.userId.toString(),
//                 total: item.total,
//             };
//         });

//         res.json(ordersNew);
//     } catch (e) {
//         next(e);
//     }
// });

// router.get("/:id", isAuthorized, async (req, res, next) => {
//     try {
//         const order = await getOrderById(req.params.id);

//         if (!order) 
//             return res.sendStatus(400);            
        
//         if (req.userData.roles.includes('admin') || req.userData._id === order.userId.toString()) 
//             return res.json(order);
        
//         res.sendStatus(404);
//     } catch (e) {
//         next(e);
//     }
// });

// module.exports = router;