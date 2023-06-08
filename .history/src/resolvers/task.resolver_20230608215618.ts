import { Resolver, Query, Arg, Args, Mutation, Authorized, Ctx } from 'type-graphql'
import { PaginationInput } from '../schema/pagination.schema'
import { TaskService } from '../services/task.service'
import { Task, TaskInput, PaginatedTaskResponse } from '../schema/task.schema'
import { Context } from '../types/context'

@Resolver()
export class TaskResolver {

  constructor(private taskService: TaskService) {
    this.taskService = new TaskService()
  }

  @Query(() => PaginatedTaskResponse)
  async tasks(@Args()paginatedInput: PaginationInput):Promise<PaginatedTaskResponse> {
    return this.taskService.getTasks(paginatedInput)
  }

  @Query(() => Task)
  async task(@Arg('_id') _id: string):Promise<Task> {
    return this.taskService.getTask(_id)
  }

  @Mutation(() => Task)
  async createTask(@Ctx(){ user }: Context, @Arg('task') task: TaskInput):Promise<Task> {
    return this.taskService.createTask(task, user._id)
  }

  // @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Task)
  async deleteTask(@Ctx(){ user }: Context, @Arg('_id') _id: string):Promise<Task> {
    const task = await this.taskService.getTask(_id)
    console.log(task.user._id)
    console.log(user);
    // return this.taskService.deleteTask(_id)
  }

  @Mutation(() => Task)
  async updateTask(@Arg('_id') _id: string,
                   @Arg('task') task: TaskInput):Promise<Task> {
    return this.taskService.updateTask(_id, task)
  }
}