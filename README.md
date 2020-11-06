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
        const s = new Drag({ targets });
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
|  Version   | 支持  |
|  ----  | ----  |
| v1.0.0  | 支持页面**单个**元素快速拖动 |
| v1.0.1  | 支持页面**多个**元素快速拖动 |

