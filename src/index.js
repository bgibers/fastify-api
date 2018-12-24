const routes = require('./routes')
const fastify = require('fastify')({
    logger: true
})

const mongoose = require('mongoose')

// Import Swagger Options
const swagger = require('./config/swagger')

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

//connect to DB
mongoose.connect('mongodb://localhost/mycargarage')
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))

//declare first route
fastify.get('/', async (request,reply) => {
    return { hello: 'world'}
})

routes.forEach((route,index) => {
    fastify.route(route)
})

//run the server
const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.swagger()
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch(e) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()