function Drag ({target}) {
    let self = this;
    this.target = target;
    this.offsetX = 0;
    this.offsetY = 0;

    this.moveFunc = function (e) {
        // 取消目标元素的 transform 属性，避免移动时受到影响
        self.target.style.transform='unset';

        // 移动时当前鼠标的位置坐标
        let posX = e.clientX || e.pageX;
        let posY = e.clientY || e.pageY;

        // 计算目标元素的偏移量，鼠标位置保持不变
        let diffX = posX - self.offsetX;
        let diffY = posY - self.offsetY;

        // 移动的偏移量为负数时取消
        if (diffX < 0 || diffY < 0) return false;
        self.target.style.left = diffX + 'px';
        self.target.style.top = diffY + 'px';
    }
    this.downFunc = function (e) {
        // 只有是鼠标左键点击才生效
        if (e.button !== 0) return;

        // 保存当前点击的位置坐标
        self.offsetX = e.offsetX || e.layerX;
        self.offsetY = e.offsetY || e.layerY;

        // 添加鼠标移动事件
        window.document.addEventListener('mousemove', self.moveFunc, false);

        // 添加鼠标按下后松开事件
        self.target.addEventListener('mouseup', function () {
            // 松开鼠标后删除事件监听
            window.document.removeEventListener('mousemove', self.moveFunc, false);
        });
    }
}

Drag.prototype.start = function () {
    this.target && this.target.addEventListener('mousedown', this.downFunc, false);
}
module.exports = Drag;
