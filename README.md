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
        const target = this.drag;
        const s = new Drag({ target });
        s.start();
    }
    render() {
        return (
            <div
                ref={div => this.drag = div}
                style={{ width: '500px', height: '100px', position: 'absolute', background: 'gold' }}>
                drag
            </div>
        );
    }
};
export default FirstPage;
```

