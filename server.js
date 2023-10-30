const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const ConnectDB = require("./database/connection");


const UserRoutes = require("./routes/users/userRoutes");
const RolesRoutes = require("./routes/roles_permissions/RolesRoutes");
const PermissionsRoutes = require("./routes/roles_permissions/PermissionsRoutes");
const TransactionRoutes = require("./routes/transactions/transactionRoutes");
const TransactionCategoriesRoutes = require("./routes/transactionsCategory/transactionsCategoryRoutes");
const currencyRoutes = require("./routes/currencies/currencyRoutes");
const HistoryRoutes = require("./routes/history/HistoryRoutes");


app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const DB_URL = process.env.DB_URL;

//connect the database
ConnectDB(DB_URL);

app.use("/api", UserRoutes);
app.use("/api", TransactionRoutes);
app.use("/api", TransactionCategoriesRoutes);
app.use("/api", RolesRoutes);
app.use("/api", PermissionsRoutes);
app.use("/api", currencyRoutes);
app.use("/api", HistoryRoutes);

//run the server
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
