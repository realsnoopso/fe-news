import { add, addStyle, addShadow, getProperty, selectAll } from '@utils/dom';
import style from './ControllerStyle';
import store from '@store/index';

interface Controller {}

class Controller extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    const template = `
      <controller-item-element position="left"></controller-item-element>
      <controller-item-element position="right"></controller-item-element>
    `;

    addShadow({ target: this });
    add({
      target: this.shadowRoot,
      template,
    });
    addStyle({
      target: this.shadowRoot,
      style: style(),
    });
  }
}

export default Controller;
