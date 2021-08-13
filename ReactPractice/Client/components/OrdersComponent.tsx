import * as React from 'react'
import { RouteComponentProps } from "react-router";
import ReactJson from 'react-json-view'
 
export type OrdersComponentState = {
  orders: { kind: "loaded", value: string } | { kind: "loading" } | { kind: "error-or-not-found" } | { kind: "none" }
}
export type OrdersComponentProps = {}

export class OrdersComponent extends React.Component<RouteComponentProps<OrdersComponentProps>, OrdersComponentState> {
  constructor(props: RouteComponentProps<OrdersComponentProps>) {
    super(props)
    this.state = {
      orders:{kind:"none"}
    }
  }
  getOrders() {
    this.setState(s => ({ ...s, orders: { kind: "loading" } }), () => {
      fetch(`/Cart/GetOrders`,
        {
          method: 'get', credentials: 'include',
          headers: { 'content-type': 'application/json' }
        }).then(async res => {
          try {
            if (!res.ok)
              this.setState(s => ({ ...s, orders: { kind: "error-or-not-found" } }))
            let res1 = await res.json()
            this.setState(s => ({ ...s, orders: { kind: "loaded", value: JSON.stringify(res1) } }))
          }
          catch {
            this.setState(s => ({ ...s, orders: { kind: "error-or-not-found" } }))
          }
        })
    })
  }

  componentWillMount() {
    this.getOrders()
  }

  public render() {
    if (this.state.orders.kind != "loaded") {
      return <p>{this.state.orders.kind}</p>
    }

    return <div className="main-order">
      <h2>Orders</h2>
      {/* Not necessary for the exam */}
      <ReactJson src={JSON.parse(this.state.orders.value)} />
    </div>
  }
}