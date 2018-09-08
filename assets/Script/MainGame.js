cc.Class({
    extends: cc.Component,

    properties: {
        audioScore:
        {
            default: null,
            type: cc.AudioSource,
        },
        player:cc.Node
    },

    onLoad: function () {
        //播放音效
        // this.audioScore.play();

        //事件监听，移动人物
        this.node.on("touchmove", function (event) {
            var dir = event.touch.getDelta();
            var action1 = cc.moveBy(0.1,cc.v2(dir.x,2));
            var action2 = cc.moveBy(0.1,cc.v2(0,-2));
            this.player.runAction(cc.sequence(action1,action2));
        }, this);
        this.node.on("touchstart", function (event) {
            var dir = event.touch.getLocation();
            var nodeSpacePos = this.node.convertToNodeSpaceAR(dir);
            this.player.runAction(cc.moveTo(0.5,cc.v2(nodeSpacePos.x,this.player.y)));
        }, this);

        cc.log("canvas",this.node.getContentSize());
    },

    start() {

    },

    // update (dt) {},
});
