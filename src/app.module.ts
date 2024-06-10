import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee/entities/employee.entity';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { DishModule } from './dish/dish.module';
import { Dish } from './dish/entities/dish.entity';
import { SetMealModule } from './set-meal/set-meal.module';
import { SetMeal } from './set-meal/entities/setmeal.entity';
import { ImageUploadModule } from './image-upload/image-upload.module';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { SmsModule } from './sms/sms.module';
import { FlavorModule } from './flavor/flavor.module';
import { Dish_Flavor } from './flavor/entities/flavor.entity';
import { ShoppingCartModule } from './shopping_cart/shopping_cart.module';
import { Shopping_cart } from './shopping_cart/entity/shopping_cart.entity';
import { OrderModule } from './order/order.module';
import { Orders } from './order/entity/orders.entity';
import { Order_detail } from './order/entity/order_detail';
import { Amount } from './order/entity/todayAmount.entity';
import * as path from 'path';

@Module({
  imports: [
    EmployeeModule,
    //引入configService
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '.env'),
    }),
    //引入 Typeorm
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.get('mysql_server_host'),
          port: configService.get('mysql_server_port'),
          username: configService.get('mysql_server_username'),
          password: configService.get('mysql_server_password'),
          database: configService.get('mysql_server_database'),
          synchronize: true,
          logging: true,
          entities: [
            Employee,
            Category,
            Dish,
            SetMeal,
            User,
            Dish_Flavor,
            Shopping_cart,
            Orders,
            Order_detail,
            Amount,
          ],
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
            authPlugin: 'sha256_password',
          },
        };
      },
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '30m',
      },
      secret: 'djtu',
    }),
    CategoryModule,
    DishModule,
    SetMealModule,
    ImageUploadModule,
    UserModule,
    SmsModule,
    FlavorModule,
    ShoppingCartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
