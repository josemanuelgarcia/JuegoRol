var Cueva = cc.Class.extend({

    posSalida:null,
    body:null,
    shape:null,
    space:null,
    ctor: function (space,posEntrada,posSalida){
        this.posSalida = posSalida;
        this.space = space;

        this.body = new cp.StaticBody();
        this.body.setPos(new cc.p(posEntrada.x+15,posEntrada.y+15));

        this.shape = cp.BoxShape(this.body,20,20);
        this.shape.setSensor(true);
        this.shape.setCollisionType(tipoCueva);
        this.space.addStaticShape(this.shape);


        return true;
    },getPosSalida:function()
    {
        var cadena = this.posSalida.split(",");
        var x = parseInt(cadena[0])+ 15;
        var y = parseInt(cadena[1]);
        cc.log(x+","+ y);
        return new cc.p(x,y);

    }


});