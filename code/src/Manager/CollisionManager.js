//Tipos para las colisiones
var tipoNoPasable = 1;
var tipoJugador = 2;
var tipoOctorok = 3;
var tipoDisparoOctorok = 4;
var tipoBoomerang = 5;
var tipoCorazon = 6;
var tipoRupia = 7;
var tipoBomba = 8;
var tipoEspada = 9;
var tipoCueva = 10;
var tipoJarron = 11;
var tipoBloque = 12;
var tipoSoldado = 13;
var tipoBombaRecolectable = 14;
var tipoFlechaRecolectable = 15;
var tipoInterruptor = 16;
var tipoContenedorCorazon = 18;
var tipoZona = 17;
var tipoLlaveNormal = 19;
var tipoLlaveJefe = 20;
var tipoCofre = 21;
var tipoKeaton=22;
var tipoPuerta=23;
var CollisionManager = cc.Class.extend({

    space: null,
    layer: null,
    ctor: function (space, layer) {
        this.space = space;
        this.layer = layer;

        this.addHandlerCollisions();

    }, addHandlerCollisions: function () {
        //Colisiones entre elementos
        this.space.addCollisionHandler(tipoBoomerang, tipoJugador, null, this.collisionBoomerangConJugador.bind(this), null, null);

        this.space.addCollisionHandler(tipoBoomerang, tipoNoPasable, null, this.collisionBoomerangConNoPasable.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoCorazon, null, this.collisionJugadorConCorazon.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoContenedorCorazon, null, this.collisionJugadorConContenedorCorazon.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoLlaveNormal, null, this.collisionJugadorConLlaveNormal.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoLlaveJefe, null, this.collisionJugadorConLlaveJefe.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoBombaRecolectable, null, this.collisionJugadorConBombaRecolectable.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoFlechaRecolectable, null, this.collisionJugadorConFlechaRecolectable.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoRupia, null, this.collisionJugadorConRupia.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoBomba, this.reducirVidas.bind(this), null, null, null);

        this.space.addCollisionHandler(tipoEspada, tipoJarron, null, this.destruirJarron.bind(this), null, null);

        this.space.addCollisionHandler(tipoEspada, tipoCofre, null, this.abrirCofre.bind(this), null, null);

        this.space.addCollisionHandler(tipoBomba, tipoOctorok, null, this.collisionBombaConKeaton.bind(this), null, null);

        //Colisiones con Octorok
        this.space.addCollisionHandler(tipoNoPasable, tipoOctorok, null, null, this.collisionObjetoConOctorok.bind(this), null);

        this.space.addCollisionHandler(tipoNoPasable, tipoDisparoOctorok, null, null, this.collisionObjetoConDisparo.bind(this), null);

        this.space.addCollisionHandler(tipoJarron, tipoDisparoOctorok, null, null, this.collisionObjetoConDisparo.bind(this), null);

        this.space.addCollisionHandler(tipoSoldado, tipoDisparoOctorok, null, null, this.collisionObjetoConDisparo.bind(this), null);

        this.space.addCollisionHandler(tipoJugador, tipoDisparoOctorok, null, null, this.collisionJugadorConDisparo.bind(this), null);

        this.space.addCollisionHandler(tipoBoomerang, tipoOctorok, null, this.destruirSegundo.bind(this), null, null);

        this.space.addCollisionHandler(tipoBomba, tipoOctorok, null, this.destruirSegundo.bind(this), null, null);

        this.space.addCollisionHandler(tipoEspada, tipoOctorok, null, this.collisionEspadaConEnemigo.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoOctorok, null, null, null, this.reducirVidas.bind(this));
        this.space.addCollisionHandler(tipoJugador, tipoInterruptor, this.pulsarInterruptor.bind(this), null, null, null);
        //Colisiones Soldado
        this.space.addCollisionHandler(tipoBoomerang, tipoSoldado, null, this.destruirSegundo.bind(this), null, null);

        this.space.addCollisionHandler(tipoBomba, tipoSoldado, null, this.destruirSegundo.bind(this), null, null);

        this.space.addCollisionHandler(tipoEspada, tipoSoldado, null, this.collisionEspadaConEnemigo.bind(this), null, null);

        this.space.addCollisionHandler(tipoJugador, tipoSoldado, this.reducirVidas.bind(this), null, null, null);

        this.space.addCollisionHandler(tipoJugador, tipoZona, this.actualizarCamaraZona.bind(this), null, null, null);

        this.space.addCollisionHandler(tipoJugador, tipoPuerta, null, null, null,this.abrirPuerta.bind(this));

    }, collisionObjetoConOctorok: function (arbiter, space) {
        //  this.octorok.haChocado();

    }, collisionObjetoConDisparo: function (arbiter, space) {
        var shapes = arbiter.getShapes();
        var vel = shapes[1].getBody().getVel();
        this.layer.shapesToRemove.push(shapes[1]);

    }, collisionBoomerangConJugador: function (arbiter, space) {
        if (this.layer.link.boomerang.canBeDeleted) {
            var shapes = arbiter.getShapes();
            this.layer.shapesToRemove.push(shapes[0]);
        }
    }, collisionBoomerangConNoPasable: function (arbiter, space) {
        this.layer.link.boomerang.choco = true;

    }, destruirSegundo: function (arbiter, space) {
        var shapes = arbiter.getShapes();
        this.layer.shapesToRemove.push(shapes[1]);

    }, collisionJugadorConCorazon: function (arbiter, space) {
        cc.audioEngine.playEffect(res.recoger_corazon_wav);
        iuLayer.darVidas();
        var shapes = arbiter.getShapes();
        this.layer.shapesToRemove.push(shapes[1]);

    }, collisionJugadorConContenedorCorazon: function (arbiter, space) {
        cc.audioEngine.playEffect(res.recoger_contenedorCorazon_wav);
        iuLayer.nuevoCorazon();
        var shapes = arbiter.getShapes();
        this.layer.shapesToRemove.push(shapes[1]);

    }, collisionJugadorConBombaRecolectable: function (arbiter, space) {

        var shapes = arbiter.getShapes();
         cc.audioEngine.playEffect(res.recoger_item_wav);
        for (var i = 0; i < this.layer.bombaRecolectable.length; i++) {
            if (this.layer.bombaRecolectable[i].shape === shapes[1]) {
                this.layer.bombaRecolectable[i].agregarBombas();
            }
        }
        this.layer.shapesToRemove.push(shapes[1]);

    }, collisionJugadorConFlechaRecolectable: function (arbiter, space) {

        var shapes = arbiter.getShapes();
        cc.audioEngine.playEffect(res.recoger_item_wav);
        for (var i = 0; i < this.layer.flechasRecolectables.length; i++) {
            if (this.layer.flechasRecolectables[i].shape === shapes[1]) {
                this.layer.flechasRecolectables[i].agregarFlechas();
            }
        }
        this.layer.shapesToRemove.push(shapes[1]);

    }, collisionJugadorConLlaveNormal: function (arbiter, space) {

        var shapes = arbiter.getShapes();
        cc.audioEngine.playEffect(res.llave_normal_wav);
        for (var i = 0; i < this.layer.llavesNormales.length; i++) {
            if (this.layer.llavesNormales[i].shape === shapes[1]) {
                this.layer.llavesNormales[i].agregarLlaves();
            }
        }
        this.layer.shapesToRemove.push(shapes[1]);

    }, collisionJugadorConLlaveJefe: function (arbiter, space) {

        var shapes = arbiter.getShapes();
        cc.audioEngine.playEffect(res.llave_jefe_wav);
        for (var i = 0; i < this.layer.llavesJefe.length; i++) {
            if (this.layer.llavesJefe[i].shape === shapes[1]) {
                this.layer.llavesJefe[i].agregarLlaves();
            }
        }
        this.layer.shapesToRemove.push(shapes[1]);

    }, collisionJugadorConRupia: function (arbiter, space) {
        var shapes = arbiter.getShapes();
         cc.audioEngine.playEffect(res.obtener_rupia_wav);
        for (var i = 0; i < this.layer.rupias.length; i++) {
            if (this.layer.rupias[i].shape === shapes[1]) {
                this.layer.rupias[i].agregarRupias();

            }
        }
        this.layer.shapesToRemove.push(shapes[1]);

    }, transportarLink: function (arbiter, space) {
        this.layer.transicion(arbiter,space);

    }, destruirJarron: function (arbiter, space) {
        var shapes = arbiter.getShapes();
        if (this.layer.link.sword) {
            if (this.layer.mathUtil.isInViewCone(this.layer.link.body.p, shapes[1].body.p, 0.5, this.layer)) {
                this.layer.shapesToRemove.push(shapes[1]);
            }
        }

    }, collisionEspadaConEnemigo: function (arbiter, space) {
        var shapes = arbiter.getShapes();

        if (this.layer.link.sword) {
            if (this.layer.mathUtil.isInViewCone(this.layer.link.body.p, shapes[1].body.p, 0.5, this.layer)) {
                //var normal =  arbiter.getContactPointSet()[0].normal;
                //shapes[1].getBody().applyImpulse(cc.v(normal.x*10,normal.y*10),cp.v(0,0));
                this.layer.shapesToRemove.push(shapes[1]);
            }
        }

    }, reducirVidas: function (arbiter, space) {
        iuLayer.quitarVidas();

    }, collisionJugadorConDisparo: function (arbiter, space) {
        var shapes = arbiter.getShapes();
        var vel = shapes[1].getBody().getVel();
        this.layer.shapesToRemove.push(shapes[1]);
        iuLayer.quitarVidas();

    }, pulsarInterruptor: function (arbiter, space) {
        var shapes = arbiter.getShapes();
        for (var key in this.layer.interruptores) {
            for (var object in this.layer.interruptores[key]) {
                if (this.layer.interruptores[key][object].shape === shapes[1]) {
                    this.layer.interruptores[key][object].activarInterruptor();
                }
            }
        }

    }, actualizarCamaraZona: function (arbiter, space) {
        var shapes = arbiter.getShapes();
        var shape = shapes[1];
        this.layer.cambiarZona(shape.data);
        //this.layer.cambiarZona(shape.getBody().getUserData());


    }, abrirCofre: function (arbiter, space) {
        var shapes = arbiter.getShapes();
        if (this.layer.link.sword) {
            if (this.layer.mathUtil.isInViewCone(this.layer.link.body.p, shapes[1].body.p, 0.5, this.layer)) {
                for (var i=0;i<this.layer.cofres.length;i++) {
                    if (this.layer.cofres[i].shape === shapes[1]) {
                        this.layer.cofres[i].abrir();
                    }
                }

            }
        }
    },abrirPuerta:function(arbiter,space){
        var shapes=arbiter.getShapes();
         if (this.layer.link.sword) {
            if (this.layer.mathUtil.isInViewCone(this.layer.link.body.p, shapes[1].body.p, 0.5, this.layer)) {

                for(var i=0;i<this.layer.puertas.length;i++)
                 {
                    if(this.layer.puertas[i].shape==shapes[1])
                    {
                        this.layer.shapesToRemove.push(shapes[1]);
                    }
                 }

            }
         }
    },collisionBombaConKeaton: function(arbiter, space){

         var shapes = arbiter.getShapes();
         this.layer.shapesToRemove.push(shapes[1]);
    }

});