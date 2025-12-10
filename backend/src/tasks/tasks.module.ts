import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [DbModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
