import { Module } from '@nestjs/common';
import { LocalUsersService } from './local-users.service';

@Module({
  providers: [LocalUsersService],
  exports: [LocalUsersService],
})
export class LocalUsersModule {}
