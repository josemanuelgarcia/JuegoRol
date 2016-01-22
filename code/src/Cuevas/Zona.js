var Zona = cc.Class.extend({

    x: null,
    y: null,
    ancho: null,
    alto: null,
    idZona: null,
    shape: null,
    space: null,
    layer: null,
    enemigos: [],
    cofre: null,
    ctor: function (space, x, y, ancho, alto, id, layer, cofre) {
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.cofre = cofre;
        this.alto = alto;
        this.space = space;
        this.idZona = id;
        this.layer = layer;
        var body = new cp.StaticBody();
        body.setPos(cc.p(x + ancho / 2, y + alto / 2));
        body.setAngle(0);
        body.e = 0;
        this.shape = new cp.BoxShape(body, ancho, alto);
        this.shape.setCollisionType(tipoZona);
        this.shape.setElasticity(this);
        this.shape.sensor = true;
        space.addStaticShape(this.shape);
        this.enemigosZona();
        return true;
    }, enemigosZona: function () {
        var enemigos = this.layer.mapa.getObjectGroup("Enemigos");
        var enemigosArray = enemigos.getObjects();
        var enemigosTemp = new Array();
        for (var j = 0; j < enemigosArray.length; j++) {
            if (enemigosArray[j]["IdZona"] == this.idZona) {
                var xEnemigo = enemigosArray[j]["x"];
                var yEnemigo = enemigosArray[j]["y"];
                if(enemigosArray[j]["tipo"]=="soldado_rojo")
                {
                enemigosTemp.push(new Soldado(this.space, cc.p(xEnemigo, yEnemigo), this.layer, "r"));
                }
                if(enemigosArray[j]["tipo"]=="soldado_verde")
                {
                   enemigosTemp.push(new Soldado(this.space, cc.p(xEnemigo, yEnemigo), this.layer, "v"));
                }
            }
        }
        this.enemigos = enemigosTemp;
        cc.log("ENEMIGOS DE LA ZONA" + this.idZona + "LONGITUD" + this.enemigos.length);
    }, eliminarEnemigo: function (shape) {
        for (var i = 0; i < this.enemigos.length; i++) {
            if (this.enemigos[i].shape === shape) {
                this.enemigos[i].eliminar();
                this.enemigos.splice(i, 1);
            }
        }
    }, linkInThisZone: function () {
        if (this.layer.link.body.p.x > this.x - this.ancho / 2 && this.layer.link.body.p.x < this.x + this.ancho / 2) {
            if (this.layer.link.body.p.y > this.y - this.alto / 2 && this.layer.link.body.p.y < this.y + this.alto / 2) {
                return true;
            }
        }
        return false;
    }


});