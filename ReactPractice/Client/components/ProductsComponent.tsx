import * as React from 'react'
import { RouteComponentProps } from "react-router";
import { CartComponent } from './CartComponent';
import { ProductComponent } from './ProductComponent';
import { Product, User } from './types';
import { Map } from 'immutable'
import { ModalComponent } from './Modal';

export type Quantity = number
export type ProductsComponentState = {
  products: { kind: "loaded", products: Product[] } | { kind: "loading" } | { kind: "error-or-not-found" } | { kind: "none" }
  user: string,
  cart: Map<Product, Quantity>
  submit_status: { kind: "processing" } | { kind: "order_completed" } | { kind: "error" } | { kind: "none" }
}
export type ProductsComponentProps = {}

export class ProductsComponent extends React.Component<RouteComponentProps<ProductsComponentProps>, ProductsComponentState> {
  constructor(props: RouteComponentProps<ProductsComponentProps>) {
    super(props)
    this.state = {
      user: "",
      cart: Map(),
      submit_status: { kind: "none" },
      products: { kind: "none" }

    }
  }

  getProducts() {
    this.setState(s => ({ ...s, products: { kind: "loading" } }), () => {
      fetch(`/Cart/GetProducts`,
        {
          method: 'get', credentials: 'include',
          headers: { 'content-type': 'application/json' }
        }).then(async res => {
          try {
            if (!res.ok)
              this.setState(s => ({ ...s, products: { kind: "error-or-not-found" } }))
            let res1 = await res.json()
            this.setState(s => ({ ...s, products: { kind: "loaded", products: res1 } }))
          }
          catch {
            this.setState(s => ({ ...s, products: { kind: "error-or-not-found" } }))
          }
        })
    })
  }
  placeOrder() {
    let data_to_sent = {
      user: { Name: this.state.user } as User,
      products: this.state.cart.map((q, p) => ({ product: p, quantity: q })).valueSeq().toArray()
    }
    fetch(`/Cart/PlaceOrder`,
      {
        method: 'put', credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data_to_sent)
      }).then(async res => {
        try {
          if (!res.ok)
            this.setState(s => ({ ...s, submit_status: { kind: "error" } }))
          let res1 = await res.json()
          this.setState(s => ({ ...s, submit_status: { kind: "order_completed" } }))
        }
        catch {
          this.setState(s => ({ ...s, submit_status: { kind: "error" } }))
        }
      })
  }

  componentWillMount() {
    this.getProducts()
  }
  public render() {

    if (this.state.products.kind != "loaded") {
      return <p>{this.state.products.kind}</p>
    }


    return <div className='container-fluid row'>
      <div className="row">
        <div className='col-sm-6'>
          <h2>Products</h2>
          {this.state.products.products.map(p => <ProductComponent product={p} product_id={p.Id} add_product={
            () => this.setState(s => {
              let s1 = { ...s }
              if (!s1.cart.has(p)) {
                s1.cart = s1.cart.set(p, 0)
              }
              s1.cart = s1.cart.set(p, s1.cart.get(p) + 1)
              return s1
            })
          } />)}
        </div>
        <div className='col-sm-6'>
          <CartComponent user={this.state.user}
            cart={this.state.cart}
            submit={() => {
              this.setState(s => ({ ...s, submit_status: { kind: "processing" } }), () => {
                this.placeOrder()
              })
            }}
            update_cart={c => this.setState(s1 => ({ ...s1, cart: c }))}
            update_user={s => this.setState(s1 => ({ ...s1, user: s }))} />
        </div>
      </div>
      {this.state.submit_status.kind == "none" ? null : <ModalComponent
        text={this.state.submit_status.kind}
        close={() => this.setState(s => ({ ...s, submit_status: { kind: "none" } }))} />}
    </div>
  }
}