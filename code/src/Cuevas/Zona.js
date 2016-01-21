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

        var body = new cp.StaticBody();
        body.setPos(cc.p(x,y));
        body.setAngle(0);
        body.e = 0;
        this.shape = new cp.BoxShape(body,ancho, alto);
        this.shape.setCollisionType(tipoZona);
        this.shape.sensor = true;
        space.addStaticShape(this.shape);
        return true;
    }


});