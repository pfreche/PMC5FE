export class Bookmark {

    id: number;
    title: string;
    url: string;
    description: string;
    folder :string;


   constructor(id: number, title: string, url: string, desciption: string) {
       this.url = url;
   }

   
}