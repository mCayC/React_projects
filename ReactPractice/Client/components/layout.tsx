import * as React from 'react';
import { Link } from 'react-router-dom';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div>
            <div>
                <div className="sidenav">
                    <Link to="/">Home</Link>
                    <Link to="/orders">Orders</Link>
                </div>
                <div>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}
