var space=null;
var idCapaJuego = 1;
var idCapaControles = 2;
var GameLayer = cc.Layer.extend({
    link:null,
    keyPulsada:null,
    ctor:function () {

        this._super();
        var size = cc.winSize;

        //Cachear recursos del juego
        cc.spriteFrameCache.addSpriteFrames(res.link_plist);
        //Creación del espacio del juego
         space = new cp.Space();
         //La gravedad en este juego da igual.
         space.gravity = cp.v(0, -50);
         //Creación del personaje link
        this.link=new Link( cc.p(200,200),this);
        //Manejo de eventos de TECLADO
        cc.eventManager.addListener({
                    event: cc.EventListener.KEYBOARD,
                    onKeyPressed:this.procesarEventosKeyboard,
                    onKeyReleased:this.dejarProcesarEventosKeyboard
                    },this);
        this.scheduleUpdate();
        return true;

    },procesarEventosKeyboard:function(keyCode, event){
        var instancia = event.getCurrentTarget();
        if(instancia.keyPulsada == keyCode)
              return;
        instancia.keyPulsada = keyCode;
        //Metodo que maneja los eventos de teclado
        if(keyCode==87 || keyCode==119){
            //W mover hacia arriba
            instancia.link.moverArriba();
        }
        if(keyCode==83 || keyCode==115){
            //S mover hacia abajo
            instancia.link.moverAbajo();
        }
        //Mover derecha
        if(keyCode==68 || keyCode==100)
        {
            instancia.link.moverDerecha();
        }
        //Mover izquierda
        if(keyCode==65 || keyCode==97)
        {
            instancia.link.moverIzquierda();
        }
    },dejarProcesarEventosKeyboard:function(keyCode, event){
        //Si se suelta alguna de las teclas de movimiento se eliminan todas las acciones
        if(keyCode==87 || keyCode==119 || keyCode==83 || keyCode==115 || keyCode==68 || keyCode==100 || keyCode==65 || keyCode==97)
        {
            var instancia = event.getCurrentTarget();
            instancia.keyPulsada = null;
            cc.director.getActionManager().removeAllActionsFromTarget(instancia.link.sprite, true);
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
