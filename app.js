
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

let items = ['Get milk', 'Get bread', 'Get eggs'];

app.get('/', (req, res) => {
  let date = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric'};
  let today = date.toLocaleDateString('en-US', options);

  res.render('list', {day: today, newItemsList: items});
})

app.post('/', (req, res) => {
  let item = req.body.newItemInput;
  items.push(item);
  res.redirect('/');
})

app.listen(PORT, ()=> {
  console.log('The server is running at port: '+PORT);
})