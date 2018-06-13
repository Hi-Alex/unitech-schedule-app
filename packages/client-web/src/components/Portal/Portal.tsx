import * as React from "react";
import { createPortal } from "react-dom";

export class Portal extends React.Component {
  private element: HTMLElement = document.createElement('div');

  componentDidMount() {
    document.body.appendChild(this.element);
  }

  componentWillUnmount() {
    document.body.removeChild(this.element);
  }

  render() {
    return createPortal(this.props.children, this.element);
  }
}
