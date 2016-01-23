var Puerta = cc.Class.extend({

    tipo: null,
    space: null,
    layer: null,
    shape: null,
    animacionAbrir:null,
    id:null,
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
        this.body = new cp.StaticBody();
        this.body.setPos(this.position);
        this.sprite.setBody(this.body);
        this.shape = new cp.BoxShape(this.body,
            this.sprite.getContentSize().width ,
            this.sprite.getContentSize().height );
        this.shape.setCollisionType(tipoPuerta);
        this.space.addStaticShape(this.shape);
        this.layer.mapa.addChild(this.sprite, 2);
        return true;
    }, eliminar: function () {
                this.space.removeShape(this.shape);
                this.layer.mapa.removeChild(this.sprite);
    }


});