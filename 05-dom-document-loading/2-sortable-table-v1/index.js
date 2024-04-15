export default class SortableTable {
  element;
  subElements = {};
  static subElementList = {
    'header': ['sortable-table__header', 'sortable-table__row'] ,
    'body': ['sortable-table__body'],
    'loading':['loading-line', 'sortable-table__loading-line'] ,
    'emptyPlaceholder': ['sortable-table__empty-placeholder']
  };
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createTableTemplate();
  }

  createTableTemplate(){
    const table = document.createElement('div');
    table.classList.add('sortable-table');
    table.appendChild(this.createTableHeader(this.headerConfig));
    const body = this.createSubElement('body');
    body.innerHTML = this.createTableBodyTemplate(this.headerConfig, this.data);
    table.appendChild(body);
    table.appendChild(this.createSubElement('loading'));
    table.appendChild(this.createSubElement('emptyPlaceholder'));
    return table;
  }

  createSubElement(name){
      const subElement = document.createElement('div');
      subElement.setAttribute('data-element', name);
      subElement.classList.add(...SortableTable.subElementList[name]);
      this.subElements[name] = subElement;
    return subElement;
  }

  createTableHeader(headerConfig){
    const header = this.createSubElement('header');
    header.innerHTML = headerConfig.map((config)=> {
      return (`
        <div class="sortable-table__cell" data-id="${config.id}" data-sortable="${config.sortable}" data-order>
          <span>${config.title}</span>
          ${this.createArrowElementToSort(config.sortable)}
        </div>
      `)
    }).join('');
    return header;
  }
  createArrowElementToSort(isSortable){ 
    return (isSortable) ? (`
    <span data-element="arrow" class="sortable-table__sort-arrow">
            <span class="sort-arrow"></span>
    </span>
    `) : '';
  }
  createTableBodyTemplate(headerConfig, data){
    return data.map(rowData => 
      `
        <a href="/products/${rowData.id}" class="sortable-table__row">
            ${headerConfig.map((config) => this.createBodyColumn(config, rowData)).join('')}
        </a>
      `      
      ).join('');  
  }
  createBodyColumn(config, rowData){
    if (config.template) {
      return config.template(rowData)
    }
    return `<div class="sortable-table__cell">${rowData[config.id]}</div>`;
  }

  sort(fieldValue, orderValue){
      const order = (orderValue == 'desc') ? -1 : 1;
      const cellIndex = this.headerConfig.findIndex(obj => obj.id === fieldValue);
      if(!this.headerConfig[cellIndex].sortable) return;
      switch((this.headerConfig[cellIndex].sortType).toLowerCase()){
        case 'string': 
                this.data.sort((a,b) => order * a[fieldValue].localeCompare(b[fieldValue], 'ru-en', { caseFirst: 'upper' })); 
                      break;
        case 'number':
                this.data.sort((a,b) => order * (a[fieldValue] - b[fieldValue]));
                break;
      }
      this.subElements.body.innerHTML = this.createTableBodyTemplate(this.headerConfig, this.data);
  }
  remove(){
    this.element.remove();
  }
  destroy(){
    this.remove();
  }
}
