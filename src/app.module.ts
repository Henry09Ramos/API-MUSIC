
import { Injectable, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';
import { AudioController } from './musica/normal.controller';

@Injectable()
export class FirebaseService {
  constructor() {
    console.log('Constructor de FirebaseService llamado'); // Agrega este console.log

    const serviceAccountObject = serviceAccount as admin.ServiceAccount;

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountObject),
      storageBucket: 'gs://api-music-ec9a6.appspot.com',
    });
  }
}

@Module({
  imports: [],
  controllers: [AppController, AudioController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}



