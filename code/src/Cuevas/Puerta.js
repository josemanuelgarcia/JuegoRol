var Puerta = cc.Class.extend({

    tipo: null,

    space: null,
    layer: null,
    shape: null,
    animacionAbrir:null,
    ctor: function (space, position, layer,tipo,id) {
        this.pulsado = false;
        this.space = space;
        this.layer = layer;
        this.tipo=tipo;
        this.id=id;
        if(this.tipo=="normal")
        {
        this.sprite = new cc.PhysicsSprite("#Puerta_normal.png");
        }
        else
        {
        this.sprite = new cc.PhysicsSprite("#Puerta_Jefe.png");
        }
        var tamano = this.sprite.getContentSize();
        this.position = cc.p(position.x + tamano.width / 2, position.y + tamano.height / 2);
        this.body = new cp.Body(200,Infinity);
        this.body.setPos(this.position);
        this.sprite.setBody(this.body);
        this.shape = new cp.BoxShape(this.body,
            this.sprite.getContentSize().width - 2,
            this.sprite.getContentSize().height - 2);
        this.shape.setCollisionType(tipoPuerta);
        this.space.addShape(this.shape);
        this.layer.mapa.addChild(this.sprite, 2);
        return true;
    }, eliminar: function () {
        // quita la forma
                this.space.removeShape(this.shape);
                // quita el sprite
                this.layer.mapa.removeChild(this.sprite);
    }


});