import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmRepositoryModule } from './infrastructure/adapter/repositories/typeorm-repository.module';
import { UserModule } from './modules/users/user.module';
import { APP_GUARD } from '@nestjs/core';
import { TaskModule } from './modules/tasks/task.module';
import { AuthGuard } from './modules/users/auth/auth.guard';
import { PermissionGuard } from './common/guards/permission.guard';
import { ProfileModule } from './modules/profiles/profile.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './common/configuration/jwt.config';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Module({
  imports: [  
    typeOrmRepositoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env'
    }),
    JwtModule.registerAsync({
      global: true, 
      useFactory: jwtConfig,
      inject: [ConfigService],
  }),
    UserModule,
    TaskModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    
   
  ],
})
export class AppModule { }
