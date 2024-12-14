import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], 
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), 
      }),
      inject: [ConfigService], 
    }),
    TasksModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
