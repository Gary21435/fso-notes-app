const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

// const getName = () => {
//     axios.get(baseURL, {
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             'X-Auth-Token': '2tnuk63wjdrf33ch99o6dwxrcd0tpri'
//         }
//     })
// }





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
