var Jarron = cc.Class.extend({
    space:null,
    body:null,
    shape:null,
    sprite:null,
    animacionDestruir:null,
    position:null,
    layer:null,
    manager:null,
    ctor:function(space,position,layer){

        this.manager = new AnimationManager(this);
        this.space = space;
        this.layer = layer;

        this.position = position;

        this.sprite = new cc.PhysicsSprite("#Jarron_normal.png");
        this.body = new cp.StaticBody();
        this.body.setPos(position);
        this.sprite.setBody(this.body);
        this.shape = new cp.BoxShape(this.body,
                                 this.sprite.getContentSize().width - 2,
                                 this.sprite.getContentSize().height - 2);
        this.shape.setCollisionType(tipoJarron);
        this.space.addStaticShape(this.shape);

        var framesDestruir = this.manager.getAnimacion("Jarron_destruir",7);
        this.animacionDestruir = new cc.Animation(framesDestruir,0.05);
        this.layer.mapa.addChild(this.sprite,2);

        return true;
    },destruir:function(){

        this.sprite.runAction(cc.Sequence.create(cc.Animate.create(this.animacionDestruir),cc.CallFunc.create(this.eliminar,this)));



    },eliminar:function()
    {
         this.space.removeShape(this.shape);
         this.layer.mapa.removeChild(this.sprite);
    }

});