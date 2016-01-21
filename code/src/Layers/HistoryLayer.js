var HistoryLayer = cc.Layer.extend({
    layer: null,
    ctor: function (layerParam, texto) {
        this._super();
        this.layer = layerParam;
        var size = cc.winSize;
        var score = cc.LabelTTF.create(texto, res.Ravenna_ttf, 15);
        score.setPosition(size.width / 2, size.height / 2);
        score.retain();
        this.addChild(score);
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.procesarEventosKeyboard
        }, this);
    }, procesarEventosKeyboard: function (keyCode, event) {
        var instancia = event.getCurrentTarget();
        if (keyCode == 77 || keyCode == 109) {
            cc.director.resume();
            instancia.layer.removeChild(instancia);

        }
    }
});