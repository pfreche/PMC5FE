import { Folder } from "./folder";
import { Attri } from "./Attri";

export class Mfile {

    id: number;
    folder_id: number;
    filename: string;
    mtype: number;
    folder: Folder;
    title: String;
    attris: Attri[];

   constructor(id: number, folder_id: number, filename: string, mtype: string) {
   }

   
}