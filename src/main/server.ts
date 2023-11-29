import { app } from './config/app'
import env from './config/env'
import connectionDB from './../infra/database/db';

app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))

connectionDB();