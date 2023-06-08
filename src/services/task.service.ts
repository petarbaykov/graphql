import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { TaskInput, TaskModel } from '../schema/task.schema'
import { Types } from 'mongoose'

export class TaskService {
  async getTasks(paginatedInput: PaginationInput) {
    const userPaginationServices =
        new PaginationService(
          {
            model: TaskModel,
            populate: 'user',
          })
    return userPaginationServices.getPaginatedItems(paginatedInput)
  }
  async getTask(_id: string) {
    return TaskModel.findById(_id).populate('user').lean()
  }
  async createTask(task: TaskInput, user: Types.ObjectId) {
    const taskWithUser = { ...task, user }
    const createdTask = await TaskModel.create(taskWithUser)
    return createdTask.populate('user')
  }
  async deleteTask(_id: string) {
    return TaskModel.findByIdAndRemove(_id).populate('user')
  }
  async updateTask(_id: string, task: TaskInput) {
    return TaskModel.findByIdAndUpdate(_id, task, { new: true }).populate('user')
  }
}