import * as React from "react";
import * as styles from "./Select.scss";
import { Omit } from "ramda";
import { cn } from "../../../utils/className";
import { Portal } from "../../Portal";
import { getKeys } from "../../../utils/fns";

export interface SelectProps<Options extends object> extends Omit<React.HTMLProps<HTMLDivElement>, 'selected' | 'onChange'> {
  selected: keyof Options;
  options: Options;
  render?: <Key extends keyof Options>(value: Options[Key], key: Key) => React.ReactNode;
  onChange?: <Key extends keyof Options>(selected: Key) => any;
  disabled?: boolean;
}
export interface SelectState {
  opened: boolean;
}

export class Select<Options extends object> extends React.Component<SelectProps<Options>, SelectState> {
  public static defaultProps: Partial<SelectProps<any>> = {
    render: value => value,
    placeholder: 'Не выбрано'
  };

  private hasMouseDown = false;
  state: SelectState = {
    opened: false
  };
  parent = React.createRef<HTMLDivElement>();
  list = React.createRef<HTMLDivElement>();

  setOpened(opened: boolean) {
    this.setState({ opened });
  }

  open = () => this.setOpened(true);
  close = () => this.setOpened(false);

  changed(key: keyof Options) {
    return (event: React.MouseEvent<any>) => {
      if (key !== this.props.selected && this.props.onChange) {
        this.props.onChange(key);
        this.parent.current.focus();
        this.close();
        event.stopPropagation();
      }
    }
  }

  onMouseDown = () => {
    this.hasMouseDown = true;
  };

  onBlur = () => {
    if (!this.hasMouseDown) {
      this.close();
    }
    this.hasMouseDown = false;
  };

  updatePosition = () => {
    if (!this.state.opened || !this.list.current || !this.parent.current) {
      return;
    }

    const { top, bottom, left, width } = this.parent.current.getBoundingClientRect();

    this.list.current.style.left = `${left}px`;
    this.list.current.style.top = `${bottom + 10}px`;
    this.list.current.style.width = `${width}px`;
  };

  componentDidMount() {
    window.addEventListener('resize', this.updatePosition, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePosition, false);
  }

  componentDidUpdate() {
    this.updatePosition();
  }

  render() {
    const { className, options, selected, disabled, onChange, render, placeholder, ...props } = this.props;
    const keys = getKeys(options);
    const { opened } = this.state;

    return (
      <>
        <div
          className={cn([styles.Select, disabled && styles.disabled, className])}
          tabIndex={0}
          onClick={opened ? this.close : this.open}
          onFocus={this.open}
          onBlur={this.onBlur}
          ref={this.parent}
          {...props}
        >
          {keys.includes(selected) ? render!(options[selected], selected) : placeholder}
        </div>
        <Portal>
          <div className={cn([styles.ListContainer, !opened && styles.hidden])} onClick={this.close}>
            <div className={styles.List} ref={this.list}>
              {keys.map(key => (
                <div
                  key={key as any}
                  className={cn([styles.Item, key === selected && styles.active])}
                  onMouseDown={this.onMouseDown}
                  onClick={this.changed(key)}
                >
                  {render!(options[key], key)}
                </div>
              ))}
            </div>
          </div>
        </Portal>
      </>
    )
  }
}
