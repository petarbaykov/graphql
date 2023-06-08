import { UserResolver } from './user.resolver'
import { BookingResolver } from './booking.resolver'
export const resolvers = [
  UserResolver,
  BookingResolver,
] as const