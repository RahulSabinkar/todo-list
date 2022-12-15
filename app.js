
const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const items = ['Get milk', 'Get bread', 'Get eggs'];
const workItems = [];

app.get('/', (req, res) => {
  let day = date.getDate();
  res.render('list', {listTitle: day, newItemsList: items});
})

app.post('/', (req, res) => {
  let item = req.body.newItemInput;
  if (req.body.list === 'Work') {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }
})

app.get('/work', (req, res) => {
  res.render('list', {listTitle: 'Work', newItemsList: workItems});
})

app.get('/about', (req, res) => {
  res.render('about');
})

app.listen(PORT, ()=> {
  console.log('The server is running at port: '+PORT);
})