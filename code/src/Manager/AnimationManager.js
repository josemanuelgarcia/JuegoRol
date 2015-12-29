var AnimationManager=cc.Class.extend({
    objectToBeAnimated:null,
    animaciones:[],
    ctor: function(object){
        this.objectToBeAnimated=object;
    },addAnimationsLink:function()
         {
          //Animacion Simple Arriba
             var framesSimple = this.getAnimacion("link_arriba", 1);
             this.objectToBeAnimated.animaciones["SIMPLE_ARRIBA"] = cc.Animate.create(new cc.Animation(framesSimple, 0.05));
             //Animacion Simple Abajo
             var framesSimpleAbajo = this.getAnimacion("link_abajo", 1);
             this.objectToBeAnimated.animaciones["SIMPLE_ABAJO"] = cc.Animate.create(new cc.Animation(framesSimpleAbajo, 0.05));
             //Animacion Simple Lado
             var framesSimpleLado = this.getAnimacion("link_lado", 1);
             this.objectToBeAnimated.animaciones["SIMPLE_LADO"] = cc.Animate.create(new cc.Animation(framesSimpleLado, 0.05));
             //Animacion Caminar Abajo
             var framesCaminarAbajo = this.getAnimacion("link_abajo", 12);
             var animacionAbajo = new cc.Animation(framesCaminarAbajo, 0.05);
             this.objectToBeAnimated.animaciones["CAMINAR_ABAJO"] = cc.RepeatForever.create(new cc.Animate(animacionAbajo));
             //Animacion Caminar Arriba
             var framesCaminarArriba = this.getAnimacion("link_arriba", 12);
             var animacionArriba = new cc.Animation(framesCaminarArriba, 0.05);
             this.objectToBeAnimated.animaciones["CAMINAR_ARRIBA"] =cc.RepeatForever.create(new cc.Animate(animacionArriba));
             //Animacion Caminar Derecha
             var framesCaminarDerecha = this.getAnimacion("link_lado", 12);
             var animacionDerecha = new cc.Animation(framesCaminarDerecha, 0.05);
             this.objectToBeAnimated.animaciones["CAMINAR_DERECHA"] =cc.RepeatForever.create(new cc.Animate(animacionDerecha));
             this.objectToBeAnimated.animaciones["CAMINAR_IZQUIERDA"] =cc.RepeatForever.create(new cc.Animate(animacionDerecha));
             //Animacion Espada Arriba
             var framesEspadaArriba = this.getAnimacion("Link_espadazo_arriba", 9);
             var animacionEspArriba = new cc.Animation(framesEspadaArriba, 0.03);
             this.objectToBeAnimated.animaciones["ESPADA_ARRIBA"]  = new cc.Sequence(new cc.Animate(animacionEspArriba), this.obtainAnimation("SIMPLE_ARRIBA"),cc.CallFunc.create(this.lock, this));

             //Animacion Espada Abajo
             var framesEspadaAbajo = this.getAnimacion("Link_espadazo_abajo", 6);
             var animacionEspAbajo = new cc.Animation(framesEspadaAbajo, 0.03);
             this.objectToBeAnimated.animaciones["ESPADA_ABAJO"]  = new cc.Sequence(new cc.Animate(animacionEspAbajo), this.obtainAnimation("SIMPLE_ABAJO"),cc.CallFunc.create(this.lock, this));
             //Animacion Espada Lado
             var framesEspadaDerecha = this.getAnimacion("Link_espadazo_derecha", 9);
             var animacionEspDerecha = new cc.Animation(framesEspadaDerecha, 0.03);
             this.objectToBeAnimated.animaciones["ESPADA_DERECHA"]  = new cc.Sequence(new cc.Animate(animacionEspDerecha), this.obtainAnimation("SIMPLE_LADO"),cc.CallFunc.create(this.lock, this));

             this.objectToBeAnimated.animaciones["ESPADA_IZQUIERDA"]  = new cc.Sequence(new cc.Animate(animacionEspDerecha), this.obtainAnimation("SIMPLE_LADO"),cc.CallFunc.create(this.lock, this));
         }
         , getAnimacion: function (nombreAnimacion, numFrames) {
             var framesAnimacion = [];
             for (var i = 0; i < numFrames; i++) {
                 var str = nombreAnimacion + i + ".png";
                 var frame = cc.spriteFrameCache.getSpriteFrame(str);
                 framesAnimacion.push(frame);
             }
             return framesAnimacion;

         },obtainAnimation: function(key)
              {
                  return this.objectToBeAnimated.animaciones[key];
              }
          ,lock: function()
              {
                  this.objectToBeAnimated.atackIsDone=true;
                  this.objectToBeAnimated.usingSword=false;
              }
});