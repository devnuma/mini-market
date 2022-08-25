import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { GetUserArgs } from './dto/get-user.args';
import { GetUsersArgs } from './dto/get-users.args';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserInput: CreateUserInput) {
    const user = new this.userModel(createUserInput);
    user.userId = randomUUID();
    await user.save();
    return user;
  }

  async findAll(getUserArgs?: GetUsersArgs) {
    return this.userModel
      .find(getUserArgs)
      .skip(getUserArgs.offset)
      .limit(getUserArgs.limit);
  }

  findOne(getUserArgs: GetUserArgs) {
    return this.userModel.findOne(getUserArgs).lean();
  }

  async update(updateUserInput: UpdateUserInput) {
    const { userId, ...data } = updateUserInput;
    return this.userModel.updateOne({ userId }, data);
  }

  remove(userId: string) {
    return this.userModel.deleteOne({ userId });
  }
}
