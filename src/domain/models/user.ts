export interface UserModel {
  id?: number,
  name: string,
  matricula: number,
  materia: string,
  nota: number
}

export interface CreateUserOvenModel {
  name: string,
  matricula: number,
  materia: string,
  nota: number
}

export interface UpdateUserModel {
  id?: number,
  name: string,
  matricula: number,
  materia: string,
  nota: number
}
