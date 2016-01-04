var idCapaCueva = 1;
var CaveLayer = cc.Layer.extend({
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
    rupias:[],
    shapesToRemove: [],
    cuevas:[],
    zonas:[],
    jarrones:[],
    bloques:[],
    soldado:null,
    //Teclado
    teclasPulsadas:[],

    ctor: function () {

        this._super();
        var size = cc.winSize;
        this.mathUtil = new MathUtil();

        //Cachear recursos del juego
         cc.spriteFrameCache.addSpriteFrames(res.link_plist);
         cc.spriteFrameCache.addSpriteFrames(res.boomerang_plist);
         cc.spriteFrameCache.addSpriteFrames(res.explosion_plist);
         cc.spriteFrameCache.addSpriteFrames(res.jarron_plist);

        //Creación del espacio del juego
        this.space = new cp.Space();
        //La gravedad en este juego da igual.
        this.space.gravity = cp.v(0, 0);
        //Add the Debug Layer:
       var depuracion = new cc.PhysicsDebugNode(this.space);
       this.addChild(depuracion, 10);
        animationManager=new AnimationManager();
        //Cargamos el Mapa
        this.cargarMapa();
        this.setScale(1.6);
        this.setPosition(310,this.mapaAlto-1455);
         //Creacion enemigo prueba


        //obtenemos la posicion guardada
        var posicionX = parseInt(loadDollNum("xLink",1));
        var posicionY = parseInt(loadDollNum("yLink",1));
console.log("he salido de save");
       //Si exista una posicion guiardada y se ha dado a cargar partida entramos
        if(cargarPartida && posicionX != 0 && posicionY != 0){
        console.log("he entrado por el if ");
        posicion=cc.p(posicionX,posicionY);

        }
        //en caso contrario cargamos posicion por defecto
        else
        {
        console.log("he entrado por el else ");
        posicion=cc.p(400,400);
        }
        this.link = new Link(this.space, cc.p(304,this.mapaAlto-1552), this);
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
        //this.actualizarCamara();
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
            for(var i = 0; i<this.jarrones.length; i++) {
                if(this.jarrones[i].shape === shape)
                    this.jarrones[i].destruir();
            }

           /* if(this.soldado.shape == shape){
                this.soldado.eliminar();
            }*/
        }
        this.shapesToRemove = [];

    }, procesarEventosKeyboard: function (keyCode, event) {
        var instancia = event.getCurrentTarget();
        //Al cambiar de ventana en el navegador entra un 18 no se por que
        if(instancia.keyPulsada != keyCode && keyCode!=18)
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
            cc.log(instancia.teclasPulsadas);
            instancia.keyPulsada = instancia.teclasPulsadas[instancia.teclasPulsadas.length-1];
            cc.log(instancia.keyPulsada);
        }


    },eliminarTeclaPulsada(keyCode)
    {

       var index = this.teclasPulsadas.indexOf(keyCode);
       if(index>-1)
            this.teclasPulsadas.splice(index,1);

    }
    , cargarMapa: function () {

        this.mapa= new cc.TMXTiledMap("res/Mapas/Dungeon1/Dungeon1.tmx");
        console.log(this.mapa);
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
       /* var cuevas = this.mapa.getObjectGroup("Cuevas");
        var cuevasArray = cuevas.getObjects();
        for(var i = 0; i<cuevasArray.length ; i++)
        {
            var x = cuevasArray[i]["x"];
            var y = cuevasArray[i]["y"];
            var salida = cuevasArray[i]["Salida"];
            var cueva = new Cueva(this.space,new cc.p(x,y),salida);
            this.cuevas.push(cueva);
        }*/

        //JARRONES
        var jarrones = this.mapa.getObjectGroup("Jarrones");
        var jarronesArray = jarrones.getObjects();
        cc.log("Jarrones: "+ jarronesArray.length);
        for(var i = 0; i< jarronesArray.length ; i++)
        {
            var x = jarronesArray[i]["x"];
            var y = jarronesArray[i]["y"];
            var jarron = new Jarron(this.space,new cc.p(x,y),this);
            this.jarrones.push(jarron);
        }
         //JARRONES
          var zonas = this.mapa.getObjectGroup("Zones");
          var zonasArray = zonas.getObjects();
          for(var i = 0; i< zonasArray.length ; i++)
           {
               var x = zonasArray[i]["x"];
                    var y = zonasArray[i]["y"];
                    var zona = new Zona(new cc.p(x,this.mapaAlto-y));
                    this.zonas.push(zona);
           }
            cc.log(this.zonas[0].posCentral.x+"POOOOOOOOS");

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

    }
});

var CaveScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new CaveLayer();
        this.addChild(layer, 0, idCapaCueva);
        iuLayer = new IULayer();
        this.addChild(iuLayer, 0, idCapaControles);
    }
});