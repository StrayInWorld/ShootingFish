cc.Class({
    extends: cc.Component,

    properties: {
    },

    // onLoad () {},
    start () {

    },

    //碰撞回调
    onBeginContact: function (contact, selfCollider, otherCollider) {
        // switch (selfCollider.node.getTag()) {
        //     case EnemyTag.BIG_TAG:
        //         cc.log("big");
        //     case EnemyTag.MIDDLE_TAG:
        //         cc.log("middle");
        //     case EnemyTag.SMALL_TAG:
        //         cc.log("small");
        // }
        // cc.log(selfCollider.node);
    }
    // update (dt) {},
});
