var Rupia = cc.Class.extend({
    space: null,
    sprite: null,
    shape: null,
    layer: null,
    color: null,
    rupias: 0,
    ctor: function (space, posicion, layer, color) {
        this.space = space;
        this.layer = layer;
        this.color = color;

        // Crear Sprite - Cuerpo y forma
        if (this.color == "v") {
            this.sprite = new cc.PhysicsSprite(res.rupia_png);
            this.rupias = 1;
        }
        else if (this.color == "r") {
            this.sprite = new cc.PhysicsSprite(res.rupia_roja_png);
            this.rupias = 5;
        }
        else if (this.color == "a") {
            this.sprite = new cc.PhysicsSprite(res.rupiaazul_colectable_png);
            this.rupias = 10;
        }
        else if (this.color == "m") {
            this.sprite = new cc.PhysicsSprite(res.rupia_amarilla_png);
            this.rupias = 20;
        }

        // Cuerpo estática , no le afectan las fuerzas
        var body = new cp.StaticBody();
        body.setPos(posicion);
        this.sprite.setBody(body);
        // Los cuerpos estáticos nunca se añaden al Space
        var radio = this.sprite.getContentSize().width / 2;
        // forma
        this.shape = new cp.BoxShape(body,
            this.sprite.getContentSize().width,
            this.sprite.getContentSize().height);
        this.shape.setCollisionType(tipoRupia);
        // Nunca genera colisiones reales
        this.shape.setSensor(true);
        // forma estática
        this.space.addStaticShape(this.shape);
        // añadir sprite a la capa



        layer.mapa.addChild(this.sprite, 1);

    }, getShape: function () {
        return this.shape;

    }, eliminar: function () {
        // quita la forma
        this.space.removeShape(this.shape);

        // quita el sprite
        this.layer.mapa.removeChild(this.sprite);
    }, agregarRupias: function () {
        iuLayer.agregarRupia(this.rupias);
    }
});
