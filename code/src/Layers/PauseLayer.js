
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

         //MenuItemSprite para boton arco
         var menuGuardarSprite = new cc.MenuItemSprite(
         new cc.Sprite(res.boton_guardar_png), // IMG estado normal
         new cc.Sprite(res.boton_guardar_png), // IMG estado pulsado
         this.pulsarBotonGuardar, this);
         // menuArcoSprite.setOpacity(160);



          // creo el menú pasándole el boton del arco
          var menuGuardar = new cc.Menu(menuGuardarSprite);
          menuGuardar.setPosition(cc.p((size.width / 2), (size.height/2)+72 ));




        // Añado los menús a la escena
        this.addChild(menuPause);
        this.addChild(menuGuardar);


        return true;
    }, pulsarBotonArco: function () {
        this.scene.getChildByTag(2).entrar=true;
        this.scene.getChildByTag(2).pause=true;
        cc.director.resume();
        this.scene.removeChild(this);



    },pulsarBotonGuardar : function()
    {
    var gameScene=this.scene.getChildByTag(1);

    //obtenemos la posicion de link
   var x = gameScene.link.body.p.x;
   var y = gameScene.link.body.p.y;

   //guardamos la posicion de link en almacenamiento local
    saveDollNum("xLink",x);
    saveDollNum("yLink",y);
     this.scene.getChildByTag(2).entrar=true;
            this.scene.getChildByTag(2).pause=true;
            cc.director.resume();
            this.scene.removeChild(this);

    }

});





