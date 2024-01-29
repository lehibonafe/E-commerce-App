const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const auth = require("../auth");

module.exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password doesn't match" });
    }

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    newUser.password = bcrypt.hashSync(password, 10);

    // Save the user to the database
    await newUser.save();

    // Send a success response
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Check for duplicate key error (MongoError 11000)
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Handle other errors
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in the database
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Email doesn't exist" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // You can generate and send a token here for authentication if needed

    res.status(200).json({
      message: "Login successful",
      access_token: auth.createAccessToken(user),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.userDetails = async (req, res) => {
  try {
    const result = await User.findById(req.user.id);

    if (!result) {
      return res.status(404).send({ message: "No user found" });
    }

    const { id, firstName, lastName, email } = result;

    return res.status(200).send({
      result: {
        id,
        firstName,
        lastName,
        email,
      },
    });
  } catch (err) {
    return res.status(500).send({ internal_error: err.message });
  }
};
