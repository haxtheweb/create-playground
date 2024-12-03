import { html, fixture, expect } from '@open-wc/testing';
import "../create-playground.js";

describe("CreatePlayground test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <create-playground
        title="title"
      ></create-playground>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
