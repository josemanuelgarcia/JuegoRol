var idCapaJuego = 1;
var idCapaControles = 2;

//Tipos para las colisiones
var tipoNoPasable = 1;
var tipoJugador = 2;
var tipoOctorok = 3;
var tipoDisparo = 4;
var tipoBoomerang=5;
var weapon="ARCO";

var GameLayer = cc.Layer.extend({
    space: null,
    link: null,
    mapa: null,
    mapaAncho: null,
    mapaAlto: null,
    ultimaXConocida: null,
    ultimaYConocida: null,
    keyPulsada: null,
    disparosEnemigos: [],
    octorock: null,
    depuracion: null,
    shapesToRemove: [],
    ctor: function () {

        this._super();
        var size = cc.winSize;

        //Cachear recursos del juego
        cc.spriteFrameCache.addSpriteFrames(res.link_plist);
         cc.spriteFrameCache.addSpriteFrames(res.boomerang_plist);
        //Creación del espacio del juego
        this.space = new cp.Space();
        //La gravedad en este juego da igual.
        this.space.gravity = cp.v(0, 0);
        //Add the Debug Layer:

        //Cargamos el Mapa
        this.cargarMapa();
        //Creación del personaje link
        this.link = new Link(this.space, cc.p(400, 400), this);

        //Creacion enemigo prueba
        this.octorok = new Octorok(this.space, cc.p(600, 250), this);
        //ARMA INICIAL
        //this.depuracion = new cc.PhysicsDebugNode(this.space);
        //this.addChild(this.depuracion, 10);


        //Manejo de eventos de TECLADO
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.procesarEventosKeyboard,
            onKeyReleased: this.dejarProcesarEventosKeyboard
        }, this);
        this.ultimaXConocida = -this.link.body.p.x + 300;
        this.ultimaYConocida = -this.link.body.p.y + 300;

        this.scheduleUpdate();

        //Colisiones entre elementos
        this.space.addCollisionHandler(tipoNoPasable, tipoOctorok,
            null, null, this.collisionObjetoConOctorok.bind(this), null);
        this.space.addCollisionHandler(tipoNoPasable, tipoDisparo,
            null, null, this.collisionObjetoConDisparo.bind(this), null);
         this.space.addCollisionHandler(tipoBoomerang, tipoJugador,
                    null,this.collisionBoomerangConJugador.bind(this), null, null);
         this.space.addCollisionHandler(tipoBoomerang, tipoNoPasable,
                             null,this.collisionBoomerangConNoPasable.bind(this), null, null);
          this.space.addCollisionHandler(tipoBoomerang, tipoOctorok,
                                      null,this.collisionBoomerangConOctorock.bind(this), null, null);
        this.space.addCollisionHandler(
            tipoJugador, tipoOctorok, null, null, null, this.reducirVidas.bind(this));


        return true;

    }, update: function (dt) {
        //Camara mapa inicial del personaje
        this.space.step(dt);
        this.actualizarCamara();
        this.octorok.update(dt);
        this.link.update(dt);
        //Eliminar los disparos que han impactado
        for (var i = 0; i < this.shapesToRemove.length; i++) {
            var shape = this.shapesToRemove[i];
            //Eliminar boomerang si dicho boomerang es distinto de null
            if(this.link.boomerang!=null){
            if(this.link.boomerang.shape==shape)
            {
                this.link.boomerang.eliminar();
            }
            }
            //Eliminar octorock si impacta, mas adelante se recorreran todos los enemigos
            if(this.octorok.shape==shape)
            {
                this.octorok.eliminar();
            }
            for (var i = 0; i < this.disparosEnemigos.length; i++) {
                if (this.disparosEnemigos[i].shape === shape) {
                    this.disparosEnemigos[i].eliminar();
                }
            }
        }
        this.shapesToRemove = [];

    }, procesarEventosKeyboard: function (keyCode, event) {
        var instancia = event.getCurrentTarget();
        if (instancia.keyPulsada == keyCode && (keyCode != 77 && keyCode != 109)) {
            return;
        }
        instancia.keyPulsada = keyCode;
        //Utilizar la espada tecla m
        if (keyCode == 77 || keyCode == 109) {
            instancia.link.utilizarEspada();
        }
        //Utilizar tecla n boomerang
        else if( keyCode==107 || keyCode==75)
        {
            console.log(weapon);
           if(weapon=="BOOMERANG")
           {
                instancia.link.utilizarBoomerang();
           }
        }
        //Metodo que maneja los eventos de teclado
       else if (keyCode == 87 || keyCode == 119) {
            //W mover hacia arriba
            instancia.link.moverArriba();
        }
        else if (keyCode == 83 || keyCode == 115) {
            //S mover hacia abajo
            instancia.link.moverAbajo();
        }
        //Mover derecha
        else if (keyCode == 68 || keyCode == 100) {
            instancia.link.moverDerecha();
        }
        //Mover izquierda
        else if (keyCode == 65 || keyCode == 97) {
            instancia.link.moverIzquierda();
        }
        //barra espaciadora seria abrir el menu de objetos
        if (keyCode == 32) {
            var gameScene = instancia.getParent();
            cc.director.pause();
            gameScene.addChild(new MenuObjetosLayer(gameScene), 0, 3);
        }
    }, dejarProcesarEventosKeyboard: function (keyCode, event) {
        //Si se suelta alguna de las teclas de movimiento se eliminan todas las acciones
        if (keyCode == 87 || keyCode == 119 || keyCode == 83 || keyCode == 115 || keyCode == 68 || keyCode == 100 || keyCode == 65 || keyCode == 97) {
            var instancia = event.getCurrentTarget();
            instancia.keyPulsada = null;
            instancia.link.parado();
            instancia.link.sprite.stopActionByTag(1);
            instancia.link.sprite.stopActionByTag(2);
            instancia.link.sprite.stopActionByTag(3);
        }
    }, cargarMapa: function () {

        this.mapa = new cc.TMXTiledMap(res.mapa_inicial_tmx);
        // Añadirlo a la Layer
        this.addChild(this.mapa);

        this.mapaAncho = this.mapa.getContentSize().width;
        this.mapaAlto = this.mapa.getContentSize().height;

        //Añadir colisiones con objetos no pasables
        var grupoObjetos = this.mapa.getObjectGroup("Colisiones");
        var colisionesArray = grupoObjetos.getObjects();

        for (var i = 0; i < colisionesArray.length; i++) {
            var suelo = colisionesArray[i];

            if (suelo.hasOwnProperty('polylinePoints')) {
                var puntos = suelo.polylinePoints;

                for (var j = 0; j < puntos.length - 1; j++) {
                    var bodySuelo = new cp.StaticBody();

                    var shapeSuelo = new cp.SegmentShape(bodySuelo,
                        cp.v(parseInt(suelo.x) + parseInt(puntos[j].x),
                            parseInt(suelo.y) - parseInt(puntos[j].y)),
                        cp.v(parseInt(suelo.x) + parseInt(puntos[j + 1].x),
                            parseInt(suelo.y) - parseInt(puntos[j + 1].y)),
                        1.0);
                    shapeSuelo.setCollisionType(tipoNoPasable);
                    shapeSuelo.setFriction(1);
                    this.space.addStaticShape(shapeSuelo);
                }
            } else {
                var bodySuelo = new cp.StaticBody();
                bodySuelo.setPos(cc.p(parseInt(suelo.x) + parseInt(suelo.width / 2), parseInt(suelo.y) + parseInt(suelo.height / 2)));
                var shapeSuelo = new cp.BoxShape(bodySuelo, parseInt(suelo.width), parseInt(suelo.height), 10);
                shapeSuelo.setCollisionType(tipoNoPasable);
                shapeSuelo.setFriction(1);
                this.space.addStaticShape(shapeSuelo);
            }


        }

    }, actualizarCamara: function () {
        var size = cc.winSize;
        //X
        if (this.link.body.p.x >= (this.mapaAncho - (size.width) + 300) || this.link.body.p.x <= size.width / 2) {
            if (this.link.body.p.y >= size.height / 2 && this.link.body.p.y <= (this.mapaAlto - (size.height) + 300)) {
                this.ultimaYConocida = -this.link.body.p.y + 300;
                this.setPosition(this.ultimaXConocida, -this.link.body.p.y + 300);
            }
        }
        //Y
        else if (this.link.body.p.y <= size.height / 2 || this.link.body.p.y >= (this.mapaAlto - (size.height) + 300)) {
            if (this.link.body.p.x <= (this.mapaAncho - (size.width) + 300) && this.link.body.p.x >= size.width / 2) {
                this.ultimaXConocida = -this.link.body.p.x + 300;
                this.setPosition(-this.link.body.p.x + 300, this.ultimaYConocida);
            }
        }
        //NO SE SALE NI POR X NI POR Y ACTUALIZAR NORMAL
        else {
            this.ultimaXConocida = -this.link.body.p.x + 300;
            this.ultimaYConocida = -this.link.body.p.y + 300;
            this.setPosition(-this.link.body.p.x + 300, -this.link.body.p.y + 300);
        }

    }, reducirVidas: function (arbiter, space) {
        iuLayer.quitarVidas();
        //TODO las vidas hay que quitarselas a link no a la interfaz xD

    }, collisionObjetoConOctorok: function (arbiter, space) {
        //  this.octorok.haChocado();

    }, collisionObjetoConDisparo: function (arbiter, space) {
        var shapes = arbiter.getShapes();
        this.shapesToRemove.push(shapes[1]);

    }, collisionBoomerangConJugador: function (arbiter, space) {
        if(this.link.boomerang.canBeDeleted) {
            var shapes = arbiter.getShapes();
            this.shapesToRemove.push(shapes[0]);
         }
    },collisionBoomerangConNoPasable: function (arbiter, space) {
        this.link.boomerang.choco=true;

    },collisionBoomerangConOctorock: function (arbiter, space) {
           var shapes = arbiter.getShapes();
           this.shapesToRemove.push(shapes[1]);
           //TODO quitar vida a octorok
    }
});

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer, 0, idCapaJuego);
        iuLayer = new IULayer();
        this.addChild(iuLayer, 0, idCapaControles);
    }
});
