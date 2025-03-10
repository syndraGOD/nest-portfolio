import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/configs/env/.${process.env.NODE_ENV}.env`,
      isGlobal: true, // 전체적으로 사용하기 위해
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule,
  ],
})
export class AppModule {}
