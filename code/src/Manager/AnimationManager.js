var AnimationManager = cc.Class.extend({
    objectToBeAnimated: null,
    animaciones: [],

    ctor: function () {
    }, addAnimationsLink: function (link) {
        this.objectToBeAnimated = link;

        //Animacion Simple Arriba
        var framesSimple = this.getAnimacion("link_parado_arriba", 3);
        this.objectToBeAnimated.animaciones["SIMPLE_ARRIBA"] = cc.RepeatForever.create(cc.Sequence.create(cc.Animate.create(new cc.Animation(framesSimple, 0.2)), cc.DelayTime.create(2)));
        //Animacion Simple Abajo
        var framesSimpleAbajo = this.getAnimacion("link_parado_abajo", 3);
        this.objectToBeAnimated.animaciones["SIMPLE_ABAJO"] = cc.RepeatForever.create(cc.Sequence.create(cc.Animate.create(new cc.Animation(framesSimpleAbajo, 0.2)), cc.DelayTime.create(2)));
        //Animacion Simple Lado
        var framesSimpleLado = this.getAnimacion("link_parado_derecha", 3);
        this.objectToBeAnimated.animaciones["SIMPLE_DERECHA"] = cc.RepeatForever.create(cc.Sequence.create(cc.Animate.create(new cc.Animation(framesSimpleLado, 0.2)), cc.DelayTime.create(2)));
        this.objectToBeAnimated.animaciones["SIMPLE_IZQUIERDA"] = cc.RepeatForever.create(cc.Sequence.create(cc.Animate.create(new cc.Animation(framesSimpleLado, 0.2)), cc.DelayTime.create(2)));

        //Animacion Caminar Abajo
        var framesCaminarAbajo = this.getAnimacion("link_caminar_abajo", 10);
        var animacionAbajo = new cc.Animation(framesCaminarAbajo, 0.05);
        this.objectToBeAnimated.animaciones["CAMINAR_ABAJO"] = new cc.Sequence(new cc.Animate(animacionAbajo), cc.CallFunc.create(link.setCanMove, link));
        //Animacion Caminar Arriba
        var framesCaminarArriba = this.getAnimacion("link_caminar_arriba", 10);
        var animacionArriba = new cc.Animation(framesCaminarArriba, 0.05);
        this.objectToBeAnimated.animaciones["CAMINAR_ARRIBA"] = new cc.Sequence(new cc.Animate(animacionArriba), cc.CallFunc.create(link.setCanMove, link));
        //Animacion Caminar Derecha
        var framesCaminarDerecha = this.getAnimacion("link_caminar_derecha", 10);
        var animacionDerecha = new cc.Animation(framesCaminarDerecha, 0.05);
        this.objectToBeAnimated.animaciones["CAMINAR_DERECHA"] = new cc.Sequence(new cc.Animate(animacionDerecha), cc.CallFunc.create(link.setCanMove, link));
        this.objectToBeAnimated.animaciones["CAMINAR_IZQUIERDA"] = new cc.Sequence(new cc.Animate(animacionDerecha), cc.CallFunc.create(link.setCanMove, link));
        //Animacion Espada Arriba
        var framesEspadaArriba = this.getAnimacion("link_atacar_arriba", 8);
        var animacionEspArriba = new cc.Animation(framesEspadaArriba, 0.03);
        this.objectToBeAnimated.animaciones["ESPADA_ARRIBA"] = new cc.Sequence(new cc.Animate(animacionEspArriba), cc.CallFunc.create(link.swordFinished, link));

        //Animacion Espada Abajo
        var framesEspadaAbajo = this.getAnimacion("link_atacar_abajo", 8);
        var animacionEspAbajo = new cc.Animation(framesEspadaAbajo, 0.03);
        this.objectToBeAnimated.animaciones["ESPADA_ABAJO"] = new cc.Sequence(new cc.Animate(animacionEspAbajo), cc.CallFunc.create(link.swordFinished, link));
        //Animacion Espada Lado
        var framesEspadaDerecha = this.getAnimacion("link_atacar_derecha", 8);
        var animacionEspDerecha = new cc.Animation(framesEspadaDerecha, 0.03);
        this.objectToBeAnimated.animaciones["ESPADA_DERECHA"] = new cc.Sequence(new cc.Animate(animacionEspDerecha), cc.CallFunc.create(link.swordFinished, link));
        this.objectToBeAnimated.animaciones["ESPADA_IZQUIERDA"] = new cc.Sequence(new cc.Animate(animacionEspDerecha), cc.CallFunc.create(link.swordFinished, link));

        var framesCaminarAbajo = this.getAnimacion("link_rodar_abajo", 8);
        var animacionAbajo = new cc.Animation(framesCaminarAbajo, 0.05);
        this.objectToBeAnimated.animaciones["RODAR_ABAJO"] = new cc.Sequence(new cc.Animate(animacionAbajo), cc.CallFunc.create(link.rollingFinished, link));
        //Animacion Caminar Arriba
        var framesCaminarArriba = this.getAnimacion("link_rodar_arriba", 8);
        var animacionArriba = new cc.Animation(framesCaminarArriba, 0.05);
        this.objectToBeAnimated.animaciones["RODAR_ARRIBA"] = new cc.Sequence(new cc.Animate(animacionArriba), cc.CallFunc.create(link.rollingFinished, link));
        //Animacion Caminar Derecha
        var framesCaminarDerecha = this.getAnimacion("link_rodar_derecha", 8);
        var animacionDerecha = new cc.Animation(framesCaminarDerecha, 0.05);
        this.objectToBeAnimated.animaciones["RODAR_DERECHA"] = new cc.Sequence(new cc.Animate(animacionDerecha), cc.CallFunc.create(link.rollingFinished, link));
        this.objectToBeAnimated.animaciones["RODAR_IZQUIERDA"] = new cc.Sequence(new cc.Animate(animacionDerecha), cc.CallFunc.create(link.rollingFinished, link));

    }, addAnimationsOctorok: function (octorok) {
        this.objectToBeAnimated = octorok;

        //Animacion Mover Abajo
        var framesCaminarAbajo = this.getAnimacion("Octorok_abajo", 2);
        var animacionAbajo = new cc.Animation(framesCaminarAbajo, 0.5);
        this.objectToBeAnimated.animaciones["MOVER_ABAJO"] = cc.RepeatForever.create(new cc.Animate(animacionAbajo));

        //Animacion Mover Arriba
        var framesCaminarArriba = this.getAnimacion("Octorok_arriba", 2);
        var animacionArriba = new cc.Animation(framesCaminarArriba, 0.5);
        this.objectToBeAnimated.animaciones["MOVER_ARRIBA"] = cc.RepeatForever.create(new cc.Animate(animacionArriba));

        //Animacion Mover Derecha
        var framesCaminarDerecha = this.getAnimacion("Octorok_derecha", 2);
        var animacionDerecha = new cc.Animation(framesCaminarDerecha, 0.5);
        this.objectToBeAnimated.animaciones["MOVER_DERECHA"] = cc.RepeatForever.create(new cc.Animate(animacionDerecha));

        //Animacion mover izquierda
        var framesCaminarIzquierda = this.getAnimacion("Octorok_izquierda", 2);
        var animacionIzquierda = new cc.Animation(framesCaminarIzquierda, 0.5);
        this.objectToBeAnimated.animaciones["MOVER_IZQUIERDA"] = cc.RepeatForever.create(new cc.Animate(animacionIzquierda));

        //Animacion disparar hacia abajo
        var framesDispararAbajo = this.getAnimacion("Octorok_disparo_abajo", 2);
        var animacionDisparoAbajo = new cc.Animation(framesDispararAbajo, 0.4);
        this.objectToBeAnimated.animaciones["DISPARAR_ABAJO"] = new cc.Sequence(new cc.Spawn(new cc.Animate(animacionDisparoAbajo)
            , new cc.callFunc(octorok.crearDisparo, octorok)), new cc.Animate(animacionAbajo));

        //Animacion disparar hacia arriba
        var framesDispararArriba = this.getAnimacion("Octorok_disparo_arriba", 2);
        var animacionDispararArriba = new cc.Animation(framesDispararArriba, 0.4);
        this.objectToBeAnimated.animaciones["DISPARAR_ARRIBA"] = new cc.Sequence(new cc.Spawn(new cc.Animate(animacionDispararArriba),
            new cc.callFunc(octorok.crearDisparo, octorok)), new cc.Animate(animacionArriba));

        //Animacion disparar hacia la drecha
        var framesDispararDerecha = this.getAnimacion("Octorok_disparo_derecha", 2);
        var animacionDisparoDerecha = new cc.Animation(framesDispararDerecha, 0.4);
        this.objectToBeAnimated.animaciones["DISPARAR_DERECHA"] = new cc.Sequence(new cc.Spawn(new cc.Animate(animacionDisparoDerecha),
            new cc.callFunc(octorok.crearDisparo, octorok)), new cc.Animate(animacionDerecha));

        //Animacion disparar hacia la izquierda
        var framesDispararIzquierda = this.getAnimacion("Octorok_disparo_izquierda", 2);
        var animacionDisparoIzquierda = new cc.Animation(framesDispararIzquierda, 0.4);
        this.objectToBeAnimated.animaciones["DISPARAR_IZQUIERDA"] = new cc.Sequence(new cc.Spawn(new cc.Animate(animacionDisparoIzquierda),
            new cc.callFunc(octorok.crearDisparo, octorok)), new cc.Animate(animacionIzquierda));

    }, addAnimationsSoldadoVerde: function (soldado) {
        this.objectToBeAnimated = soldado;

        //Animacion parado Arriba
        var framesSimple = this.getAnimacion("Soldado_verde_parado_arriba", 2);
        this.objectToBeAnimated.animaciones["SIMPLE_ARRIBA"] = cc.RepeatForever.create(
            cc.Sequence.create(cc.Animate.create(new cc.Animation(framesSimple, 0.4)), cc.DelayTime.create(2)));

        //Animacion parado Abajo
        var framesSimpleAbajo = this.getAnimacion("Soldado_verde_parado_abajo", 2);
        this.objectToBeAnimated.animaciones["SIMPLE_ABAJO"] = cc.RepeatForever.create(
            cc.Sequence.create(cc.Animate.create(new cc.Animation(framesSimpleAbajo, 0.4)), cc.DelayTime.create(2)));

        //Animacion parado Derecha
        var framesSimpleDerecha = this.getAnimacion("Soldado_verde_parado_derecha", 2);
        this.objectToBeAnimated.animaciones["SIMPLE_DERECHA"] = cc.RepeatForever.create(
            cc.Sequence.create(cc.Animate.create(new cc.Animation(framesSimpleDerecha, 0.4)), cc.DelayTime.create(2)));

        //Animacion parado Izquierda
        var framesSimpleIzq = this.getAnimacion("Soldado_verde_parado_izq", 2);
        this.objectToBeAnimated.animaciones["SIMPLE_IZQUIERDA"] = cc.RepeatForever.create(
            cc.Sequence.create(cc.Animate.create(new cc.Animation(framesSimpleIzq, 0.4)), cc.DelayTime.create(2)));

        //Animacion mover arriba
        var framesMoverArriba = this.getAnimacion("Soldado_verde_mover_arriba", 2);
        this.objectToBeAnimated.animaciones["MOVER_ARRIBA"] = cc.RepeatForever.create(
            cc.Animate.create(new cc.Animation(framesMoverArriba, 0.2)));

        //Animacion mover abajo
        var framesMoverAbajo = this.getAnimacion("Soldado_verde_mover_abajo", 2);
        this.objectToBeAnimated.animaciones["MOVER_ABAJO"] = cc.RepeatForever.create(
            cc.Animate.create(new cc.Animation(framesMoverAbajo, 0.2)));

        //Animacion mover derecha
        var framesMoverDerecha = this.getAnimacion("Soldado_verde_mover_derecha", 2);
        this.objectToBeAnimated.animaciones["MOVER_DERECHA"] = cc.RepeatForever.create(
            cc.Animate.create(new cc.Animation(framesMoverDerecha, 0.2)));

        //Animacion mover izquierda
        var framesMoverIzq = this.getAnimacion("Soldado_verde_mover_izq", 2);
        this.objectToBeAnimated.animaciones["MOVER_IZQUIERDA"] = cc.RepeatForever.create(
            cc.Animate.create(new cc.Animation(framesMoverIzq, 0.2)));

    }, addAnimationsSoldadoRojo: function (soldado) {
        this.objectToBeAnimated = soldado;

        //Animacion parado Arriba
        var framesSimple = this.getAnimacion("Soldado_rojo_parado_arriba", 3);
        this.objectToBeAnimated.animaciones["SIMPLE_ARRIBA"] = cc.RepeatForever.create(
            cc.Sequence.create(cc.Animate.create(new cc.Animation(framesSimple, 0.4)), cc.DelayTime.create(2)));

        //Animacion parado Abajo
        var framesSimpleAbajo = this.getAnimacion("Soldado_rojo_parado_abajo", 1);
        this.objectToBeAnimated.animaciones["SIMPLE_ABAJO"] = cc.RepeatForever.create(
            cc.Sequence.create(cc.Animate.create(new cc.Animation(framesSimpleAbajo, 0.4)), cc.DelayTime.create(2)));

        //Animacion parado Derecha
        var framesSimpleDerecha = this.getAnimacion("Soldado_rojo_parado_derecha", 2);
        this.objectToBeAnimated.animaciones["SIMPLE_DERECHA"] = cc.RepeatForever.create(
            cc.Sequence.create(cc.Animate.create(new cc.Animation(framesSimpleDerecha, 0.4)), cc.DelayTime.create(2)));

        //Animacion parado Izquierda
        var framesSimpleIzq = this.getAnimacion("Soldado_rojo_parado_izq", 2);
        this.objectToBeAnimated.animaciones["SIMPLE_IZQUIERDA"] = cc.RepeatForever.create(
            cc.Sequence.create(cc.Animate.create(new cc.Animation(framesSimpleIzq, 0.4)), cc.DelayTime.create(2)));

        //Animacion mover arriba
        var framesMoverArriba = this.getAnimacion("Soldado_rojo_mover_arriba", 2);
        this.objectToBeAnimated.animaciones["MOVER_ARRIBA"] = cc.RepeatForever.create(
            cc.Animate.create(new cc.Animation(framesMoverArriba, 0.2)));

        //Animacion mover abajo
        var framesMoverAbajo = this.getAnimacion("Soldado_rojo_mover_abajo", 2);
        this.objectToBeAnimated.animaciones["MOVER_ABAJO"] = cc.RepeatForever.create(
            cc.Animate.create(new cc.Animation(framesMoverAbajo, 0.2)));

        //Animacion mover derecha
        var framesMoverDerecha = this.getAnimacion("Soldado_rojo_mover_derecha", 3);
        this.objectToBeAnimated.animaciones["MOVER_DERECHA"] = cc.RepeatForever.create(
            cc.Animate.create(new cc.Animation(framesMoverDerecha, 0.2)));

        this.objectToBeAnimated.animaciones["MOVER_IZQUIERDA"] = cc.RepeatForever.create(
            cc.Animate.create(new cc.Animation(framesMoverDerecha, 0.2)));

    }, getAnimacion: function (nombreAnimacion, numFrames) {
        var framesAnimacion = [];
        for (var i = 0; i < numFrames; i++) {
            var str = nombreAnimacion + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            framesAnimacion.push(frame);
        }
        return framesAnimacion;

    }


});