let playerscore = require("ScoreData");

//脚本控制子弹的移动，粒子效果的播放
cc.Class({
    extends: cc.Component,

    properties: {
        valueAddInY:10        
    },
    onLoad: function () {
        this.node.getComponent(cc.RigidBody).enabledContactListener = true;
        this.canvasHeight = cc.find("Canvas").height;
    },
    start: function () {
        this.schedule(this.bulltMove, 0.01);
    },
    bulltMove: function () {
        this.node.y += this.valueAddInY;
    },
    onBeginContact: function (contact, selfCollider, otherCollider) {
        playerscore.playesData += 2;
        // cc.log("score"+ playerscore.playesData);
        this.node.removeFromParent(true);
    },
    update: function (dt) {
        if (this.node.y >= this.canvasHeight) {
            this.node.destroy();
        }
    }
});
