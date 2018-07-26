const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use(express.static(__dirname + '/public'));

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;

  console.log(log);
  
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.')
    }
  });
  next();
})



hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('capitalize', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    header: 'Home Page faggy',
    pageTitle: 'home',
    welcomeMessage: 'Welcome muthafuckas',
  });
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    header: 'About Page',
    pageTitle: 'About Page',
  });
})

app.get('/projects', (req, res) => {
  res.render('about.hbs', {
    header: 'Projects',
    pageTitle: 'Projects',
  });
})
app.get('/services', (req, res) => {
  res.render('services.hbs', {
    header: 'Service Page',
    pageTitle: 'Service Page',
  });
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to furfill this request.'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});

// 1. Make new template that will render when the client visits the root of the website.
// 2. Make template called Home.hbs
// 3. Home page must have a welcome messsage
