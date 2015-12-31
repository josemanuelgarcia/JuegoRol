var idCapaJuego = 1;
var idCapaControles = 2;
var idCapaHistoria=3;
var weapon="ARCO";
var posicion=null;
var animationManager=null;
var collisionManager=null;
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
    rupias:[],
    shapesToRemove: [],
    cuevas:[],
    jarrones:[],
    movementKeysPressed:[],
    ctor: function () {

        this._super();
        var size = cc.winSize;
        this.mathUtil = new MathUtil();
        animationManager = new AnimationManager();
        if(posicion==null)
        {
            posicion=cc.p(400,400);
        }
        //Cachear recursos del juego
        cc.spriteFrameCache.addSpriteFrames(res.link_plist);
         cc.spriteFrameCache.addSpriteFrames(res.boomerang_plist);
         cc.spriteFrameCache.addSpriteFrames(res.bomb_plist);
         cc.spriteFrameCache.addSpriteFrames(res.jarron_plist);

        //Creación del espacio del juego
        this.space = new cp.Space();
        //La gravedad en este juego da igual.
        this.space.gravity = cp.v(0, 0);
        //Add the Debug Layer:
       //var depuracion = new cc.PhysicsDebugNode(this.space);
       //this.addChild(depuracion, 10);
        //Cargamos el Mapa
        this.cargarMapa();
        //Creación del personaje link
        this.link = new Link(this.space, posicion, this);
        //Creacion enemigo prueba
        this.octorok = new Octorok(this.space, cc.p(600, 250), this);
        //creacion de corazon de prueba
        this.corazones.push(new Corazon(this.space,cc.p(550,200),this));

        //Creacion de rupias de diferentes colores  de prueba--------------
         var rupiaRoja = new Rupia(this.space,cc.p(600,200),this,"r");
         this.rupias.push(rupiaRoja);
         var rupiaAzul = new Rupia(this.space,cc.p(650,200),this,"a");
           this.rupias.push(rupiaAzul);
         var rupiaAmarilla = new Rupia(this.space,cc.p(520,200),this,"m");
           this.rupias.push(rupiaAmarilla);
         var rupiaVerde = new Rupia(this.space,cc.p(700,200),this,"v");
           this.rupias.push(rupiaVerde);
        //------------------------------------------------------------------

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
        this.link.update(dt);
        //Eliminar elementos
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
            else if(this.octorok.shape==shape)
            {
                this.octorok.eliminar();
            }
            for(var i = 0; i< this.corazones.length; i++){
                if(this.corazones[i].shape===shape)
                {
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
            for(var i = 0; i<this.jarrones.length; i++)
            {
                if(this.jarrones[i].shape === shape)
                    this.jarrones[i].destruir();
            }
        }
        this.shapesToRemove = [];

    }, procesarEventosKeyboard: function (keyCode, event) {
        var instancia = event.getCurrentTarget();
        if (instancia.keyPulsada == keyCode && (keyCode != 77 && keyCode != 109 && keyCode!=cc.KEY.n && keyCode!=cc.KEY.N)) {
            return;
        }
        instancia.keyPulsada = keyCode;
        //Utilizar armas
        instancia.useWeapon(keyCode,instancia);
        //Metodo que maneja los eventos de teclado de movimiento
        instancia.movementLink(keyCode,instancia);
    }, dejarProcesarEventosKeyboard: function (keyCode, event) {
        var instancia = event.getCurrentTarget();
        //Si se suelta alguna de las teclas de movimiento se eliminan todas las acciones
        if (keyCode == cc.KEY.W || keyCode == cc.KEY.w || keyCode == cc.KEY.s || keyCode == cc.KEY.S
        || keyCode == cc.KEY.A || keyCode == cc.KEY.a || keyCode == cc.KEY.D || keyCode == cc.KEY.d) {
            instancia.keyPulsada = null;
            instancia.movementKeysPressed[keyCode]=false;
            //Si ninguna tecla de movimiento esta pulsada se para
            if(!instancia.isMovementKeyPressed())
            {
                instancia.link.parado();
                //instancia.link.sprite.stopAllActions();
            }
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
        cc.log("Jarrones: "+ jarronesArray.length);
        for(var i = 0; i< jarronesArray.length ; i++)
        {
            var x = jarronesArray[i]["x"];
            var y = jarronesArray[i]["y"];
            var jarron = new Jarron(this.space,new cc.p(x,y),this);
            this.jarrones.push(jarron);
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

    },useWeapon: function(keyCode,instancia){
        if (keyCode == cc.KEY.M || keyCode == cc.KEY.m) {
             instancia.link.utilizarEspada();
         }
                //Utilizar tecla k arma seleccionada
        else if( keyCode==cc.KEY.K || keyCode==cc.KEY.k)
          {
            if(weapon=="BOOMERANG")
            {
             instancia.link.utilizarBoomerang();
            }
            if(weapon=="BOMBAS")
            {
              instancia.link.utilizarBombas();
            }
          }
    },movementLink: function(keyCode,instancia){
        if((keyCode==cc.KEY.n || keyCode==cc.KEY.n)&& this.isMovementKeyPressed())
        {
            instancia.link.rodar();
        }
        else if (keyCode == cc.KEY.W || keyCode == cc.KEY.w)
        {
            //W mover hacia arriba
            instancia.link.moverArriba();
            //Añadir tecla pulsada
            instancia.movementKeysPressed[keyCode]=true;
        }
        else if (keyCode == cc.KEY.S || keyCode == cc.KEY.s)
        {
          //S mover hacia abajo
          instancia.link.moverAbajo();
          instancia.movementKeysPressed[keyCode]=true;
        }
                //Mover derecha
        else if (keyCode == cc.KEY.D || keyCode == cc.KEY.d)
        {
            instancia.link.moverDerecha();
            instancia.movementKeysPressed[keyCode]=true;
        }
                //Mover izquierda
        else if (keyCode == cc.KEY.A || keyCode == cc.KEY.a)
        {
            instancia.link.moverIzquierda();
            instancia.movementKeysPressed[keyCode]=true;
        }
    },isMovementKeyPressed:function(keyCode){
        for(var i=0;i<this.movementKeysPressed.length;i++)
        {
            if(this.movementKeysPressed[i])
            {
                return true;
            }
        }
        return false;
    }
});

var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();

        this.addChild(layer, 0, idCapaJuego);
        iuLayer = new IULayer();
        this.addChild(iuLayer, 0, idCapaControles);
        collisionManager = new CollisionManager(layer.space,layer);
    }
});
