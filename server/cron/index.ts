import {tempFile} from './tempFile';

export class Cron{
  static init ():void {      
    tempFile.autoRemoveAllFile();
  }
}