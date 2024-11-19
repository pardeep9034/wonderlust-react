const express=require('express');
const cors=require('cors');
require('dotenv').config();
const mongoose=require('mongoose');
const app=express();
const User=require('./models/userModel');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const verifyUser=require('./utils/middelwares');
const Listing=require('./models/listingModel');
const Review=require('./models/reviewModel');
const multer=require('multer');
const {cloudinary,storage}=require('./cloudnary_config');
const upload=multer({storage});

app.use(cors({
    origin: ['http://localhost:5173','https://wonderlust-react.vercel.app'], // Allow only your frontend origin
    credentials: true, // Allow credentials such as cookies
}));
app.use(express.json());
app.use(cookieParser());
//connect to mongodb
const main=async()=>{
   const mongo=await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');
}
main();


//user sign up

app.post('/api/auth/signup',async(req,res)=>{
    const {username,email,password}=req.body;
//simple validation
    if(!username || !email || !password){
        return res.status(400).json({message:'All fields are required'});

    }
//check if the user already exists
const existingUser = await User.findOne({ email });
if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' });
}

//create a new user
const newUser = new User({ username, email, password });
await newUser.save();

const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
res.cookie('token', token, {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    sameSite: 'none', // Use 'None' if you plan to deploy on HTTPS
});

res.json({ success: true, message: 'User created successfully' });

})



//user sign in
app.post('/api/auth/signin',async(req,res)=>{
    const {email,password}=req.body;    
    //simple validation
    if(!email || !password){
        return res.status(400).json({message:'All fields are required'});

    }
    //check if the user exists
    const existingUser = await  User.findOne({ email });
    if (!existingUser) {
        return res.status(400).json({ success: false, message: 'User does not exist' });
    }
    //check if the password is correct
    if (password !== existingUser.password) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
    res.cookie('token', token, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: 'Lax', // Use 'None' if you plan to deploy on HTTPS
    });
    res.json({ success: true, message: 'User logged in successfully',existingUser });
})


//protected route
app.get('/api/auth/user',verifyUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Fetch user without password
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


//user sign out
app.get('/api/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'User signed out' });
});


//Listing routes

//add new listing
app.post('/api/newlisting',verifyUser,upload.single('image')  ,async(req,res)=>{
    try {
        const { title, country, description, price, location,category } = req.body;
        const listing = new Listing({
            title,
            country,
            description,
            price,
            location,
            category
            
        });
        listing.owner = req.user.id;
        listing.image.url = req.file.path;
        listing.image.filename = req.file.filename;
        await listing.save();
        res.json({ success: true, listing });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});
//edit listing
app.put('/api/listings/:id',verifyUser,upload.single('image'),async(req,res)=>{
    try {
        const { title, country, description, price, location } = req.body;
        const listing = await Listing.findById(req.params.id);
        listing.title = title;
        listing.country = country;
        listing.description = description;
        listing.price = price;
        listing.location = location;
        if (req.file) {
            listing.image.url = req.file.path;
            listing.image.filename = req.file.filename;
        }
        await listing.save();
        res.json({ success: true, listing });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

//delete listing
app.delete('/api/listings/:id',verifyUser,async(req,res)=>{
    try {
        const listing = await Listing.findByIdAndDelete(req.params.id);
        const reviews = await Review.deleteMany({ listing: req.params.id });
        
    
        res.json({ success: true, message: 'Listing deleted successfully' });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

//get all listings
app.get('/api/listings/',async(req,res)=>{
    try {
        const listings = await Listing.find().populate('owner');
        res.json({ success: true, listings });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});
app.get('/api/listings/:id',async(req,res)=>{
    try {
        const listing = await Listing.findById(req.params.id).populate('owner');
        res.json({ success: true, listing });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

//add review
app.post('/api/review/:id',verifyUser,async(req,res)=>{
    try {
        const { rating, comment } = req.body;
        const review = new Review({ rating, comment });
        review.listing = req.params.id;
        review.author = req.user.id;
        await review.save();
        const listing = await Listing.findById(req.params.id);
        listing.reviews.push(review._id);
        await listing.save();
        res.json({ success: true, review });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

//get all reviews
app.get('/api/reviews/:id',async(req,res)=>{
    try{
        const reviews=await Review.find({listing:req.params.id}).populate('author');
        res.json({success:true,reviews});
        
    }
    catch(err){
        res.json({success:false,error:err.message});
    }
    
});





app.listen(8080,()=>console.log('Server is running on port 8080'));
