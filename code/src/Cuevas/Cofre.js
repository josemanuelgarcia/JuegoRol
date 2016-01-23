var Cofre = cc.Class.extend({
    space: null,
    layer: null,
    shape: null,
    position: null,
    idCofre: null,
    visible: null,
    botin: null,
    abierto: false,
    animacionAbrir: null,
    ctor: function (space, position, layer, idCofre, botin, visible) {
        this.idCofre = idCofre;
        this.visible = false;
        this.space = space;
        this.position = position;
        this.layer = layer;
        this.botin = botin;

        //Atributo en cadena de texto
        if (visible == "true") {
            this.crearCofre();
        }
        return true;

    }, cofreAparece: function () {
        if (!this.visible) {
            this.crearCofre();
        }

    }, crearCofre: function () {
        this.sprite = new cc.PhysicsSprite("#cofre_cerrado.png");
        var tamano = this.sprite.getContentSize();
        this.position = cc.p(this.position.x + tamano.width / 2, this.position.y + tamano.height / 2);
        this.body = new cp.StaticBody();
        this.body.setPos(this.position);
        this.sprite.setBody(this.body);
        this.shape = new cp.BoxShape(this.body,
            this.sprite.getContentSize().width - 2,
            this.sprite.getContentSize().height - 2);
        this.shape.setCollisionType(tipoCofre);
        this.space.addStaticShape(this.shape);

        var framesDestruir = animationManager.getAnimacionBasica("cofre_abierto", 1);
        this.animacionAbrir = new cc.Animation(framesDestruir, 0.05);

        this.layer.mapa.addChild(this.sprite, 3);
        this.visible = true;

    }, abrir: function () {
        if (!this.abierto) {
            var animacion = cc.Animate.create(this.animacionAbrir);
            var crearColectable = cc.CallFunc.create(this.crearColectable, this);
            this.abierto = true;
            this.sprite.runAction(cc.Sequence.create(animacion, crearColectable));

        }

    }, crearColectable: function () {

        switch (this.botin) {
            case "rupio_azul":
                this.layer.rupias.push(new Rupia(this.space, this.position, this.layer, "a"));
                break;
            case "rupia_roja":
                this.layer.rupias.push(new Rupia(this.space, this.position, this.layer, "r"));
                break;
            case "llave":
                this.layer.llavesNormales.push(new LlaveNormal(this.space, this.position, this.layer));
                break;
            case "llave_jefe":
                this.layer.llavesJefe.push(new LlaveJefe(this.space, this.position, this.layer));
                break;


        }
    }

});