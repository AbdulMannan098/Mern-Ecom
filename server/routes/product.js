const express=require('express');
const router=express.Router();

// middlewares
const {authCheck,adminCheck}=require('../middlewares/auth')
// controller
const {create,listAll,remove,
    update,
    read,list,
    productsCount,
    productStar,
    listRelated,
    searchFilters
}=require('../controllers/product')

//routes
router.post("/product",authCheck,adminCheck,create)
router.get('/products/total',productsCount)
router.get("/products/:count",listAll)
router.delete("/product/:slug",authCheck,adminCheck,remove)
router.get("/product/:slug",read)
router.put("/product/:slug",authCheck,adminCheck,update)

router.post('/products',list)
router.get('/products/total',productsCount)
//rating
router.put("/product/star/:productId",authCheck,productStar)
// related
router.get('/product/related/:productId',listRelated)
module.exports=router;
//search
router.post('/search/filters',searchFilters)