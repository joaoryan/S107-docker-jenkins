export class NoRowsAffected extends Error {
  constructor(id?: number | string) {
    super(`No rows affected, id ${id} not found.`)
    this.name = 'NoRowsAffected'
  }
}
