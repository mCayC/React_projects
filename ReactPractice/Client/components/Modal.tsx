import * as React from 'react'

export type ModalComponentProps = {
  close: () => void,
  text: string
}
export type ModalComponentState = {
}
export class ModalComponent extends React.Component<ModalComponentProps, ModalComponentState> {
  constructor(props: ModalComponentProps) {
    super(props)

    this.state = {}
  }
  componentWillMount() {
  }
  public render() {
    return <div id="myModal" className="modal row" style={{ display: "block" }}>
      <div className="modal-content">
        <span className="close" onClick={this.props.close}>&times;</span>
        <p>Order status: {this.props.text}</p>
      </div>
    </div>
  }
}