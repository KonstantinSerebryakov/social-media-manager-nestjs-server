import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersDatabaseService } from './providers/users-database.service';
import { UserFactory } from './factories/user.factory';

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([UserFactory])],
  providers: [UsersDatabaseService],
  exports: [UsersDatabaseService],
})
export class DatabaseModule {}
