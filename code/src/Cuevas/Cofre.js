var Cofre = cc.Class.extend({
    space:null,
    layer:null,
    shape:null,
    position:null,
    idCofre:null,
    visible:null,
    botin:null,
    ctor: function (space,position,layer,idCofre,botin){
        this.idCofre=idCofre;
        this.visible=false;
        this.space = space;
        this.position=position;
        this.layer = layer;
        this.botin=botin;
        return true;
    },cofreAparece:function()
    {
        if(!this.visible){
         this.sprite = new cc.PhysicsSprite("#Jarron_normal.png");
         var tamano = this.sprite.getContentSize();
         this.position = cc.p(this.position.x + tamano.width/2,this.position.y + tamano.height/2);
         this.body = new cp.Body(100, Infinity);
         this.body.setPos(this.position);
         this.sprite.setBody(this.body);
         this.shape = new cp.BoxShape(this.body,
         this.sprite.getContentSize().width - 2,
         this.sprite.getContentSize().height - 2);
         this.shape.setCollisionType(tipoJarron);
         this.space.addShape(this.shape);
         this.layer.mapa.addChild(this.sprite,2);
         this.visible=true;
         }
    }

});