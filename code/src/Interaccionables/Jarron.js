var Jarron = cc.Class.extend({
    space:null,
    body:null,
    shape:null,
    sprite:null,
    animacionDestruir:null,
    position:null,
    layer:null,
    ctor:function(space,position,layer){

        this.space = space;
        this.layer = layer;
        this.position = position;

        this.sprite = new cc.PhysicsSprite("#Jarron_normal.png");
        var tamaño = this.sprite.getContentSize();
        this.body = new cp.StaticBody();
        this.body.setPos(cc.p(position.x + tamaño.width/2,position.y - tamaño.height/2));
        this.sprite.setBody(this.body);
        this.shape = new cp.BoxShape(this.body,
                                 this.sprite.getContentSize().width - 2,
                                 this.sprite.getContentSize().height - 2);
        this.shape.setCollisionType(tipoJarron);
        this.space.addStaticShape(this.shape);

        var framesDestruir = animationManager.getAnimacion("Jarron_destruir",7);
        this.animacionDestruir = new cc.Animation(framesDestruir,0.05);
        this.layer.mapa.addChild(this.sprite,2);

        return true;
    },destruir:function(){
        var animacion = cc.Animate.create(this.animacionDestruir);
        var crearColectable = cc.CallFunc.create(this.crearColectableAleatorio,this);
        var eliminar = cc.CallFunc.create(this.eliminar,this);

        this.sprite.runAction(cc.Sequence.create(animacion,crearColectable,eliminar));

    },eliminar:function()
    {
         this.space.removeShape(this.shape);
         this.layer.mapa.removeChild(this.sprite);
    },crearColectableAleatorio()
    {
        //No siempre dará algo, asi que el random es mayor
        var random = Math.floor(Math.random() * 4);
        switch(random)
        {

            case 0:
                this.layer.corazones.push(new Corazon(this.space,this.position,this.layer));
                break;
            case 1:
                var random2 = Math.floor(Math.random()*2);
                switch(random2)
                {
                    case 0:
                        this.layer.rupias.push(new Rupia(this.space,this.position,this.layer,"v"));
                        break;
                    case 1:
                        this.layer.rupias.push(new Rupia(this.space,this.position,this.layer,"a"));
                        break;
                }
            default:
                break;
        }
    }

});