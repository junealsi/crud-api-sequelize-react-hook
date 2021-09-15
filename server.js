const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/model");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then(() => console.log("Connected to Postgresql"));

app.get("/", (req, res) => res.json({ message: "Jagokode.com" }));

require("./app/routes/tutorial.route")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
