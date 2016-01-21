var Zona = cc.Class.extend({

    x:null,
    y:null,
    ancho:null,
    alto:null,
    idZona:null,
    shape:null,
    enemigos:[],
    ctor: function (space,x,y,ancho,alto,id){
        this.x=x;
        this.y=y;
        this.ancho=ancho;
        this.alto=alto;
        this.idZona=id;

        this.shape = new cp.BoxShape(this.body,ancho, alto
        this.shape.setCollisionType(tipoZona);
        space.addShape(this.shape);
        return true;
    }


});