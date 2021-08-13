import * as React from 'react'
import { RouteComponentProps } from "react-router";
import { Product } from './types';
import { Quantity } from './ProductsComponent';
import { Map } from 'immutable'

export type CartComponentState = {
}

export type CartComponentProps = {

  update_user: (_: string) => void,
  user: string,
  cart: Map<Product, Quantity>
  update_cart: (cart: Map<Product, Quantity>) => void
  submit: () => void
}

export class CartComponent extends React.Component<CartComponentProps, CartComponentState> {
  constructor(props: CartComponentProps) {
    super(props)
    this.state = {}
  }
  public render() {
    return <form>
      <label>User email:</label>
      <input type="email" onChange={e => this.props.update_user(e.target.value)} value={this.props.user} required />

      <br />
      <br />
      <div>
          { /*NOTE: you should be able to remove an item from the cart (or decrease the amount). (hint button)*/}
         {
          this.props.cart.count() == 0 ? "Your cart is empty." :
            <div>
              {
                this.props.cart.map((q, p) => {
                  return <div>
                    {p.Name} x {q}  <button onClick={() => {
                      let q1 = this.props.cart.get(p)
                      if (q1 == 1) this.props.update_cart(this.props.cart.remove(p))
                      else this.props.update_cart(this.props.cart.set(p, q1 - 1))
                    }}>-</button>
                  </div>
                }).valueSeq()
              }
              <div>-------------</div>
              <p>Total: {this.props.cart.map((q, p) => q * p.Price).reduce((a, b) => a + b, 0)}</p>
            </div>
        } 
      </div>
      {(() => {
        const regex = RegExp('[a-zA-Z]+@[a-zA-Z]+');
        let is_email = regex.test(this.props.user)
        return <button style={{ cursor: is_email ? "pointer" : "not-allowed" }} disabled={!is_email} onClick={e => {
          e.preventDefault()
          this.props.submit()
        }}>Buy</button>
      })()}
    </form>
  }
}
