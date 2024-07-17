const express=require("express");
const mongoose=require("mongoose");
const app=express();
const cookieParser=require("cookie-parser");
const PORT=process.env.PORT || 5000;
require('dotenv').config();
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors=require("cors");
const bcrypt=require("bcryptjs");
const url=process.env.mongostring;
const BASE_URL= 'https://fooddel-frontend-2uzz.onrender.com'
  

app.use(express.json());
app.use(cors({
    origin: "https://fooddel-frontend-2uzz.onrender.com",
    credentials: true
  }));

app.use(cookieParser());

const connection=async()=>{
    try{
        await mongoose.connect(url);
        console.log("Mongodb is successfully connected");
    }catch(err){
        console.log(err);
    }
}

connection();

const UserRegister=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

const FoodRegister=mongoose.model("FoodRegister",UserRegister);

const cartitems=new mongoose.Schema({
    email:String,
    status:String,
    name:String,
    price:Number,
    count:Number,
    description:String,
    display:Boolean,
})

const CartItems=mongoose.model("CartItems",cartitems);

const confirmorder=new mongoose.Schema({
    email:String,
    name:String,
    price:Number,
    display:Boolean,
    count:Number,
})

const ConfirmOrder=mongoose.model("ConfirmOrder",confirmorder);


app.get("/placeorder",(req,res)=>{
    res.json({redirectto:"/placeorder"});
    console.log("this is placeorder");
})

app.get("/",(req,res)=>{
    const usercookie=req.cookies.fooddata?JSON.parse(req.cookies.fooddata):null;
    console.log("usercookie:",usercookie);
    res.json({redirectto:"/",cookiedata:usercookie});
    console.log("this is home page");
})

app.get("/yourorders",async(req,res)=>{
    console.log("Inside your order");
    const usercookie=req.cookies.fooddata?JSON.parse(req.cookies.fooddata):null;
    const email=usercookie.email;
    console.log("previous order deleted");
    const confirmfind=await ConfirmOrder.find({
        email,
    })
    console.log(confirmfind);
    res.json({redirectto:"/yourorders",message:confirmfind});
})


app.get('/cart',async(req,res)=>{
    const usercookie=req.cookies.fooddata?JSON.parse(req.cookies.fooddata):null;
    const email=usercookie.email;
    console.log(email);
    const found=await CartItems.find({
        email: email,
    })
    console.log(found);
    res.json({redirectto:"/cart"});
})


app.post("/cart",async(req,res)=>{
    const {status,name}=req.body;
    if(status===false){
        const deleted= await CartItems.deleteOne({
            name,
        })
        console.log("deleted item:",deleted);
    }
})

app.post("/fooditems",async(req,res)=>{
    const {email,status,name,price,description}=req.body;
    if(status===true){

         found = await CartItems.findOne({
            name:name,
        })
        console.log(found);
        if(found===null){
            await CartItems.create({
                name,
                status,
                email,
                count:1,
                price,
                description,
                display:false
            })
        }
        else{
            const foodcount=found.count + 1;
            await CartItems.updateOne({
                name:name,
            },{
                $set:{count:foodcount}
            })
            console.log(foodcount);
        }
    }

    if(status===false){
        found = await CartItems.findOne({
            name:name,
        })
        
        const foodcount=found.count - 1;
        if(foodcount===0){
            const deleted= await CartItems.deleteOne({
                name,
            })
        }
        else{
            await CartItems.updateOne({
                name:name,
            },{
                $set:{count:foodcount}
            })
            console.log(foodcount);
        }
    }
    
res.status(200).json({ message: "Cart updated successfully" });
})
app.post("/logout", (req,res)=>{
    res.clearCookie('fooddata',{
      path:"/login",
       httpOnly:true,
        secure:true,
        sameSite:"None",
    });
    res.json({redirectto:'/'});
    console.log("logout page");
})

app.post("/placeorder",async (req,res)=>{
    const usercookie=req.cookies.fooddata?JSON.parse(req.cookies.fooddata):null;
    const email=usercookie.email;
    const userorder=await CartItems.find({
        email:email,
    })

    userorder.map(async (food)=>{
        const insert=await ConfirmOrder.create({
            email:email,
            name:food.name,
            price:food.price,
            count:food.count,
            display:true,
        })
    })
    const deleted=await CartItems.deleteMany({
        email:email,
    })
    
    const lineItems = userorder.map((order)=>({
        price_data: {
            currency: 'usd',
            product_data: {
                name: order.name,
            },
            unit_amount: (order.price * 100 ),
        },
        quantity: order.count,
    }))

    const deliveryCharge = {
        price_data: {
            currency: 'usd',
            product_data: {
                name: 'Delivery Charge',
            },
            unit_amount: 200,
        },
        quantity: 1,
    };
    lineItems.push(deliveryCharge);

    console.log("order page");
    const session=await stripe.checkout.sessions.create({
        mode:'payment',
        line_items: lineItems,
        success_url:`${BASE_URL}/yourorders`,
        cancel_url:`${BASE_URL}/cart`,
    })
    console.log(session);
    res.json({redirectto:session.url});
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
   console.log(email);
   const user=await FoodRegister.findOne({
    email,
   })
   console.log(user.password);
   if(user &&  await bcrypt.compare(password,user.password)){
    res.cookie('fooddata',JSON.stringify(user),
        {
            maxAge:3*24*60*1000,
            httpOnly:true,
            secure:true,
            sameSite:"None",
        })
        res.json({redirectto:"/"});
   }
   else{
    res.json({redirectto:"/login"});
   }
})

app.post("/signup",async(req,res)=>{
    const{name,email,password}=req.body;
    const userfound =await FoodRegister.findOne({
        email,
    });
    if(userfound){
        res.json({redirectto:"/signup"});
    }
    else{
        const hashpassword=await bcrypt.hash(password,10);
        await FoodRegister.create({
            name,
            email,
            password:hashpassword,
        })
        res.json({redirectto:"/login"});
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
