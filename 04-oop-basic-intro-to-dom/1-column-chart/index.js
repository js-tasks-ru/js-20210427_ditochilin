export default class ColumnChart {
  constructor(chatData) {
    this._chartHeight = 50;
    this.update(chatData);
  }

  get chartHeight() {
    return this._chartHeight;
  }
    
  render() {
    const element = document.createElement('div');

    element.innerHTML = `
          <div class="column-chart" style="--chart-height: 50">
             <div class="column-chart__title">

             </div>
             <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">
                </div>
                <div data-element="body" class="column-chart__chart">
                </div>
             </div>
          </div>
        `;
        
    const chartTitle = element.querySelector('.column-chart__title');
    if (this.label) {
      chartTitle.innerHTML = `Total ${this.label}`;
    }

    if (this.link) {
      chartTitle.innerHTML += `
        <a href="${this.link}" class="column-chart__link">View all</a>
        `;
    }

    if (this.value) {
      const chatHeader = element.querySelector('.column-chart__header');
      chatHeader.innerHTML = 
            this.formatHeading ? this.formatHeading(this.value) : this.value;
    }

    if (this.data && this.data.length > 0) {
      const charChart = element.querySelector('.column-chart__chart');
      const maxData = this.data.reduce((x, y) => Math.max(x, y));
      const idx = this.chartHeight / maxData;
      this.data.forEach( item =>
        charChart.innerHTML += `
            <div style="--value: ${Math.floor(item * idx)}" data-tooltip="${(100 * item / maxData).toFixed(0)}%"></div>
            `
      );
    }

    if (!this.data || this.data.length === 0) {
      const columnChart = element.querySelector('.column-chart');
      columnChart.classList.add('column-chart_loading');
    }

    this.element = element.firstElementChild;
  }

  update(chatData) {
    if (chatData !== undefined) {      
      this.data = chatData.data;
      this.label = chatData.label;
      this.link = chatData.link;  
      this.value = chatData.value;
      this.formatHeading = chatData.formatHeading;  
    }
    this.render();
  }
    
  remove () {
    this.element.remove();
  }
    
  destroy() {
    this.remove();
  }
}
    
