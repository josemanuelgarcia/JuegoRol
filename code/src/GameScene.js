var idCapaJuego = 1;
var idCapaControles = 2;
var GameLayer = cc.Layer.extend({
    space:null,
    link:null,
    mapa:null,
    mapaAncho:null,
    mapaAlto:null,
    ultimaXConocida:null,
    ultimaYConocida:null,
    keyPulsada:null,
    disparosEnemigos:[],
    enemigos:[],
    ctor:function () {

        this._super();
        var size = cc.winSize;

        //Cachear recursos del juego
        cc.spriteFrameCache.addSpriteFrames(res.link_plist);
        //Creación del espacio del juego
         this.space = new cp.Space();
         //La gravedad en este juego da igual.
         this.space.gravity = cp.v(0, 0);
         //Creación del personaje link
        this.link=new Link(this.space, cc.p(400,400),this);


        //Creacion enemigo prueba
        var octorok = new Octorock(this.space, cc.p(300,250),this);
        this.enemigos.push(octorok);

        //Manejo de eventos de TECLADO
        cc.eventManager.addListener({
                    event: cc.EventListener.KEYBOARD,
                    onKeyPressed:this.procesarEventosKeyboard,
                    onKeyReleased:this.dejarProcesarEventosKeyboard
                    },this);
        this.ultimaXConocida=-this.link.body.p.x+300;
        this.ultimaYConocida=-this.link.body.p.y+300;
        this.cargarMapa();
        this.scheduleUpdate();

        return true;

    }, update:function(dt) {
        //Camara mapa inicial del personaje
        this.space.step(dt);
        this.actualizarCamara();
        for (var i = 0; i < this.enemigos.length; i++) {
             this.enemigos[i].update(dt);
        }

        for ( var i=0; i< this.disparosEnemigos.length; i++) {
            this.disparosEnemigos[i].update(dt);
        }

    }, procesarEventosKeyboard:function(keyCode, event){
        var instancia = event.getCurrentTarget();
        if(instancia.keyPulsada == keyCode)
              return;
        instancia.keyPulsada = keyCode;
        //Metodo que maneja los eventos de teclado
        if(keyCode==87 || keyCode==119){
            //W mover hacia arriba
            instancia.link.moverArriba();
        }
        else if(keyCode==83 || keyCode==115){
            //S mover hacia abajo
            instancia.link.moverAbajo();
        }
        //Mover derecha
        else if(keyCode==68 || keyCode==100)
        {
            instancia.link.moverDerecha();
        }
        //Mover izquierda
        else if(keyCode==65 || keyCode==97)
        {
            instancia.link.moverIzquierda();
        }
        //barra espaciadora seria abrir el menu de objetos
        if(keyCode==32){
             cc.director.resume();
             cc.director.runScene(new MenuObjetosScene());
        }
    },dejarProcesarEventosKeyboard:function(keyCode, event){
        //Si se suelta alguna de las teclas de movimiento se eliminan todas las acciones
        if(keyCode==87 || keyCode==119 || keyCode==83 || keyCode==115 || keyCode==68 || keyCode==100 || keyCode==65 || keyCode==97)
        {
            var instancia = event.getCurrentTarget();
            instancia.keyPulsada = null;
            cc.director.getActionManager().removeAllActionsFromTarget(instancia.link.sprite, true);
        }
    },cargarMapa:function(){
        this.mapa=new cc.TMXTiledMap(res.mapa_inicial_tmx);
        // Añadirlo a la Layer
        this.addChild(this.mapa);
        this.mapaAncho = this.mapa.getContentSize().width;
        this.mapaAlto = this.mapa.getContentSize().height;
    },actualizarCamara:function(){
        var size=cc.winSize;
         //X
        if(this.link.body.p.x>=(this.mapaAncho-(size.width)+300) || this.link.body.p.x<=size.width/2){
            if(this.link.body.p.y>=size.height/2 && this.link.body.p.y<=(this.mapaAlto-(size.height)+300)){
                this.ultimaYConocida=-this.link.body.p.y+300;
                this.setPosition(this.ultimaXConocida,-this.link.body.p.y+300);
            }
        }
        //Y
        else if(this.link.body.p.y<=size.height/2 || this.link.body.p.y>=(this.mapaAlto-(size.height)+300)){
            if(this.link.body.p.x<=(this.mapaAncho-(size.width)+300) && this.link.body.p.x>=size.width/2){
                this.ultimaXConocida=-this.link.body.p.x+300;
                this.setPosition(-this.link.body.p.x+300,this.ultimaYConocida);
            }
        }
        //NO SE SALE NI POR X NI POR Y ACTUALIZAR NORMAL
        else{
           this.ultimaXConocida=-this.link.body.p.x+300;
           this.ultimaYConocida=-this.link.body.p.y+300;
           this.setPosition(-this.link.body.p.x+300,-this.link.body.p.y+300);
        }
    }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
         this.addChild(layer, 0, idCapaJuego);
         var iuLayer = new IULayer();
             this.addChild(iuLayer, 0, idCapaControles);
    }
});
