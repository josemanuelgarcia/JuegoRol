var ContenedorCorazon = cc.Class.extend({
    space: null,
    sprite: null,
    shape: null,
    layer: null,
    ctor: function (space, posicion, layer) {
        this.space = space;
        this.layer = layer;


        // Crear Sprite - Cuerpo y forma
        this.sprite = new cc.PhysicsSprite(res.contenedorCorazon_png);
        // Cuerpo estática , no le afectan las fuerzas
        var body = new cp.StaticBody();
        body.setPos(posicion);
        this.sprite.setBody(body);
        // Los cuerpos estáticos nunca se añaden al Space
        var radio = this.sprite.getContentSize().width / 2;
        // forma
        this.shape = new cp.BoxShape(body,
            this.sprite.getContentSize().width - 2,
            this.sprite.getContentSize().height - 2);
        this.shape.setCollisionType(tipoContenedorCorazon);
        // Nunca genera colisiones reales
        this.shape.setSensor(true);
        // forma estática
        this.space.addStaticShape(this.shape);
        // añadir sprite a la capa
        this.layer.mapa.addChild(this.sprite, 2);

    }, getShape: function () {
        return this.shape;

    }, eliminar: function () {
        // quita la forma
        this.space.removeShape(this.shape);

        // quita el sprite
        this.layer.mapa.removeChild(this.sprite);
         //llamar a la layer de victoria
                cc.director.pause();

                iuLayer.entrar=false;
                iuLayer.pause=false;
                // tenemos el objeto GameScene y le añadimos la nueva layer
                this.layer.getParent().addChild(new VictoriLayer(this.layer.getParent()), 0, 4);
    }
});
