var idCapaCueva = 1;
var CaveLayer = cc.Layer.extend({
    space: null,
    link: null,
    mapa: null,
    mathUtil: null,
    mapaAncho: null,
    mapaAlto: null,
    keyPulsada: null,
    disparosEnemigos: [],
    depuracion: null,
    corazones: [],
    rupias: [],
    shapesToRemove: [],
    cuevas: [],
    jarrones: [],
    bloques: [],
    interruptores: [],
    cofres: [],
    zonas: [],
    puertas:[],
    llavesNormales: [],
    llavesJefe: [],
    zonaActual: null,
    //Teclado
    teclasPulsadas: [],
    soyCaveScene:true,

    ctor: function () {

        this._super();
        var size = cc.winSize;
        this.mathUtil = new MathUtil();

        //Cachear recursos del juego
        cc.spriteFrameCache.addSpriteFrames(res.link_plist);
        cc.spriteFrameCache.addSpriteFrames(res.boomerang_plist);
        cc.spriteFrameCache.addSpriteFrames(res.explosion_plist);
        cc.spriteFrameCache.addSpriteFrames(res.jarron_plist);
        cc.spriteFrameCache.addSpriteFrames(res.objetosMazmorra_plist);
        //Creación del espacio del juego
        this.space = new cp.Space();
        //La gravedad en este juego da igual.
        this.space.gravity = cp.v(0, 0);
        //Add the Debug Layer:

        animationManager = new AnimationManager();
        //Cargamos el Mapa
        this.cargarMapa();
        collisionManager = new CollisionManager(this.space, this);

        var depuracion = new cc.PhysicsDebugNode(this.space);
        this.addChild(depuracion, 10);
        //obtenemos la posicion guardada
        var posicionX = parseInt(loadDollNum("xLink", 1));
        var posicionY = parseInt(loadDollNum("yLink", 1));
        //Si exista una posicion guiardada y se ha dado a cargar partida entramos
        if (cargarPartida && posicionX != 0 && posicionY != 0) {
            posicion = cc.p(posicionX, posicionY);

        }
        //en caso contrario cargamos posicion por defecto
        else {
            posicion = cc.p(600, 400);
        }
        this.link = new Link(this.space, posicion, this);



        //------------------------------------------------------------------


        //ARMA INICIAL
        //this.depuracion = new cc.PhysicsDebugNode(this.space);
        //this.addChild(this.depuracion, 10);
        //----------------------------------------------------------------
        //Ejemplo de uso de capa historia comentado quedaria
        //solo añadir en dicha capa que el texto lo ponga sobre una imagen como de cuadro de  dialogo
        /*this.addChild(new HistoryLayer(this,"Prueba"),0,4);
        cc.director.pause();*/
        //----------------------------------------------------------------
        //Manejo de eventos de TECLADO
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.procesarEventosKeyboard,
            onKeyReleased: this.dejarProcesarEventosKeyboard
        }, this);
        this.scheduleUpdate();

        return true;

    }, update: function (dt) {
        //Camara mapa inicial del personaje
        this.space.step(dt);
        this.actualizarCamara();
        this.link.update(dt);
        this.abrirCofre();
        //Eliminar elementos
        for (var i = 0; i < this.shapesToRemove.length; i++) {
            var shape = this.shapesToRemove[i];
            //Eliminar boomerang si dicho boomerang es distinto de null
            if (this.link.boomerang != null) {
                if (this.link.boomerang.shape == shape) {
                    this.link.boomerang.eliminar();
                }
            }
            //Eliminar octorock si impacta, mas adelante se recorreran todos los enemigos

            if(this.zonaActual!=undefined){
            this.zonaActual.eliminarEnemigo(shape);
            }

            for (var i = 0; i < this.corazones.length; i++) {
                if (this.corazones[i].shape === shape) {
                    this.corazones[i].eliminar();
                    this.corazones.splice(i, 1);
                }
            }
            for (var i = 0; i < this.rupias.length; i++) {
                if (this.rupias[i].shape === shape) {
                    this.rupias[i].eliminar();
                    this.rupias.splice(i, 1);
                }
            }
            for (var i = 0; i < this.disparosEnemigos.length; i++) {
                if (this.disparosEnemigos[i].shape === shape) {
                    this.disparosEnemigos[i].eliminar();
                    this.disparosEnemigos.splice(i, 1);
                }
            }
            for (var i = 0; i < this.jarrones.length; i++) {
                if (this.jarrones[i].shape === shape)
                {
                    this.jarrones[i].destruir();
                    this.jarrones.splice(i, 1);
                }
            }
            for (var i = 0; i < this.puertas.length; i++) {
               if (this.puertas[i].shape === shape)
               {
                        if((iuLayer.llavesJefe>0 && this.puertas[i].tipo!="normal") || (iuLayer.llavesNormales>0 && this.puertas[i].tipo=="normal"))
                        {
                              if(this.puertas[i].tipo=="normal")
                              {
                                iuLayer.llavesNormales--;
                                this.puertas[i].eliminar();
                                this.puertas.splice(i, 1);
                              }
                              else
                              {
                                iuLayer.llavesJefe--;
                                this.puertas[i].eliminar();
                                this.puertas.splice(i, 1);
                                var id=this.puertas[i].id;
                                for(var j=0;j<this.puertas.length;j++)
                                {
                                    if(this.puertas[j].id==id)
                                    {
                                        this.puertas[i].eliminar();
                                        this.puertas.splice(i, 1);
                                    }
                                }

                              }
                        }
                }
             }
            /* if(this.soldado.shape == shape){
                 this.soldado.eliminar();
             }*/
            this.shapesToRemove = [];
        }
        //Actualizar enemigos de la mazmorra
        if (this.zonaActual != null) {
            for (var j = 0; j < this.zonaActual.enemigos.length; j++) {
                this.zonaActual.enemigos[j].update(dt);
            }

            //Enemigos de zona muertos y dicha zona tiene cofre
            if (this.zonaActual.enemigos.length == 0 && this.zonaActual.cofre != null) {
                this.cofres[parseInt(this.zonaActual.cofre) - 1].cofreAparece();
            }
        }

            for (var i = 0; i < this.llavesNormales.length; i++) {
                if (this.llavesNormales[i].shape === shape) {
                    this.llavesNormales[i].eliminar();
                    this.llavesNormales.splice(i, 1);
                }
            }
            for (var i = 0; i < this.llavesJefe.length; i++) {
                if (this.llavesJefe[i].shape === shape) {
                    this.llavesJefe[i].eliminar();
                    this.llavesJefe.splice(i, 1);
                }
            }
    }, procesarEventosKeyboard: function (keyCode, event) {
        var instancia = event.getCurrentTarget();
        //Al cambiar de ventana en el navegador entra un 18 no se por que
        if (instancia.keyPulsada != keyCode && keyCode != 18) {
            instancia.keyPulsada = keyCode;
            instancia.teclasPulsadas.push(keyCode);

        }

    }, dejarProcesarEventosKeyboard: function (keyCode, event) {
        var instancia = event.getCurrentTarget();
        instancia.eliminarTeclaPulsada(keyCode);
        //Controlamos la ultima teclaPulsada cuando se pulsan más de una
        if (instancia.teclasPulsadas.length <= 1)
            instancia.keyPulsada = null;
        else if (instancia.teclasPulsadas.length > 1) {
            instancia.keyPulsada = instancia.teclasPulsadas[instancia.teclasPulsadas.length - 1];
        }


    }, eliminarTeclaPulsada(keyCode) {

        var index = this.teclasPulsadas.indexOf(keyCode);
        if (index > -1)
            this.teclasPulsadas.splice(index, 1);

    }
    , cargarMapa: function () {

        this.mapa = new cc.TMXTiledMap(res.dungeon1_tmx);
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


        //JARRONES
        var jarrones = this.mapa.getObjectGroup("Jarrones");
        var jarronesArray = jarrones.getObjects();
        for (var i = 0; i < jarronesArray.length; i++) {
            var x = jarronesArray[i]["x"];
            var y = jarronesArray[i]["y"];
            var jarron = new Jarron(this.space, new cc.p(x, y), this);
            this.jarrones.push(jarron);
        }
        //INTERRUPTORES
        var interruptore = this.mapa.getObjectGroup("Interruptores");
        var interruptoresArray = interruptore.getObjects();
        for (var i = 0; i < interruptoresArray.length; i++) {
            var x = interruptoresArray[i]["x"];
            var y = interruptoresArray[i]["y"];
            var interruptor = new Interruptor(this.space, new cc.p(x, y), this);
            //HASHMAP IMPROVISADO
            if (this.interruptores[interruptoresArray[i]["cofre"]] == undefined) {
                this.interruptores[interruptoresArray[i]["cofre"]] = new Array();
            }
            this.interruptores[interruptoresArray[i]["cofre"]].push(interruptor);
        }
        var cofres = this.mapa.getObjectGroup("Cofres");
        var cofresArray = cofres.getObjects();
        for (var i = 0; i < cofresArray.length; i++) {
            var x = cofresArray[i]["x"];
            var y = cofresArray[i]["y"];
            var cofre = new Cofre(this.space, new cc.p(x, y), this, cofresArray[i]["Cofre"], cofresArray[i]["botin"], cofresArray[i]["visible"]);
            this.cofres.push(cofre);
        }
        //ZONAS
        var zonas = this.mapa.getObjectGroup("Zones");
        var zonasArray = zonas.getObjects();
        for (var i = 0; i < zonasArray.length; i++) {
            var x = zonasArray[i]["x"];
            var y = zonasArray[i]["yZona"];
            var zona = new Zona(this.space, x, this.mapaAlto - (parseInt(y) + zonasArray[i]["height"]), zonasArray[i]["width"], zonasArray[i]["height"], zonasArray[i]["Id"], this, zonasArray[i]["cofre"]);
            this.zonas.push(zona);
            //Creacion de los enemigos de dicha zona

        }

        //ObjetosAnimados
               var objetosAnimados = this.mapa.getObjectGroup("ObjetosAnimados");
               var objetosAnimadosArray = objetosAnimados.getObjects();
               for (var i = 0; i < objetosAnimadosArray.length; i++) {
                   var x = objetosAnimadosArray[i]["x"];
                   var y = objetosAnimadosArray[i]["y"];
                   var tipo = objetosAnimadosArray[i]["tipo"];
                   var objetoAnimado = new ObjetoAnimado(this.space, cc.p(x, y), this, tipo, 4);

               }
        //Puertas
                       var puertas = this.mapa.getObjectGroup("Pasos");
                       var puertasArray = puertas.getObjects();
                       for (var i = 0; i < puertasArray.length; i++) {
                           var x = puertasArray[i]["x"];
                           var y = puertasArray[i]["y"];
                           var tipo = puertasArray[i]["tipo"];
                           var id = puertasArray[i]["id"];
                           var puerta = new Puerta(this.space, cc.p(x, y), this, tipo, id);
                            this.puertas.push(puerta);
                       }


    }, cambiarZona: function (zona) {
        this.zonaActual = zona;

    }, actualizarCamara: function () {
        var winSize = cc.winSize;

        var x = Math.max(this.link.body.p.x, winSize.width / 2);
        var y = Math.max(this.link.body.p.y, winSize.height / 2);
        x = Math.min(x, (this.mapa.width * this.mapa.getTileSize().width) + 200 - winSize.width / 2);
        y = Math.min(y, (this.mapa.height * this.mapa.getTileSize().height) + 200 - winSize.height / 2);
        var actualPosition = cc.p(x, y);

        var centerOfView = cc.p(winSize.width / 2, winSize.height / 2);
        var viewPoint = cc.pSub(centerOfView, actualPosition);
        this.setPosition(viewPoint);

    }, abrirCofre: function () {
        for (var key in this.interruptores) {
            var cofreAbierto = true;
            for (var object in this.interruptores[key]) {
                if (!this.interruptores[key][object].pulsado) {
                    cofreAbierto = false;
                }
            }
            if (cofreAbierto) {
                for (var i = 0; i < this.cofres.length; i++) {
                    //MIRAS A VER EL COFRE ABIERTO
                    if (this.cofres[i].idCofre == key) {
                        this.cofres[i].cofreAparece();
                    }
                }
            }
        }
    }, transicion: function () {

     var nextScene = new GameScene();
             cc.director.runScene(new cc.TransitionFade(3.0, nextScene));
              cc.audioEngine.playMusic(res.templo_mp3, true);

         }
});

var CaveScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.resume();
        var layer = new CaveLayer();
        this.addChild(layer, 0, idCapaCueva);
        iuLayer = new IULayer();
        this.addChild(iuLayer, 0, idCapaControles);
    }
});