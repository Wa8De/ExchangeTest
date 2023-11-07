require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const ConnectDB = require("./database/connection");

// Importing Routers
const UserRoutes = require("./routes/users/userRoutes");
const RolesRoutes = require("./routes/roles_permissions/RolesRoutes");
const PermissionsRoutes = require("./routes/roles_permissions/PermissionsRoutes");
const TransactionRoutes = require("./routes/transactions/transactionRoutes");
const TransactionCategoriesRoutes = require("./routes/transactionsCategory/transactionsCategoryRoutes");
const currencyRoutes = require("./routes/currencies/currencyRoutes");
const HistoryRoutes = require("./routes/history/HistoryRoutes");
const TimeZoneRoutes = require("./routes/Timezone/TimeZoneRoutes");
const DeviseRoutes = require("./routes/Devise/DeviseRoutes");
const ExchangeRatesRoutes = require("./routes/ExchangeRates/ExchangeRatesRoutes");


app.use(
  cors({
    origin: ["https://exchange-mu-one.vercel.app"],
    methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

//using Json
app.use(express.json());

// .env variables
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;

//connect the database
ConnectDB(DB_URL);

// APIs
app.use("/api", UserRoutes);
app.use("/api", TransactionRoutes);
app.use("/api", TransactionCategoriesRoutes);
app.use("/api", RolesRoutes);
app.use("/api", PermissionsRoutes);
app.use("/api", currencyRoutes);
app.use("/api", TimeZoneRoutes);
app.use("/api", DeviseRoutes);
app.use("/api", ExchangeRatesRoutes);
app.use("/api", HistoryRoutes);

//run the server
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
