function Drag ({targets}) {
    let self = this;
    this.target = Array.isArray(targets) ? targets : [targets];
    this.currentTarget = Array.isArray(targets) ? targets[0] : targets;
    this.targetTypeIsArray = Array.isArray(targets);
    this.offsetX = 0;
    this.offsetY = 0;

    this.moveFunc = function (e) {
        // 取消目标元素的 transform 属性，避免移动时受到影响
        self.currentTarget.style.transform='unset';

        // 移动时当前鼠标的位置坐标
        let posX = e.clientX || e.pageX;
        let posY = e.clientY || e.pageY;

        // 计算目标元素的偏移量，鼠标位置保持不变
        let diffX = posX - self.offsetX;
        let diffY = posY - self.offsetY;

        // 移动的偏移量为负数时取消
        if (diffX < 0 || diffY < 0) return false;
        self.currentTarget.style.left = diffX + 'px';
        self.currentTarget.style.top = diffY + 'px';
    }
    this.downFunc = function (e) {
        // 只有是鼠标左键点击才生效
        if (e.button !== 0) return;

        // 判断当前点击的元素是否存在
        let clickTarget = e.target;
        if (self.target.indexOf(clickTarget) <= -1) return;
        self.currentTarget = clickTarget;

        // 保存当前点击的位置坐标
        self.offsetX = e.offsetX || e.layerX;
        self.offsetY = e.offsetY || e.layerY;

        // 添加鼠标移动事件
        window.document.addEventListener('mousemove', self.moveFunc, false);

        self.target.forEach(element => {
            // 添加鼠标按下后松开事件
            element.addEventListener('mouseup', function () {
                // 松开鼠标后删除事件监听
                window.document.removeEventListener('mousemove', self.moveFunc, false);
            });
        })
    }
}

Drag.prototype.start = function () {
    this.target.forEach(element => {
        element.addEventListener('mousedown', this.downFunc, false);
    });
}
module.exports = Drag;
