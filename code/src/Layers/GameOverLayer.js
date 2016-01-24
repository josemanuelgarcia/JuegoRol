var GameOverLayer = cc.LayerColor.extend({
    scene: null,

    ctor: function (scene) {
        this._super();
        var size = cc.winSize;
        this.scene = scene;


         // Fondo
         var spriteFinish = new cc.Sprite(res.gameOver_png);
         // Asigno posición central
         spriteFinish.setPosition(cc.p(size.width / 2, (size.height / 2)+100));
         // Lo escalo porque es más pequeño que la pantalla
         spriteFinish.setScale(size.height / size.height);
          this.addChild(spriteFinish);
           this.setOpacity(160);

        // Fondo
                 var spriteMensaje = new cc.Sprite(res.mensaje_png);
                 // Asigno posición central
                 spriteMensaje.setPosition(cc.p((size.width / 2), (size.height / 2)));
                  // Lo escalo porque es más pequeño que la pantalla
                  spriteMensaje.setScale(size.height / size.height);
                  this.addChild(spriteMensaje);











        return true;
    }

});





