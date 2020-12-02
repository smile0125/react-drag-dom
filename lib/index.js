/**
 * author: smileo125
 * desc: react-drag-dom
 */
function Drag({
    targets,
    isExcess = false,
    defaultZIndex = 1000
}) {
    let self = this;
    this.target = Array.isArray(targets) ? targets : [targets];
    this.currentTarget = Array.isArray(targets) ? targets[0] : targets;
    this.targetTypeIsArray = Array.isArray(targets);
    this.offsetX = 0;
    this.offsetY = 0;
    this.zIndex = defaultZIndex;
    this.isExcess = isExcess;

    this.moveFunc = function (ev) {
        const e = ev || window.event;
        // 移动时当前鼠标的位置坐标
        let posX = e.clientX || e.pageX;
        let posY = e.clientY || e.pageY;

        // 计算目标元素的偏移量，鼠标位置保持不变
        let diffX = posX - self.offsetX;
        let diffY = posY - self.offsetY;

        // 不允许拖动超出窗口区域判断
        if (!self.isExcess) {
            if (diffX <= 0) {
                diffX = 0;
            } else if (diffX > document.documentElement.clientWidth - e.target.offsetWidth) {
                diffX = document.documentElement.clientWidth - e.target.offsetWidth
            }

            if (diffY <= 0) {
                diffY = 0;
            } else if (diffY > document.documentElement.clientHeight - e.target.offsetHeight) {
                diffY = document.documentElement.clientHeight - e.target.offsetHeight;
            }
        }

        self.currentTarget.style.left = diffX + 'px';
        self.currentTarget.style.top = diffY + 'px';
    }
    this.downFunc = function (ev) {
        const e = ev || window.event;
        // 只有是鼠标左键点击才生效
        if (e.button !== 0) return;

        // 判断当前点击的元素是否存在
        let clickTarget = e.target;
        if (self.target.indexOf(clickTarget) <= -1) return;
        self.currentTarget = clickTarget;

        // 保存当前点击的位置坐标
        self.offsetX = e.offsetX || e.layerX;
        self.offsetY = e.offsetY || e.layerY;

        // 取消目标元素的 transform 属性，避免移动时受到影响
        self.currentTarget.style.transform = 'unset';

        // 增加zIndex，并设置目标元素的zIndex使目标元素在最上面
        self.zIndex += 1;
        self.currentTarget.style.zIndex = self.zIndex;

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
