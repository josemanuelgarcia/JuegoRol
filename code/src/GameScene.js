var idCapaJuego = 1;
var idCapaControles = 2;
var idCapaHistoria=3;
var cargarPartida = false;
var weapon="ARCO";
var animationManager=null;
var collisionManager =null;
var posicion=cc.p(400,400);

var GameLayer = cc.Layer.extend({
    space: null,
    link: null,
    mapa: null,
    mathUtil:null,
    mapaAncho: null,
    mapaAlto: null,
    keyPulsada: null,
    disparosEnemigos: [],
    octorock: null,
    depuracion: null,
    corazones:[],
    bombaRecolectable:[],
    flechasRecolectables:[],
    contenedoresCorazon:[],
    llavesNormales:[],
    llavesJefe:[],
    rupias:[],
    shapesToRemove: [],
    cuevas:[],
    jarrones:[],
    bloques:[],
    soldado:null,
    //Teclado
    teclasPulsadas:[],

    ctor: function () {

        this._super();
        var size = cc.winSize;
        this.mathUtil = new MathUtil();



        //Creación del espacio del juego
        this.space = new cp.Space();
        //La gravedad en este juego da igual.
        this.space.gravity = cp.v(0, 0);
        //Add the Debug Layer:
       //var depuracion = new cc.PhysicsDebugNode(this.space);
       //this.addChild(depuracion, 10);
        animationManager=new AnimationManager();
        //Cargamos el Mapa
        this.cargarMapa();

         //Creacion enemigo prueba
        this.octorok = new Octorok(this.space, cc.p(600, 250), this);


        //obtenemos la posicion guardada
        var posicionX = parseInt(loadDollNum("xLink",1));
        var posicionY = parseInt(loadDollNum("yLink",1));

       //Si exista una posicion guiardada y se ha dado a cargar partida entramos
        if(cargarPartida && posicionX != 0 && posicionY != 0){

            posicion=cc.p(posicionX,posicionY);

        }

        this.link = new Link(this.space, posicion, this);

        //creacion bomba de prueba
        this.bombaRecolectable.push(new BombaRecolectable(this.space,cc.p(550,300),this));

        //creacion de flecha de prueba
        this.flechasRecolectables.push(new FlechaRecolectable(this.space,cc.p(500,400),this));

        //Creacion de soldado de prueba
        this.soldado = new Soldado(this.space, cc.p(600, 200), this,"r");

        //creacion de corazon de prueba
        this.corazones.push(new Corazon(this.space,cc.p(550,200),this));

         //creacion contenedor de corazon de prueba
         this.contenedoresCorazon.push(new ContenedorCorazon(this.space,cc.p(450,400),this));

         //creacion de llave normal de prueba
          this.llavesNormales.push(new LlaveNormal(this.space,cc.p(400,350),this));

         //creacion de llave de jefe de prueba
            this.llavesJefe.push(new LlaveJefe(this.space,cc.p(450,350),this));

        //Creacion de rupias de diferentes colores  de prueba--------------
         var rupiaRoja = new Rupia(this.space,cc.p(600,200),this,"r");
         this.rupias.push(rupiaRoja);
         var rupiaAzul = new Rupia(this.space,cc.p(650,200),this,"a");
           this.rupias.push(rupiaAzul);
         var rupiaAmarilla = new Rupia(this.space,cc.p(520,200),this,"m");
           this.rupias.push(rupiaAmarilla);
         var rupiaVerde = new Rupia(this.space,cc.p(700,200),this,"v");
           this.rupias.push(rupiaVerde);
           this.space.addCollisionHandler(tipoJugador,tipoCueva,this.transicion.bind(this),null,null,null);
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
        this.octorok.update(dt);

        this.soldado.update(dt);

        this.link.update(dt);
        //Eliminar elementos
        for (var i = 0; i < this.shapesToRemove.length; i++) {
            var shape = this.shapesToRemove[i];
            //Eliminar boomerang si dicho boomerang es distinto de null
            if(this.link.boomerang!=null){
                if(this.link.boomerang.shape==shape) {
                    this.link.boomerang.eliminar();
                 }
            }
            //Eliminar octorock si impacta, mas adelante se recorreran todos los enemigos
            else if(this.octorok.shape==shape) {
                this.octorok.eliminar();
            }
            for(var i = 0; i< this.corazones.length; i++){
                if(this.corazones[i].shape===shape) {
                   this.corazones[i].eliminar();
                   this.corazones.splice(i,1);
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
                }
            }
            for(var i = 0; i<this.jarrones.length; i++) {
                if(this.jarrones[i].shape === shape)
                    this.jarrones[i].destruir();
            }

            if(this.soldado.shape == shape){
                this.soldado.eliminar();
            }
             for (var i = 0; i < this.bombaRecolectable.length; i++) {
                         if (this.bombaRecolectable[i].shape === shape) {
                              this.bombaRecolectable[i].eliminar();
                              this.bombaRecolectable.splice(i, 1);
                            }
                         }
              for (var i = 0; i < this.flechasRecolectables.length; i++) {
                          if (this.flechasRecolectables[i].shape === shape) {
                           this.flechasRecolectables[i].eliminar();
                            this.flechasRecolectables.splice(i, 1);
                                         }
                                      }
              for (var i = 0; i < this.contenedoresCorazon.length; i++) {
                              if (this.contenedoresCorazon[i].shape === shape) {
                               this.contenedoresCorazon[i].eliminar();
                               this.contenedoresCorazon.splice(i, 1);
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
        }
        this.shapesToRemove = [];

    }, procesarEventosKeyboard: function (keyCode, event) {
        var instancia = event.getCurrentTarget();
        //Al cambiar de ventana en el navegador entra un 18 no se por que
        if(instancia.keyPulsada != keyCode && keyCode!=18 && instancia.teclasPulsadas.length<3)
        {
            instancia.keyPulsada = keyCode;
            instancia.teclasPulsadas.push(keyCode);

        }

    }, dejarProcesarEventosKeyboard: function (keyCode, event) {
        var instancia = event.getCurrentTarget();
        instancia.eliminarTeclaPulsada(keyCode);
        //Controlamos la ultima teclaPulsada cuando se pulsan más de una
        if(instancia.teclasPulsadas.length<=1)
            instancia.keyPulsada=null;
        else if(instancia.teclasPulsadas.length>1){
            instancia.keyPulsada = instancia.teclasPulsadas[instancia.teclasPulsadas.length-1];
        }


    },eliminarTeclaPulsada(keyCode)
    {

       var index = this.teclasPulsadas.indexOf(keyCode);
       if(index>-1)
            this.teclasPulsadas.splice(index,1);

    }
    , cargarMapa: function () {

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

        //CUEVAS
        var cuevas = this.mapa.getObjectGroup("Cuevas");
        var cuevasArray = cuevas.getObjects();
        for(var i = 0; i<cuevasArray.length ; i++)
        {
            var x = cuevasArray[i]["x"];
            var y = cuevasArray[i]["y"];
            var salida = cuevasArray[i]["Salida"];
            var cueva = new Cueva(this.space,new cc.p(x,y),salida);
            this.cuevas.push(cueva);
        }

        //JARRONES
        var jarrones = this.mapa.getObjectGroup("Jarrones");
        var jarronesArray = jarrones.getObjects();
        for(var i = 0; i< jarronesArray.length ; i++)
        {
            var x = jarronesArray[i]["x"];
            var y = jarronesArray[i]["y"];
            var jarron = new Jarron(this.space,new cc.p(x,y),this);
            this.jarrones.push(jarron);
        }

        //ObjetosAnimados
        var objetosAnimados = this.mapa.getObjectGroup("ObjetosAnimados");
        var objetosAnimadosArray = objetosAnimados.getObjects();
        cc.log("ObjetosAnimados -> "+objetosAnimadosArray.length);
        for(var i = 0; i<objetosAnimadosArray.length;i++)
        {
            var x = objetosAnimadosArray[i]["x"];
            var y = objetosAnimadosArray[i]["y"];
            var tipo = objetosAnimadosArray[i]["tipo"];
            var objetoAnimado = new ObjetoAnimado(this.space,cc.p(x,y),this,tipo,4);

        }



    }, actualizarCamara: function () {
        var winSize = cc.winSize;

        var x = Math.max(this.link.body.p.x, winSize.width/2);
        var y = Math.max(this.link.body.p.y, winSize.height/2);

        x = Math.min(x, (this.mapa.getMapSize().width * this.mapa.getTileSize().width) - winSize.width / 2);
        y = Math.min(y, (this.mapa.getMapSize().height *this.mapa.getTileSize().height) - winSize.height/2);
        var actualPosition = cc.p(x, y);

        var centerOfView = cc.p(winSize.width/2, winSize.height/2);
        var viewPoint = cc.pSub(centerOfView, actualPosition);
        this.setPosition(viewPoint);

    },transicion:function(arbiter,space)
    {
        var shapes = arbiter.getShapes();
                 var shape = shapes[1];
                 var cueva = null;
                 for(var i = 0; i<this.cuevas.length ; i++) {
                     if(shape === this.cuevas[i].shape)
                         cueva = this.cuevas[i];
                 }

                 var pos = cueva.getPosSalida();
                 posicion = cc.p(pos.x,this.mapaAlto - pos.y);
         var nextScene=new CaveScene();
         cc.director.runScene(new cc.TransitionFade(3.0,nextScene));
    }
});
var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        collisionManager = new CollisionManager(layer.space,layer);
        this.addChild(layer, 0, idCapaJuego);
        iuLayer = new IULayer();
        this.addChild(iuLayer, 0, idCapaControles);
    },
    onExit:function(){
    }
});
