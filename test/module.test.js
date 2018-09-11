const { Nuxt, Builder } = require('nuxt');
const jsdom = require('jsdom');
const request = require('request-promise-native');

const config = require('./fixture/nuxt.config');

const { JSDOM } = jsdom;
const getDom = html => (new JSDOM(html)).window.document;
const url = path => `http://localhost:3000${path}`;
const get = path => request(url(path));

const GPT_LIB_SCRIPT_ID = 'google-publisher-tag-lib-script';
const GPT_INIT_SCRIPT_ID = 'google-publisher-tag-init-script';

describe('basic', () => {
  let nuxt;

  beforeAll(async () => {
    nuxt = new Nuxt(config);
    await new Builder(nuxt).build();
    await nuxt.listen(3000);
  }, 60000);

  afterAll(async () => {
    await nuxt.close();
  });

  test('Render', async () => {
    const html = await get('/');
    expect(html).toContain('Works!');
  });

  test('Injects Google Publisher Tag lib', async () => {
    const html = await get('/');
    const dom = getDom(html);
    const node = dom.querySelector(`head #${GPT_LIB_SCRIPT_ID}`);
    expect(node.src).toBe('https://www.googletagservices.com/tag/js/gpt.js');
  });

  test('Injects Google Publisher Tag init script', async () => {
    const html = await get('/');
    const dom = getDom(html);
    const node = dom.querySelector(`head #${GPT_INIT_SCRIPT_ID}`);
    expect(node).not.toBeNull();
  });

  test('Renders a div for the ad', async () => {
    const html = await get('/');
    const dom = getDom(html);
    const node = dom.querySelector('#ad-container > div');
    expect(node).not.toBeNull();
  });
});
