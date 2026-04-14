export default class HomePage {
  async render() {
    return `
      <section class="home_page-container">
        <h1>NyaaStories</h1>
        <p>Ayo bagikan kenangan indahmu kepada dunia.</p>
      </section>
    `;
  }

  async afterRender() {}
}
