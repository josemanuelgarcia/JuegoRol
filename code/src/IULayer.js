var IULayer = cc.Layer.extend({
    spriteBotonMenu:null,


    ctor:function () {
        this._super();
        var size = cc.winSize;



        // spriteBotonMenu
        this.spriteBotonMenu = cc.Sprite.create(res.boton_saltar_png);
        this.spriteBotonMenu.setPosition(cc.p(200,200));

        this.addChild(this.spriteBotonMenu);

        // Registrar Mouse Down
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
onMouseDown: this.procesarMouseDown
        }, this)

        this.scheduleUpdate();
        return true;
    },update:function (dt) {

    },procesarMouseDown:function(event) {
        var instancia = event.getCurrentTarget();
        var areaBoton = instancia.spriteBotonMenu.getBoundingBox();
console.log("Boton creado");
        // La pulsación cae dentro del botón
        if (cc.rectContainsPoint(areaBoton,
            cc.p(event.getLocationX(), event.getLocationY()) )){

console.log("Has pinchado en el boton");



        }
    }

});
