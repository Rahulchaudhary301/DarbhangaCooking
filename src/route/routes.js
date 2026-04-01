const express= require("express")
const UserController =require('../Controller/userController')
const ItemController =require('../Controller/ItemController')
const OrderController = require('../Controller/OrderController')
const OrderItemListController = require('../Controller/OrederListItemController')
const AllModelController = require('../Controller/AllModelController')
const ContactController = require('../Controller/ContactController')
const upload = require("../middleware/upload");
const { ContractorUserCrete, ContractorUserLogin, getAllContractor, ContractorOrderData, CancelContractorOrder, getAllContractorById,
     SaveAndUpdateAllLists, SaveAndUpdateUtensilData, SaveAndUpdateExtraData, SaveAndUpdateCookData, OrderSendToAdminByContractor, 
     OrderAcceptByContractor,
     RequstForChangeByContractor,
     AcceptRequstForChangeByContractor,
     OrderSendToClinetByAdmin} = require("../Controller/ContractorController")
const { AddTeem, getAllCookTeamById } = require("../Controller/AddTeemController")
const { ContractorBillCrete, getBillById, unlockContractorCharge, unlockNewChargePermission, AdminConfirmAmountwithContractor, upsertAdminBilling, getAdminBilling } = require("../Controller/BillingController")

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

router.put("/SweetsListUpdate",OrderItemListController.SweetsUpdateData)
router.put("/NonVejListUpdate",OrderItemListController.NonVejUpdateData)
router.put("/BachkkaListUpdate",OrderItemListController.PakoraUpdateData)
router.put("/SaladListUpdate",OrderItemListController.SaladUpdateData)

router.put("/RaitaListUpdate",OrderItemListController.RaitaUpdateData)
router.put("/PapadChipsListUpdate",OrderItemListController.PapadChipsUpdateData)
router.put("/ChutneyPicklesListUpdate",OrderItemListController.ChutneyPicklesUpdateData)
router.put("/IceCreamListUpdate",OrderItemListController.IceCreamsUpdateData)

router.put("/ColdDrinksListUpdate",OrderItemListController.ColdDrinksUpdateData)
router.put("/HotDrinksListUpdate",OrderItemListController.HotDrinksUpdateData)
router.put("/IndianStaterListUpdate",OrderItemListController.IndianStaterUpdateData)
router.put("/ChinesstaterListUpdate",OrderItemListController.ChinesStaterUpdateData)






router.post("/ContractorRegister",  upload.single("profile"), ContractorUserCrete)
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
router.post("/OrderSendToClinetByAdmin",OrderSendToClinetByAdmin)
router.post("/billcreateByContractor", ContractorBillCrete)




router.post("/AddTeemData", upload.single("profile"), AddTeem)
router.post("/getAllTeam", getAllCookTeamById)



router.post("/getBillByAdmin", getBillById)
router.post("/unlockContractorChargeByAdmin", unlockContractorCharge)
router.post("/unlockNewChargePermissionByAdmin", unlockNewChargePermission)
router.post("/AdminConfirmAmountwithContractorByAdmin", AdminConfirmAmountwithContractor)

router.post("/admin-billing", upsertAdminBilling);
router.get("/admin-billing/:orderId", getAdminBilling);






router.all("/*", function(req,res){
    res.status(400).send({message:"url is wrong"})
})


module.exports = router