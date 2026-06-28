import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { errorHandling } from './middlewares/error-handling.js'
import { routes } from './routes/index.js'
import swaggerFile from '../swagger-output.json' with { type: 'json' }

const app = express()
const port = process.env.PORT || 3333

app.use(express.json())

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)
app.use(errorHandling)

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`),
)
