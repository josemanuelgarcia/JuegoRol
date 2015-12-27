var Boomerang = cc.Class.extend({
    space: null,
    sprite: null,
    shape: null,
    layer: null,
    sentido:null,
    canBeDeleted:null,
    velDisparo: 50,
    timeToChange:null,
    ctor: function (space, posicion, layer, sentido) {
        this.space = space;
        this.layer = layer;
        this.sentido=sentido;
        // Crear animación
        var framesAnimacion = [];
        for (var i = 0; i <= 5; i++) {
            var str = "boomerang" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            framesAnimacion.push(frame);
        }
        var animacion = new cc.Animation(framesAnimacion, 0.05);
        var actionAnimacionBucle =
            new cc.RepeatForever(new cc.Animate(animacion));

        // Crear Sprite - Cuerpo y forma
        this.sprite = new cc.PhysicsSprite("#boomerang0.png");

        this.body = new cp.Body(100, Infinity);
        this.body.setPos(posicion);
        this.timeToChange=Date.now();
        this.canBeDeleted=false;
        //Poner la direccion del disparo en función de la de Octorok

        if (sentido == "ARRIBA") {
            this.body.setVel(cp.v(0, this.velDisparo));
        } else if (sentido == "DERECHA") {
            this.body.setVel(cp.v(this.velDisparo, 0));
        } else if (sentido == "ABAJO") {
            this.body.setVel(cp.v(0, -this.velDisparo));
        } else {
            this.body.setVel(cp.v(-this.velDisparo, 0));
        }

        // Colocar en angulo del cuerpo a 0
        this.body.setAngle(0);

        this.sprite.setBody(this.body);
        this.space.addBody(this.body);

        var radio = this.sprite.getContentSize().width / 2;
        // forma
         this.shape = new cp.BoxShape(this.body,
                    this.sprite.getContentSize().width - 2,
                    this.sprite.getContentSize().height - 2);
        this.shape.setCollisionType(tipoBoomerang);

        this.space.addShape(this.shape);

        // ejecutar la animación
        this.sprite.runAction(actionAnimacionBucle);

        layer.addChild(this.sprite, 10);
        return true;

    }, getShape: function () {
        return this.shape;

    }, eliminar: function () {
        // quita la forma
        this.space.removeShape(this.shape);
        //Link solo puede lanzar un boomerang a la vez
        this.layer.link.boomerang=null;
        // quita el sprite
        this.layer.removeChild(this.sprite);
    },update:function(dt){
        if(Date.now()-this.timeToChange>=1500)
        {
            this.canBeDeleted=true;
            if (this.sentido == "ARRIBA") {
                        this.body.setVel(cp.v(0, -this.velDisparo));
                    } else if (this.sentido == "DERECHA") {
                        this.body.setVel(cp.v(-this.velDisparo, 0));
                    } else if (this.sentido == "ABAJO") {
                        this.body.setVel(cp.v(0, this.velDisparo));
                    } else {
                        this.body.setVel(cp.v(this.velDisparo, 0));
                    }
        }
    }


});