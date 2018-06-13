import * as React from "react";
import { Heading } from "../Typography";

export class GQLError extends React.Component<{
  error: Error;
}> {
  render() {
    const { name, message, stack } = this.props.error;

    return (
      <>
        <Heading type={3}>[{name}] - {message}</Heading>
        <pre>{stack}</pre>
      </>
    )
  }
}
