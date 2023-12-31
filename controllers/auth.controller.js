const User = require("../models/auth.model");

const Signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Please fill all fields" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "password length should be greater than 8 character" })
        }
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const newUser = await User.create(req.body); // Use `await` here to ensure the user is created before proceeding.
        console.log("User created");
        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes.
        res.status(500).json({ message: "Internal server error" });
    }
};
//Login controller here

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ msg: "please enter your details" })
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        //    const isValidPassword=await bcrypt.compareSync(password,user.password);
        const savedPassword = await user.password;
        if (savedPassword !== password) {
            return res.status(400).send('Incorrect Password');
            }
            
        if (savedPassword === password) {
            return res.status(200).send('Authenticated');
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    Signup,
    Login
};
