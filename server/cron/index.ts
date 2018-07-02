import {tempFile} from './tempfile';

export class Cron{
  static init ():void {      
    tempFile.autoRemoveAllFile();
  }
}