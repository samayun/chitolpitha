// import { extname } from 'path';
// import { diskStorage } from 'multer';
// import { Injectable } from '@nestjs/common';
// import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

// @Injectable()
// export class FileUploadMiddleware {
//   private readonly allowedFileTypes = ['.jpg', '.jpeg', '.png']; // Define the allowed file extensions

//   multerOptions: MulterOptions = {
//     storage: diskStorage({
//       destination: './uploads/', // Specify the directory where the files will be stored
//       filename: (req, file, callback) => {
//         const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`; // Generate a unique filename
//         const fileExtension = extname(file.originalname); // Get the file extension
//         callback(null, `${uniqueSuffix}${fileExtension}`);
//       },
//     }),
//     fileFilter: (req, file, callback) => {
//       const isValidFileType = this.allowedFileTypes.some((type) =>
//         file.originalname.toLowerCase().endsWith(type.toLowerCase()),
//       );
//       if (isValidFileType) {
//         callback(null, true);
//       } else {
//         callback(null, false);
//         // callback(new Error('Invalid file type'));
//       }
//     },
//   };
// }

import { extname } from 'path';
import { diskStorage } from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export class FileUploadMiddleware {
  public static multerOptions: MulterOptions = {
    storage: diskStorage({
      destination: './public/uploads/', // Specify the directory where the files will be stored
      filename: (req, file, callback) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`; // Generate a unique filename
        const fileExtension = extname(file.originalname); // Get the file extension
        callback(null, `${uniqueSuffix}${fileExtension}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      const allowedFileTypes = ['.jpg', '.jpeg', '.png']; // Define the allowed file extensions
      const isValidFileType = allowedFileTypes.some((type) =>
        file.originalname.toLowerCase().endsWith(type.toLowerCase()),
      );
      if (isValidFileType) {
        callback(null, true);
      } else {
        callback(null, false);
        // callback(new Error('Invalid file type'));
      }
    },
  };
}
