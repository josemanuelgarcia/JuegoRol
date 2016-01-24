var Salida = cc.Class.extend({

    space: null,
    layer: null,
    shape: null,
    ctor: function (space, position, layer) {
        this.layer = layer;
       this.space = space;
               this.body = new cp.Body(100,Infinity);
               this.body.setPos(new cc.p(position.x,position.y));

               this.shape = cp.BoxShape(this.body,20,20);
               this.shape.setSensor(true);
               this.shape.setCollisionType(tipoSalida);
               this.space.addShape(this.shape);
        return true;
    }, eliminar: function () {
                this.space.removeShape(this.shape);
                this.layer.mapa.removeChild(this.sprite);
    }


});