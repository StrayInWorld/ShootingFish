let playerscore = require("ScoreData");
let EnemyTag = {
    BIG_TAG: 0,
    MIDDLE_TAG: 1,
    SMALL_TAG: 2
};
let TypeNum = 2;  //种类的数量


cc.Class({
    extends: cc.Component,

    properties: {
        bigEnemy:
        {
            default: null,
            type: cc.Prefab,
        },
        middleEnemy:
        {
            default: null,
            type: cc.Prefab,
        },
        smallEnemy:
        {
            default: null,
            type: cc.Prefab,
        }
    },

    onLoad() {
        this.canvasNode = cc.find("Canvas");
    },

    setInitialStatus(enemy, isLeft) {
        //初始状态无刚体碰撞，刚体类型为Kinematic
        let rigidBody = enemy.getComponent(cc.RigidBody);
        cc.log(rigidBody);
        rigidBody.type = cc.RigidBodyType.Kinematic;
        let collider = enemy.getComponent(cc.Collider);
        // collider.enabled = false;
        enemy.group = "wall"
        //设置初始线速度
        let velocity = cc.v2(200, 0);
        if (!isLeft) {
            velocity = cc.v2(-200, 0);
        }
        rigidBody.linearVelocity = velocity;
        //修改刚体类型，开启碰撞
        enemy.runAction(cc.sequence(cc.delayTime(1.5), cc.callFunc(function () {
            rigidBody.type = cc.RigidBodyType.Dynamic;
            // collider.enabled = true;
            enemy.group = "enemy";
            collider.apply();
            rigidBody.linearVelocity = cc.v2(0, 0);
        }, this)));
    },
    start() {
        //定时创造敌人
        this.schedule(this.makeEnemy, 3);
    },
    makeEnemy() {
        //初始横坐标
        let leftX = -this.node.parent.width / 2 - 100;
        let rightX = -leftX;
        //敌人横坐标
        let enemyPosX = leftX;
        let enemyInLeft = true;
        if (Math.random() > 0.5) {
            enemyPosX = rightX;
            enemyInLeft = false;
        }
        //敌人纵坐标
        let emenyPosY = Math.floor(Math.random() * (this.node.parent.height / 2 - 100)) + 100;
        // cc.log(enemyPosX, emenyPosY);

        let itemSizeTag = Math.floor(Math.random() * 3);       //大小类型
        let itemTypeTag = Math.floor(Math.random() * TypeNum); //每个类型里面不同的种类
        let item = null;
        switch (itemSizeTag) {
            case EnemyTag.BIG_TAG:
                item = cc.instantiate(this.bigEnemy);
                break;
            case EnemyTag.MIDDLE_TAG:
                item = cc.instantiate(this.middleEnemy);
                break;
            case EnemyTag.SMALL_TAG:
                item = cc.instantiate(this.smallEnemy);
                break;
        }

        //隐藏其他节点(如果没有取到呢？)
        if (item) {
            for (let i = 0; i < item.children.length; i++) {
                if (i !== itemTypeTag) {
                    item.children[i].active = false;
                }
            }
        }
        this.setInitialStatus(item.children[itemTypeTag], enemyInLeft);
        this.setEnemyScore(item.children[itemTypeTag]);
        item.setPosition(cc.v2(enemyPosX, emenyPosY));
        this.canvasNode.addChild(item);
    },
    //设置随机分数
    setEnemyScore(enemy) {
        let label = enemy.children[0].getComponent(cc.Label);
        let randomNum = 70;
        let startNum = 30
        if (Math.random() > 0.9) {
            // 600 - 899
            startNum = 600;
            randomNum = 300;
        }
        else if (Math.random() > 0.7) {
            //300 - 599
            startNum = 300;
            randomNum = 300;
        }
        else if (Math.random() > 0.6) {
            //100 - 299
            startNum = 100;
            randomNum = 200;
        }
        label.string = Math.floor(Math.random() * randomNum + startNum);
    }

});
