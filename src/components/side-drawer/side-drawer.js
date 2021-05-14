import StylesTXT from './slide-drawer.css';

const initialProps = {
  width: "25rem",
  maxWidth: '80%',
};

export default class SideDrawer extends HTMLElement {
  constructor() {
    super();
    
    this._backdrop = this.hasAttribute('backdrop');
    this._width = this.hasAttribute('width') ? this.getAttribute('width') : initialProps.width;
    this._maxWidth = this.hasAttribute('width') ? 'inherit' : initialProps.maxWidth;

    this._shadowRoot = this.attachShadow({mode: "closed"});
    this._shadowRoot.innerHTML = `
      <style>${StylesTXT}
        aside {
          width: ${this._width};
          max-width: ${this._maxWidth};
        }
      </style>
      ${this.backdrop ?? `<div id="backdrop" style="visibility: hidden"></div>`}
      <aside>
        <span id="button">
          <slot name="button">
            <button id="burger-btn">
              <span id="burger-icon" />
            </button>
          </slot>
        </span>

        <slot />
      </aside>
    `;
  }
  connectedCallback() {
    this
      ._shadowRoot
      .getElementById('backdrop')
      .addEventListener('click', this.toggle.bind(this, false, true));

    this
      ._shadowRoot
      .getElementById('burger-btn')
      .addEventListener('click', this.toggle.bind(this, undefined, false));

  }

  toggle(show, selfEventsOnly, e) {
    if (selfEventsOnly && e.currentTarget !== e.target) {
      return;
    }
    const shouldShow = typeof show === "boolean" ? show : !this.hasAttribute('open');
    console.log({shouldShow, show, hasAttribute: this.hasAttribute('open')})
    if (shouldShow) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }

    this.dispatchEvent(new Event('change'));
  }
}
