var Bloque = cc.Class.extend({
    space: null,
    body: null,
    shape: null,
    sprite: null,
    position: null,
    layer: null,
    manager: null,
    velBloque: 17,
    tiempoDeMov: null,
    ctor: function (space, position, layer) {

        this.manager = new AnimationManager(this);
        this.space = space;
        this.layer = layer;

        this.position = position;

        this.sprite = new cc.PhysicsSprite("#Jarron_normal.png");
        this.body = new cp.Body(500, Infinity);
        this.body.setPos(position);
        this.body.setAngle(0);
        this.body.e = 0;
        this.sprite.setBody(this.body);
        this.space.addBody(this.body);
        this.shape = new cp.BoxShape(this.body,
            this.sprite.getContentSize().width - 2,
            this.sprite.getContentSize().height - 2);
        this.shape.setFriction(1);
        this.shape.setCollisionType(tipoBloque);
        this.space.addShape(this.shape);
        this.layer.mapa.addChild(this.sprite, 2);

        return true;
    }, update: function (dt) {
        this.body.p.x = this.sprite.getPosition().x;
        this.body.p.y = this.sprite.getPosition().y;
    }

});
