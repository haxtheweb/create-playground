/**
 * Copyright 2024 btopro
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/web-container/web-container.js";
import "@haxtheweb/rpg-character/rpg-character.js";

/**
 * `create-playground`
 * 
 * @demo index.html
 * @element create-playground
 */
export class CreatePlayground extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "create-playground";
  }

  constructor() {
    super();
    this.title = "";
    this.name = prompt("Element name") || 'my-element';
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/create-playground.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      name: { type: String },
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
    `];
  }

  // Lit render the HTML
  render() {
    return html`<web-container
    @web-container-dependencies-installing="${this.installStart}"
    @web-container-dependencies-installed="${this.installComplete}"
    @web-container-server-ready="${this.serverReady}"
    ></web-container>`;
  }
  async serverReady(e) {
    let wc = this.shadowRoot.querySelector('web-container');
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
        file: `${this.name}/package.json`,
        label: `package.json`
      },
    ];
  }
  installStart(e) {
   // alert("NPM install starting..");
  }
  installComplete(e) {
    //alert("NPM install complete!");
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
                "start": "hax webcomponent ${this.name} --y --no-i",
                "hax": "hax"
              }
            }`
        }
      }
    }
  }

}

globalThis.customElements.define(CreatePlayground.tag, CreatePlayground);