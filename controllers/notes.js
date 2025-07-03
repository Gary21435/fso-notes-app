const notesRouter = require('express').Router(); // a router object is an isolated instance of middleware and routes
const Note = require('../models/mongo');
const { X_TOKEN, STORE_HASH } = require('../utils/config')
const { errorHandler } = require('../utils/middleware')
// notesRouter.get('/', (request, response) => {
//   response.send('<a>Hello World!</a>')
// })
const axios = require('axios');

// For bigcommerce:
const baseURL = `https://api.bigcommerce.com/stores/${STORE_HASH}/v2/orders/6252`

notesRouter.get('/', (request, response) => {
  Note.find({}).then(res => {
    // res.forEach(notes => {
    console.log("this is from the db!");
    response.json(res); // respond with notes in json format
      // Note automatically converts the data from db to json
  });
})

notesRouter.get('/customer', (req, res) => {
  axios.get(baseURL, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': X_TOKEN
        }
    })
  .then(response => {
      console.log("orders received from BigCommerce API: ", response.data);
      res.send(response.data.billing_address.first_name);
  })
  .catch(error => {
    console.error('Error fetching products:', error);
  });
})

// Whatever is preceded by : is added to request.params and can then be used in the body
// to return notesRouterropriate response using it as an argument
notesRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  Note.findById(id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end() 
      }
    })
    .catch(error => {
      console.log("error handler!");
      next(error);
    });
    
})

notesRouter.delete('/:id', (request, response) => {
  const id = request.params.id
  Note.findByIdAndDelete(id)
    .then(note => console.log("note deleted: ", note))

  response.status(204).end()
})


notesRouter.post('/', (request, response, next) => {
  const note = request.body;
  
  
  if(!note.content) 
    return response.status(400).json({
      error: 'content missing'
    });
  const newNote = new Note({
    // id: String(Math.floor(Math.random()*10000)),
    content: note.content,
    important: note.important
  })

  // save to DB
  newNote.save().then(savedNote => {
    console.log('note saved.');
    response.json(savedNote).end();
    console.log("posted note: ", note);
    console.log("content type header: ", request.get('content-type'));
  })
  .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = "I"
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
    })
    .catch(error => next(error))
})


module.exports = notesRouter;