export class SongModel {

    public id: number;
    //public songID: number;
    public title: string;
    public image: string; 
    // public tipoBoletimID: string;

    constructor(id: number,title: string, image: string )
    {
        this.id = id;
        this.title = title;
        this.image = image;
    }
}