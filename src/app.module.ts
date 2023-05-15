import { Module } from '@nestjs/common';
const fs = require('fs');
const path = require('path');
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const rootCertificate = path.join(__dirname, "certificates/us-east-2-bundle.pem");

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT, 10) || 5432,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      entities: [],
      synchronize: true,
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true,
        ca: fs.readFileSync(rootCertificate).toString()
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
