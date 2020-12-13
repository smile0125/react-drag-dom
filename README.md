# react-drag-dom

# Installing

```
npm i react-drag-dom
```

# Example

```
import React from 'react';
import { Drag } from 'react-drag-dom';
class FirstPage extends React.Component {
    componentDidMount() {
        const target1 = this.drag1;
        const target2 = this.drag2;
        let targets = [target1, target2]
        const s = new Drag({ targets }, { isExcess: true, defaultZIndex: 600 });
        s.start();
    }
    render() {
        return (
            <div>
                <div
                    ref={div => this.drag1 = div}
                    style={{ width: '500px', height: '100px', position: 'absolute', background: 'gold' }}>
                        drag1
                </div>
                <div
                    ref={div => this.drag2 = div}
                    style={{ width: '500px', height: '100px', position: 'absolute', background: 'gold', top: '150px' }}>
                        drag2
                </div>
            </div>
        );
    }
};
export default FirstPage;
```

# Version

| Version | 支持                                                   |
| ------- | ------------------------------------------------------ |
| v1.0.0  | 支持页面**单个**元素快速拖动                           |
| v1.0.1  | 支持页面**多个**元素快速拖动                           |
| v1.0.2  | 优化                                                   |
| v1.0.3  | 优化                                                   |
| v1.0.4  | 新增 isExcess 字段：是否允许拖拽出窗口之外，默认 false |
| v1.0.5  | 新增 defaultZIndex 字段：浮动的层级，默认 1000         |
| v1.0.6  | 优化                                                   |
