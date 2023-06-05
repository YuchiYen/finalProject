// const router = require('express').Router();
// const { isAuthorized, isAdmin } = require('../middleware/auth');
// const { createItem, getById, getAllItems, updateItem } = require('../daos/item');

// router.post("/", isAuthorized, isAdmin, async (req, res, next) => {
//     try {
//         const createdItem = await createItem({ title: req.body.title, price: req.body.price })
//         return res.status(200).json(createdItem);
//     } catch (e) {
//         next(e)
//     }
// });

// router.put("/:id", isAuthorized, isAdmin, async (req, res, next) => {
//     try {
//         const { title, price } = req.body;
//         const updatedItem = await updateItem(req.params.id, title, price)
//         return res.status(200).json(updatedItem)
//     } catch (e) {
//         next(e)
//     }
// });

// router.get("/:id", isAuthorized, async (req, res, next) => {
//     try {
//         const item = await getById(req.params.id);
//         return res.json(item);
//     } catch (e) {
//         next(e);
//     }
// });

// router.get("/", isAuthorized, async (req, res, next) => {
//     try {
//         const items = await getAllItems();
//         return res.json(items);
//     } catch (e) {
//         next(e);
//     }
// });

// module.exports = router;