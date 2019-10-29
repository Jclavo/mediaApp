export class SongModel {

    public id: number;
    //public songID: number;
    public title: string;
    public image: string; 
    public song : File; 
    public path : string; 
    // public tipoBoletimID: string;

    constructor(id: number,title: string, image: string, path: string )
    {
        this.id = id;
        this.title = title;
        this.image = image;
        this.path  = path;
    }
}