const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path')

app.use(cors());
const corsOptions = {
  origin: 'https://medium-server-55xupovgx-faiz9199s-projects.vercel.app/', // Specify the allowed origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.send("Hello");
});

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
