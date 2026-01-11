import { Model, QueryFilter, Types } from 'mongoose'

export class BaseRepository<T> {
  model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  create(data: T) {
    return this.model.create(data)
  }

  findAll(query: QueryFilter<T> = {}) {
    return this.model.find(query)
  }

  findById(id: Types.ObjectId) {
    return this.model.findById(id)
  }

  updateById(id: Types.ObjectId, update: Partial<T>) {
    return this.model.findByIdAndUpdate(id, update, { new: true })
  }

  deleteById(id: Types.ObjectId) {
    return this.model.findByIdAndDelete(id)
  }
}
