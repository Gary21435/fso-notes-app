const express = require('express')
const app = express()

app.use(express.json()); // I guess imports the json() function

// const cors = require('cors')
// app.use(cors());
// cross-origin resource sharing enabled


let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "REST Client is good for testing backend",
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<a>Hello World!</a>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
  console.log(notes);
})

// Whatever is preceded by : is added to request.params and can then be used in the body
// to return appropriate response using it as an argument
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if(note)
    response.json(note)
  else {
    response.statusMessage = "What you're looking for doesn't exist, mofo."
    response.status(404).end();
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})


app.post('/api/notes', (request, response) => {
  const note = request.body;
  console.log("posted note: ", note);
  console.log("content type header: ", request.get('content-type'));
  // add posted note to 'notes' array
  if(!note.content || !note.important) 
    return response.status(400).json({
      error: 'content missing'
    });
  let newNote = {
    id: String(Math.floor(Math.random()*10000)),
    content: note.content,
    important: note.important || false
  }
  
  notes.push(newNote);
  response.json(newNote);
})


const PORT = 3001 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})