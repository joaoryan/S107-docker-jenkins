import { app } from './config/app'
import env from './config/env'
import connect from './../infra/database/db';

app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))

connect();