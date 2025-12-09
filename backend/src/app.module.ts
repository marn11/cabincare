import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { CabinsModule } from './cabins/cabins.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DbModule, CabinsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
