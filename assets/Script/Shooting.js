let playerscore = require("ScoreData");

cc.Class({
    extends: cc.Component,

    properties: {
        //子弹预制键,后期需优化
        bullt_I:
        {
            default: null,
            type: cc.Prefab,
        },
        bullt_II:
        {
            default: null,
            type: cc.Prefab,
        },
        bullt_III:
        {
            default: null,
            type: cc.Prefab,
        },
        //子弹射速(发射子弹间隔)
        speedfo: 0.05,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.schedule(this.makeButtle, this.speedfo);
    },
    makeButtle: function () {
        if (this.speedfo >= 0) {
            this.speedfo -= playerscore.playesData * 0.00001;
        };
        if (playerscore.playesData < 100) {
            var bullts = cc.instantiate(this.bullt_I);//生成子弹
        }
        else if (playerscore.playesData < 1000) {
            var bullts = cc.instantiate(this.bullt_III);//生成子弹
        }
        else {
            var bullts = cc.instantiate(this.bullt_II);//生成子弹
        }
        bullts.x = this.node.getPosition().x;//设置子弹坐标
        bullts.y = this.node.getPosition().y+this.node.height+30;//设置子弹坐标
        this.node.parent.addChild(bullts);//将子弹添加到场景
    },
});
