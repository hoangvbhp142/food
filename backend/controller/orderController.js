import orderModel from "../models/OrderModel.js";
import userModel from "../models/UserModel.js";

const placeOrder = async (req, res) => {

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

        res.json({success: true, message: "Success"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;
    try {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true, message: "Paid"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Not paid"});
        }
    }
    catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

const userOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success: true, data: orders});    
    }
    catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, data: orders});    
    }
    catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success: true, message: "Updated"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}
export {placeOrder, verifyOrder, userOrder, listOrders, updateStatus}