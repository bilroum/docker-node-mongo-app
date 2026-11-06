const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
const Item = require('./models/Item');

app.get("/", (req, res) => {
  Item.find()
    .then((items) => res.render("index", { items }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ msg: "Something went wrong" });
    });
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Server running...'));
