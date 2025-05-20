import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { configLoader } from 'config-loader';
import { envSchema } from 'env-schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      load:[configLoader],
      validationSchema:envSchema
    }),
    //modulo de configuracion de la base de datos mongo con mongoose
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory:(configService:ConfigService)=> {
        const mongoConfig = configService.get("mongo")
        return {
            uri: mongoConfig.uri
          }
        }, 
      }),
    HttpModule,
    
    
    ConfigModule.forRoot(),
    AuthModule,
 
    


  ],
  controllers: [AppController],
  providers: [AppService,ConfigModule],
})
export class AppModule {}
