const express= require("express")
const UserController =require('../Controller/userController')
const ItemController =require('../Controller/ItemController')
const OrderController = require('../Controller/OrderController')
const OrderItemListController = require('../Controller/OrederListItemController')
const AllModelController = require('../Controller/AllModelController')
const ContactController = require('../Controller/ContactController')
const { ContractorUserCrete, ContractorUserLogin, getAllContractor, ContractorOrderData, CancelContractorOrder, getAllContractorById,
     SaveAndUpdateAllLists, SaveAndUpdateUtensilData, SaveAndUpdateExtraData, SaveAndUpdateCookData, OrderSendToAdminByContractor, 
     OrderAcceptByContractor,
     RequstForChangeByContractor,
     AcceptRequstForChangeByContractor} = require("../Controller/ContractorController")

const router= express.Router()

//const middleware= require("../middleware/middleware")

//const userController = require("../controllers/userController")
//const BooksController = require("../controllers/booksController")
//const ReviewController = require("../controllers/reviewController")

router.get("/", function(req,res){
    res.send("done")
})




router.post("/contact",ContactController.FormData)

router.post("/register",UserController.userCrete)

router.post("/login",UserController.UserLogin)

router.post("/DeleteUser",UserController.DeleteUserWithMobileNumber)

router.post("/rice",ItemController.RiceData)

router.get("/getUser",UserController.getAllUser)
router.get("/getOrder",OrderController.getAllOrder)

router.post("/getAllOrderWithSameNumber",OrderController.getAllOrderWithSameNumber)



router.post("/updateRequest",OrderController.requestForUpdateByNumber)

router.post("/PermissionRequest",OrderController.CheckPermission)

router.post("/grantRequest",OrderController.permissionGrant)

router.post("/getOrderByNumber",OrderController.getOrderByNumber)

router.post("/getOrderByNumberByContractor",OrderController.getOrderByNumberByContrract)



router.post("/OrderPrearedTrue",OrderController.requestForOderPreairedStatus)

router.post("/OrderCancel",OrderController.CancelOrderSumited)


router.post("/NotAcceptOrder",OrderController.NotAcceptOrderRequest)

router.post("/DeleteOrder",OrderController.DeleteOrderWithMobileNumber)

router.post("/DeleteOrderwithmobileAndId",OrderController.DeleteOrderWithMobileNumberAndId)


router.post("/OrderCancelPermmision",OrderController.PermissionForCancelOrber)



router.post("/OrderPrearedfalse",OrderController.requestForOderPreairedStatusFalse)

router.post("/permissionForNewOrder",OrderController.PermissionNewOrder)

router.get("/riceData",ItemController.AllRiceData)

router.post("/deleteAllfromServer",ItemController.AllDataDelete)


router.post("/order",OrderController.OrderData)

router.post("/extingorderUpdate",OrderController.OrderDataUpdateExtingId)




router.post("/orderListItem",OrderItemListController.OrderListItem)

router.post("/getOrderListItem",OrderItemListController.getOrderListFromOwner)


router.post("/emptyCart",AllModelController.DeleteAll)




router.put("/RiceListUpdate",OrderItemListController.RiceUpdateData)
router.put("/DallListUpdate",OrderItemListController.DallUpdateData)
router.put("/VegetableListUpdate",OrderItemListController.VegetableUpdateData)
router.put("/RotiListUpdate",OrderItemListController.RotiUpdateData)




router.post("/ContractorRegister",ContractorUserCrete)
router.post("/ContractorLogin",ContractorUserLogin)
router.get("/getAllContractor", getAllContractor)
router.post("/sendContractorOrder",ContractorOrderData)
router.post("/CancelContractorOrder",CancelContractorOrder)
router.post("/getAllContractorOrderById",getAllContractorById)
router.post("/SaveAndUpdateAllListByContractor",SaveAndUpdateAllLists)
router.post("/SaveAndUpdateUtensilsListByContractor",SaveAndUpdateUtensilData)
router.post("/SaveAndUpdateExtraListByContractor",SaveAndUpdateExtraData)
router.post("/SaveAndUpdateCookDataByContractor",SaveAndUpdateCookData)
router.post("/OrderSendToAdminByContractor",OrderSendToAdminByContractor)
router.post("/OrderAcceptByContractor",OrderAcceptByContractor)
router.post("/ReqestForChangeOrderByContractor",RequstForChangeByContractor)
router.post("/AcceptReqestForChangeOrderByContractor",AcceptRequstForChangeByContractor)



//router.post("/books",middleware.authenticate,BooksController.createBooks)
//router.get("/books",BooksController.getBooksData)
//router.get("/books/:bookId",middleware.authenticate,BooksController.getBooksDataWithReviews)

//router.put("/books/:bookId",middleware.authenticate,middleware.authorize,BooksController.updateBooksData)
//router.delete("/books/:bookId",middleware.authenticate,middleware.authorize,BooksController.deleteBooksData)
//router.post("/books/:bookId/review",ReviewController.createReview)
//router.put("/books/:bookId/review/:reviewId",ReviewController.updateReviews)
//router.delete("/books/:bookId/review/:reviewId",ReviewController.deleteReviews)




router.all("/*", function(req,res){
    res.status(400).send({message:"url is wrong"})
})


module.exports = router