import * as React from 'react'
import { RouteComponentProps } from "react-router";
import { Product } from './types';


export type ProductRouteComponentProps = {}
export class ProductRouteComponent extends React.Component<RouteComponentProps<ProductRouteComponentProps>, ProductComponentState> {
  render() {
    let p_id = this.props.match.params.id
    p_id == "" ? undefined : isNaN(p_id) ? undefined : +this.props.product_id
    return <ProductComponent product_id={p_id} />
  }
}


export type ProductComponentProps = {
  product_id?: number
  product?: Product
  add_product?: () => void
}
export type ProductComponentState = {
  product?: { kind: "loaded", product: Product } | { kind: "loading" } | { kind: "error-or-not-found" }
}
export class ProductComponent extends React.Component<ProductComponentProps, ProductComponentState> {
  constructor(props: ProductComponentProps) {
    super(props)

    this.state = {}
  }
  getProduct() {
      fetch(`/Cart/GetProduct/${this.props.product_id}`,
      {
        method: 'get', credentials: 'include',
        headers: { 'content-type': 'application/json' }
      }).then(async res => {
        try {
          if (!res.ok)
            this.setState(s => ({ ...s, product: { kind: "error-or-not-found" } }))
          let res1 = await res.json()
          this.setState(s => ({ ...s, product: { kind: "loaded", product: res1 } }))
        }
        catch {
          this.setState(s => ({ ...s, product: { kind: "error-or-not-found" } }))
        }
      })
  }
  componentWillMount() { 
    if (this.props.product != undefined) {
      this.setState(s => ({ ...s, product: { kind: "loaded", product: this.props.product } }))
      return
    }
    else if (this.props.product_id) {
      this.setState(s => ({ ...s, product: { kind: "loading" } }), () => {
        this.getProduct()
      })
    }
    else {
      this.setState(s => ({ ...s, product: { kind: "error-or-not-found" } }))
    }
  }
  public render() {
    if (this.state.product.kind != "loaded") {
      return <p>{this.state.product.kind}</p>
    }
    return <div className='container-fluid row'>
    {/* NOTE: when rendering a product you should be able to add it to the cart (hint button)*/}
       <div className='col-sm-6'>
        <h3>Product</h3>
        <div>Id:<span>{this.state.product.product.Id}</span></div>
        <div>Name:<span>{this.state.product.product.Name}</span></div>
        <div>Price:<span>{this.state.product.product.Price}</span></div>
      </div>

      <div className='col-sm-6'>
        {this.props.add_product ? <button style={{ height: "70px", marginTop: "50px" }} onClick={this.props.add_product}>+</button> : null}
      </div>
    </div> 
  }
}