
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

let items = ['Get milk', 'Get bread', 'Get eggs'];
let workItems = [];

app.get('/', (req, res) => {
  let date = new Date();
  const options = { weekday: 'long', month: 'short', day: 'numeric'};
  let today = date.toLocaleDateString('en-US', options);

  res.render('list', {listTitle: today, newItemsList: items});
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
  res.render('list', {listTitle: "Work", newItemsList: workItems});
})

app.listen(PORT, ()=> {
  console.log('The server is running at port: '+PORT);
})