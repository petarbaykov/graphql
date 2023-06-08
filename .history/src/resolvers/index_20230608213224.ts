import { UserResolver } from './user.resolver'
import { TaskResolver } from './task.resolver'

export const resolvers = [
  UserResolver,
  TaskResolver,
] as const