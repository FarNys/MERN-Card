const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
app.use(cors());

// Connect Database
connectDB();

// Init Middleware
app.use(
  express.json({
    extended: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
);

// Define Routes
app.use("/register", require("./routes/users"));
app.use("/login", require("./routes/auth"));
app.use("/allcards", require("./routes/cards"));
app.use("/reviews", require("./routes/review"));
app.use("/sdag87a6fah3ijhwr8faywh/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
