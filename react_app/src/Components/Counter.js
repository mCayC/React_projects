import React from 'react';
import './Counter.css'
export class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    render() {
        return (
            <div>
                <p className="display">{this.state.count}</p>
                <button className="fill" onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Increase counter!
                </button>
            </div>
        )
    }
}