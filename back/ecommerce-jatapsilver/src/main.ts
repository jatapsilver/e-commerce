import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/loggerGlobal';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal)
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
  .setTitle("Ecommerce Jatapsilver")
  .setDescription("**Ecommerce JatapSilver** es un proyecto integrador desarrollado con **NestJS**, diseñado para ofrecer un backend robusto y escalable para plataformas de comercio electrónico.\n\nEl sistema permite gestionar usuarios, productos, categorías, órdenes y la carga de imágenes mediante **Cloudinary**.\n\n**Funcionalidades clave**:\n\n- _Gestión de Usuarios_: consulta todos los usuarios, busca por ID, actualiza o elimina usuarios.\n- _Gestión de Productos_: agrega productos, busca por **UUID** y actualiza productos. \n- _Categorías_: crea, y busca categorías.\n- _Órdenes_: gestiona órdenes de compra.\n\nEl sistema de **Autenticación y Autorización** permite acceso a ciertos endpoints sin iniciar sesión, mientras que otros requieren autenticación o permisos de **Administrador**.\n\nCon la integración de **Cloudinary**, es posible gestionar imágenes de productos de manera eficiente.\n\n**Ecommerce JatapSilver** es una solución flexible y escalable para tiendas en línea modernas.")
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup("api", app, document);
  await app.listen(3000);
}
bootstrap();
