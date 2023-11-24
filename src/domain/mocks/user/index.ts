/* eslint-disable no-undef */
import { AddUser } from '../../usecases/add-user'

import { LoadUserById } from '../../usecases/load-user-by-id'
import { UserModel, UpdateUserModel } from '../../models/user'
import { UpdateUser } from '../../usecases/update-user'
import { DeleteUser } from '../../usecases/delete-user'

export const mockLoadUserByIdRequest = (): LoadUserById.Request => ({ params: { id: 1 } })

export const mockLoadUserByIdResponse = (): LoadUserById.Response => ({
  id: 1,
  name: 'joao',
  matricula: 123,
  materia: 'S107',
  nota: 80
})

export const mockLoadUserBySerialNumberResponse = (): UserModel => (
  {
    id: 1,
    name: 'joao',
    matricula: 123,
    materia: 'S107',
    nota: 80
  }
)

export const mockAddUserRequest = (): AddUser.Request => (
  {
    body: {
      name: 'joao',
      matricula: 123,
      materia: 'S107',
      nota: 80
    }
  }
)

export const mockUpdateUser = (): UpdateUserModel => (
  {
    name: 'joao',
    matricula: 123,
    materia: 'S107',
    nota: 80
  }
)

export const mockUserModel = (): UserModel => (
  {
    name: 'joao',
    matricula: 123,
    materia: 'S107',
    nota: 80
  }
)

export const mockUpdateUserRequest = (updateId: number): UpdateUser.Request => (
  {
    body: {
      id: updateId, ...mockUpdateUser()
    },
    params: {
      id: 1
    }
  }
)

export const mockAddUserResponse = (): UserModel => Object.assign(mockUserModel(), { id: 1 })

export const mockDeleteUserRequest = (id: number): DeleteUser.Request => ({ params: { id } })

export const mockInsertUser = async (): Promise<{ idUser: number }> => {
  return { idUser: 1 }
}
