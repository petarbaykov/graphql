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

  @Query(() => Booking)
  async booking(@Arg('_id') _id: string):Promise<Booking> {
    return this.bookingService.getBooking(_id)
  }

  @Mutation(() => Booking)
  async createBooking(@Ctx(){ user }: Context, @Arg('booking') booking: BookingInput):Promise<Booking> {
    return this.bookingService.createBooking(booking, user._id)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Booking)
  async deleteBooking(@Arg('_id') _id: string):Promise<Booking> {
    return this.bookingService.deleteBooking(_id)
  }
  @Mutation(() => Booking)
  async updateBooking(@Arg('_id') _id: string,
                   @Arg('booking') booking: BookingInput):Promise<Booking> {
    return this.bookingService.updateBooking(_id, booking)
  }

}