const mongoose = require('mongoose')
mongoose.set('strictQuery',false) // what for?

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})

// modify the 'toJSON' method of the schema to replace _id property with id, and remove __v
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

// const Note = mongoose.model('Note', noteSchema);

module.exports = mongoose.model('Note', noteSchema)
  
// else {
//   const note = new Note({
//     content,
//     important
//   });

//   note.save().then(() => {
//     console.log('note saved.');
//     mongoose.connection.close();
//   })
// }

// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// Note.find({important: false}).then(result => {
//   result.forEach(note => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// })

// run db with node file_name db_password

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })