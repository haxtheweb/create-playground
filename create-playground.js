/**
 * Copyright 2024 btopro
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/web-container/web-container.js";

/**
 * `create-playground`
 * 
 * @demo index.html
 * @element create-playground
 */
export class CreatePlayground extends DDDSuper(LitElement) {

  static get tag() {
    return "create-playground";
  }

  constructor() {
    super();
    const urlParams = new URLSearchParams(globalThis.location.search);
    const name = urlParams.get('name');
    this.name = name || 'my-element';
    this.type = 'webcomponent';
    this.commands = [];
    /*this.commands = [
      "npm install".split(' '),
      `hax webcomponent ${this.name} --no-extras --auto --quiet --y`.split(' '),
      `cd ${this.name}`.split(' '),
      `npm install`.split(' '),
      `npm start`.split(' '),
    ];*/
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      // this is so we can have different tutorials that run
      type: { type: String, reflect: true },
      name: { type: String },
      commands: { type: Array },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--create-playground-label-font-size, var(--ddd-font-size-s));
      }
      web-container {
        background-color: var(--ddd-accent-1);
        border: var(--ddd-border-xs);
        border-radius: var(--ddd-radius-xs);
        box-shadow: var(--ddd-boxShadow-sm);
        min-height:400px;
        width: 100%;
        display: block;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`<web-container
    ?hide-editor="${this.type === "site"}"
    @web-container-dependencies-installing="${this.installStart}"
    @web-container-dependencies-installed="${this.installComplete}"
    @web-container-server-ready="${this.serverReady}"
    .commands="${this.commands}"
    ></web-container>`;
  }
  async serverReady(e) {
    let wc = this.shadowRoot.querySelector('web-container');
    // right now we don't do anything when the site is ready
    if (this.type === "site") {

    }
    else {
      wc.fname = `${this.name}/${this.name}.js`;
      let file = await wc.readFile(`${this.name}/${this.name}.js`);
      wc.setCodeEditor(file);
      // add references for all the files we care about
      wc.filesShown = [
        {
          file: `${this.name}/${this.name}.js`,
          label: `${this.name}.js`
        },
        {
          file: `${this.name}/index.html`,
          label: `index.html`
        },
        {
          file: `${this.name}/lib/${this.name}.haxProperties.json`,
          label: `${this.name}.haxProperties.json`
        },
        {
          file: `${this.name}/package.json`,
          label: `package.json`
        },
      ];
    }
  }
  installStart(e) {
   // alert("NPM install starting..");
  }
  installComplete(e) {
    //alert("NPM install complete!");
  }
  // start command type / name shift
  getStartCommand() {
    if (this.type === 'site') {
      return `hax site ${this.name} --y --theme='clean-one'`;
    }
    return `hax webcomponent ${this.name} --y --no-i`;
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    // sets file initially but we need to do more after since this command creates other files
    this.shadowRoot.querySelector('web-container').files = {
      "package.json": {
        file: {
          contents: `
            {
              "name": "create-playground",
              "type": "module",
              "dependencies": {
                "@haxtheweb/create": "latest"
              },
              "scripts": {
                "start": "${this.getStartCommand()}",
                "hax": "hax"
              }
            }`
        }
      }
    }
  }

}

globalThis.customElements.define(CreatePlayground.tag, CreatePlayground);