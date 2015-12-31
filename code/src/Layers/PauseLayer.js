
var PauseLayer = cc.LayerColor.extend({
    scene: null,

    ctor: function (scene) {
        this._super();
        var size = cc.winSize;
        this.scene = scene;


        // Fondo
        var spriteFondoTitulo = new cc.Sprite(res.fondomenu_png);
        // Asigno posición central
        spriteFondoTitulo.setPosition(cc.p(size.width / 2, size.height / 2));
        // Lo escalo porque es más pequeño que la pantalla
        spriteFondoTitulo.setScale(size.height / spriteFondoTitulo.height);
        // Añado Sprite a la escena
        this.setOpacity(160);


        //MenuItemSprite para boton arco
        var menuPauseSprite = new cc.MenuItemSprite(
            new cc.Sprite(res.boton_jugar_png), // IMG estado normal
            new cc.Sprite(res.boton_jugar_png), // IMG estado pulsado
            this.pulsarBotonArco, this);
           // menuArcoSprite.setOpacity(160);



        // creo el menú pasándole el boton del arco
        var menuPause = new cc.Menu(menuPauseSprite);
        menuPause.setPosition(cc.p((size.width / 2), (size.height/2) ));




        // Añado los menús a la escena
        this.addChild(menuPause);



        return true;
    }, pulsarBotonArco: function () {
        this.scene.getChildByTag(2).entrar=true;
        this.scene.getChildByTag(2).pause=true;
        cc.director.resume();
        this.scene.removeChild(this);



    }

});





