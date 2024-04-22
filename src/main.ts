import "reflect-metadata"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import * as passport from "passport"
import * as bodyParser from "body-parser"
import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true })
	const configService = app.get(ConfigService)

	const options = new DocumentBuilder()
		.setTitle("Generic Api")
		.setDescription("API")
		.setVersion("1.0")
		.addTag("generic-api")
		.addBearerAuth({
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT',
			name: 'JWT',
			description: 'Enter your JWT Token',
			in: 'header',
		},
		'token')
		.build()

	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup("api", app, document)

	app.use(bodyParser.json())
	app.use(passport.initialize())
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: {
				enableImplicitConversion: true, // <- This line here
			},
		})
	)

	const port = configService.get("PORT")

	await app.listen(port).then(() => {
		console.log("Server started on http://localhost:" + port)
	})
}

bootstrap()
