import * as React from "react";
import * as styles from './Modal.scss';
import { Portal } from "../Portal";
import { cn } from "../../utils/className";
import { CloseIcon } from "../Icon";

export interface ModalProps extends React.HTMLProps<HTMLDivElement> {
  variant?: 'full' | 'regular';
  opened: boolean;
  onClose?: () => any;
}
export interface IModalContext {
  close(): any;
}

export const ModalContext = React.createContext<IModalContext>({} as any);
const { Provider, Consumer } = ModalContext;

export function ModalHeading({ children, className, ...props }: React.HTMLProps<HTMLDivElement>) {
  return (
    <Consumer>
      {({ close }) => (
        <div className={cn([styles.Heading, className])} {...props}>
          <div className={styles.Title}>{children}</div>
          <CloseIcon className={styles.Icon} onClick={close} />
        </div>
      )}
    </Consumer>
  )
}

export class Modal extends React.PureComponent<ModalProps> {
  componentDidMount() {
    document.addEventListener('keydown', this.listenESC, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.listenESC, false);
  }

  listenESC = (event: KeyboardEvent) => {
    if (event.keyCode === 27 && this.props.opened) {
      this.close();
      event.stopPropagation();
    }
  };

  close = () => {
    if (this.props.onClose && this.props.opened) {
      this.props.onClose();
    }
  };

  render() {
    const { close } = this;
    const { variant, className, opened, onClose, ...props } = this.props;

    return (
      <Portal>
        {opened && (
          <Provider value={{ close }}>
            <div className={styles.Container}>
              <div className={styles.Backdrop} onClick={close} />
              <div className={cn([styles.Modal, styles[`variant-${variant}`], className])} {...props} />
            </div>
          </Provider>
        )}
      </Portal>
    )
  }
}
