"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./startup/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    process.env.TZ = 'America/New_York';
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map