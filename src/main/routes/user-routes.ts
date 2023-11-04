import { Router } from 'express'
import { adptRoute } from '../adapters/express-route-adapter'
import { makeLoadUserByIdController } from '../factories/controllers/load-user-by-id/load-user-by-id-factory'
import { makeAddUserController } from '../factories/controllers/add-user/add-user-controller-factory'
import { makeUpdateUserController } from '../factories/controllers/update-user/update-user-controller-factory'
import { makeDeleteUserController } from '../factories/controllers/delete-user/delete-user-controller-factory'

export default (router: Router) => {
  router.get('/user/:id', adptRoute(makeLoadUserByIdController()))
  router.post('/user', adptRoute(makeAddUserController()))
  router.put('/user/:id', adptRoute(makeUpdateUserController()))
  router.delete('/user/:id', adptRoute(makeDeleteUserController()))
}
