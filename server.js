const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const docs = require("./docs");
const swaggerUI = require("swagger-ui-express");

// Load env vars
dotenv.config({ path: "./config/config.env" });

//Database
const db = require("./config/database");

// Test DB
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log(err));

const app = express();

// Body Parser
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Route files
const users = require("./routes/users");
const twing = require("./routes/twing");

app.use("/api/users", users);
app.use("/", twing);

//Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

// set static folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
