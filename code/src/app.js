var space=null;
var GameLayer = cc.Layer.extend({
    link:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        //Cachear recursos del juego
        cc.spriteFrameCache.addSpriteFrames(res.link_plist);
        //Creación del espacio del juego
         space = new cp.Space();
         space.gravity = cp.v(0, -350);
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
        //Metodo que maneja los eventos de teclado
        if(keyCode==87 || keyCode==119){
        //W mover hacia arriba
        var instancia = event.getCurrentTarget();
        instancia.link.moverArriba();
        }
        if(keyCode==83 || keyCode==115){
        //S mover hacia abajo
        var instancia = event.getCurrentTarget();
        instancia.link.moverAbajo();
        }
    },dejarProcesarEventosKeyboard:function(keyCode, event){
        //Si se suelta alguna de las teclas de movimiento se eliminan todas las acciones
        if(keyCode==87 || keyCode==119 || keyCode==83 || keyCode==115)
        {
            var instancia = event.getCurrentTarget();
            cc.director.getActionManager().removeAllActionsFromTarget(instancia.link.sprite, true);
        }
    }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

