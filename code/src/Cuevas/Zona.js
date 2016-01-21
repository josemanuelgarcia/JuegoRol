var Zona = cc.Class.extend({

    x:null,
    y:null,
    ancho:null,
    alto:null,
    idZona:null,
    enemigos:[],
    ctor: function (x,y,ancho,alto,id){
        this.x=x;
        this.y=y;
        this.ancho=ancho;
        this.alto=alto;
        this.idZona=id;
        return true;
    }


});