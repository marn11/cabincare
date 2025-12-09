import { Module } from '@nestjs/common';
import { CabinsController } from './cabins.controller';
import { CabinsService } from './cabins.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [CabinsController],
  providers: [CabinsService],
})
export class CabinsModule {}
