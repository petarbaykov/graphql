import { Field, InputType, ObjectType } from 'type-graphql'
import { BaseModel } from './model.schema'
import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose'
import PaginatedResponse from './pagination.schema'
import { MinLength } from 'class-validator'
import { User } from './user.schema'
import { Types } from 'mongoose'

@ObjectType()
export class Task extends BaseModel {

    @Field()
    @Prop({ required: true })
      title: string

    @Field()
    @Prop({ required: true })
      description: string

    @Field(() => User)
    @Prop({ ref: User, required: true })
      user: Ref<User, Types.ObjectId>
}

export const TaskModel = getModelForClass(Task,
  { schemaOptions: { timestamps: true },
  })

@InputType()
export class TaskInput {
    @Field()
    @MinLength(3)
      title: string
    @MinLength(3)
    @Field()
      description: string

    @Field()
      user: string
}

@ObjectType()
export class PaginatedTaskResponse extends PaginatedResponse(Task){}