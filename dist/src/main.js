"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, cookie_parser_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    app.enableCors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    });
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Petshop API')
        .setDescription('API documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT ?? 3001;
    await app.listen(port);
}
bootstrap().catch((err) => {
    console.error('❌ [main.ts] bootstrap error:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map