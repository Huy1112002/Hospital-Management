import "reflect-metadata"
import { Module, ValidationPipe } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { APP_GUARD, APP_PIPE } from "@nestjs/core"
import { TypeOrmModule } from "@nestjs/typeorm"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AtGuard } from "./common/guards/at.guard"
import { RolesGuard } from "./common/guards/role.guard"
import { AppConfig, DatabaseConfig } from "./config"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { ExamninationsModule } from './examninations/examninations.module';
import { MedicineModule } from './medicine/medicine.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			envFilePath: `.env.${process.env.NODE_ENV}`,
			load: [AppConfig, DatabaseConfig],
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				...configService.get("database"),
			}),
		}),
		AuthModule,
		UsersModule,
		ExamninationsModule,
		MedicineModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		{
			provide: APP_GUARD,
			useClass: AtGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
})
export class AppModule {}
