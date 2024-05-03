import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as admin from 'firebase-admin';

@Controller('audio')

export class AudioController {
  
  @Post('/upload') 
  @UseInterceptors(FileInterceptor('audio'))

  async uploadAudio(@UploadedFile() file) {
    console.log('Método uploadAudio ejecutándose'); // Agregar el console.log aquí

    try {
      console.log('Solicitud recibida:', file); // Agregar el console.log aquí
      const bucket = admin.storage().bucket();
      const fileName = `${Date.now()}_${file.originalname}`;
      const fileUpload = await bucket.file(fileName).save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
        },
      } );

      const url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      return { url };
    } catch (e) {
      throw new Error('Error al subir el archivo');
    }
  }
  
}
