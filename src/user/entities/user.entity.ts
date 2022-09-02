import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as SchemaMongoose } from 'mongoose';
import { Role } from 'src/common/constants/roles.constant';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  _id: SchemaMongoose.Types.ObjectId;

  @Field()
  @Prop({ required: true, index: true })
  userId: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  email: string;

  @Field()
  @Prop({ required: true })
  password: string;

  @Field(() => [String])
  @Prop({ default: [Role.MEMBER] })
  roles: string[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
