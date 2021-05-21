export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    if (data instanceof Object) {
      this.data = data.data;  
    } else {
      this.data = data;
    }
    this.render();
  }

  getTable() {
    return `
    <div class="sortable-table">
      ${this.getHeader()}
      ${this.getBody()}
    </div>
    `;
  }

  getHeader() {
    return `
    <div data-element="header" class="sortable-table__header sortable-table__row">
        ${ this.getHeaderCell()}
    </div>
    `;
  }

  getHeaderCell() {
    return this.headerConfig.map(headerCell => `
    <div class="sortable-table__cell" data-id="${headerCell.id}" data-sortable="${headerCell.sortable}">
      <span>${headerCell.title}</span>
      ${this.getSortArrow()}
    </div>
    `).join('');
  }

  getSortArrow() {
    return `
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
    `;
  }

  getBody() {
    return `<div data-element="body" class="sortable-table__body">
              ${this.getBodyRows(this.data)}
          </div>`;
  }

  getRowImage(template, item) {
    if (template) {
      return template(item.images);
    } 
    return '';
  }

  getBodyRows(data) {
    const template = this.headerConfig[0].template;
    return data.map(item => 
      `<a href="/${item.id}" class="sortable-table__row">
        ${this.getRowImage(template, item)}
        <div class="sortable-table__cell">${item.title}</div>
        <div class="sortable-table__cell">${item.quantity}</div>
        <div class="sortable-table__cell">${item.price}</div>
        <div class="sortable-table__cell">${item.sales}</div>
      </a>  
      `).join('');
  }

  render() {        
    const element = document.createElement('div');
    
    element.innerHTML = this.getTable();

    this.element = element.firstElementChild;
    this.subElements = this.getNodes(element);
  }

  getNodes(element) {
    const nodes = element.querySelectorAll('[data-element]');
    
    const res = {};
    for (const node of nodes) {
      const name = node.dataset.element;
      res[name] = node;
    }

    return res;
  }

  sort(fieldValue, orderValue) {
    const sortedData = this.sortByValue(fieldValue, orderValue);
    const columns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const selectedColumn = this.element.querySelector(`.sortable-table__cell[data-id="${fieldValue}"]`);

    columns.forEach(col => col.dataset.order = '');

    selectedColumn.dataset.order = orderValue;

    this.subElements.body.innerHTML = this.getBodyRows(sortedData);
  }

  sortByValue(fieldValue, orderValue) {
    const arr = [...this.data];
    const col = this.headerConfig.find(c => c.id === fieldValue);
    const {sortType} = col;
    const directions = {
      asc: 1,
      desc: -1
    };
    const dir = directions[orderValue];

    return arr.sort((x, y) => {
      switch (sortType) {
      case 'number' :
        return dir * (x[fieldValue] - y[fieldValue]);
      case 'string' :
        return dir * x[fieldValue].localeCompare(y[fieldValue], ['ru', 'en']);
      default :
        return dir * (x[fieldValue] - y[fieldValue]);  
      }
    });
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

