var Interruptor = cc.Class.extend({

    pulsado:null,
    space:null,
    layer:null,
    shape:null,
    ctor: function (space,position,layer){
        this.pulsado=false;
        this.space = space;
        this.layer = layer;
        this.sprite = new cc.PhysicsSprite("#Jarron_normal.png");
        var tamano = this.sprite.getContentSize();
        this.position = cc.p(position.x + tamano.width/2,position.y + tamano.height/2);
        this.body = new cp.Body(50, Infinity);
        this.body.setPos(this.position);
        this.sprite.setBody(this.body);
        this.shape = new cp.BoxShape(this.body,
        this.sprite.getContentSize().width - 2,
        this.sprite.getContentSize().height - 2);
        this.shape.setCollisionType(tipoInterruptor);
        this.space.addShape(this.shape);
        this.layer.mapa.addChild(this.sprite,2);
        return true;
    },activarInterruptor:function()
    {
        cc.log("PULSADO");
        this.pulsado=true;
    }


});