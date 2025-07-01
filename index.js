require('dotenv').config() // to be able to use environment variables

const Note = require('./mongo');

const express = require('express')
const app = express()

app.use(express.json()); // I guess imports the json() function

app.use(express.static('dist'));
// to serve static files, i.e. index.html, .js, etc. in dist

const errorHandler = (error, request, response, next) => {
  //console.error(error.message)

  console.log("error name: ", error.name);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error);
}

// this has to be the last loaded middleware, also all the routes should be registered before this!

// const cors = require('cors')
// app.use(cors());
// cross-origin resource sharing enabled


// let notes = 

// [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "REST Client is good for testing backend",
//     important: true
//   }
// ]

app.get('/', (request, response) => {
  response.send('<a>Hello World!</a>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(res => {
    // res.forEach(notes => {
    console.log("this is from the db!");
    response.json(res); // respond with notes in json format
      // Note automatically converts the data from db to json
  });
})

// Whatever is preceded by : is added to request.params and can then be used in the body
// to return appropriate response using it as an argument
app.get('/api/notes/:id', (request, response, next) => {
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

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  Note.findByIdAndDelete(id)
    .then(note => console.log("note deleted: ", note)) // works

  response.status(204).end()
})


app.post('/api/notes', (request, response) => {
  const note = request.body;
  console.log("posted note: ", note);
  console.log("content type header: ", request.get('content-type'));
  
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
  })
  
  response.json(newNote);
})


app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})