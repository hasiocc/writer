import { ISettings } from './ISettings';

interface IPreProcessing {
  mode: string;
  content:string[];
  settings:ISettings
}

export {
  IPreProcessing
}