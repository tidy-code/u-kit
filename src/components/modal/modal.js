import StylesTXT from './modal.css';

const PRIVATE_KEYS = {
  shRoot: Symbol("shRoot")
}

class Modal extends HTMLElement {
  constructor() {
    super();
    this._bind = false;
    this[PRIVATE_KEYS.shRoot] = this.attachShadow({mode: 'closed'});
    this[PRIVATE_KEYS.shRoot].innerHTML = `
      <style>${StylesTXT}</style>
      <div id="backdrop"></div>
      <div class="container">
        <header>
          <slot name="header"></slot>
          <button id="closeBtn">&times;</button>
        </header>
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    this._bind = this.hasAttribute('bind');
    this[PRIVATE_KEYS.shRoot]
      .getElementById('closeBtn')
      .addEventListener('click', this.close);

    this[PRIVATE_KEYS.shRoot]
      .getElementById('backdrop')
      .addEventListener('click', this.close);
  }

  close = (e) => {
    if (typeof e === 'undefined') {
      this.removeAttribute('show');
      return;
    }

    if (e.target !== e.currentTarget) {
      return;
    }

    if (this._bind) {
      this.removeAttribute('show');
    } else {
      this.dispatchEvent(new Event('close'));
    }
  }

  open = () => {
    this.setAttribute('show', '');
  }
}

export default Modal;
