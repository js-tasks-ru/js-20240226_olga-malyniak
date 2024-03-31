export default class ColumnChart {
    element;
    chartHeight = 50;
    defaultClassName = 'column-chart';
    constructor({
        data = [],
        label = '',
        link = '',
        value = 0,
        formatHeading = value => value
        } = {}){
            this.label = label;
            this.value = value;
            this.link = link;
            this.formatHeading = formatHeading;
            this.data = data;
            this.element = this.createElement();
        }
    createElement(){
        const element = document.createElement('div');
        element.innerHTML = this.createTemplate();
        return element.firstElementChild;
    }
    createLink(){
        if (this.link) return (`<a class="column-chart__link" href="${this.link}">View all</a>`);
        return '';
    }
    createChartBody(){
        return this.getColumnProps()
                .map(({percent, value}) => {
                    return `<div style="--value: ${value}" data-tooltip="${percent}"></div>`;
                })
                .join('');
    }
    getColumnProps() {
        const maxValue = Math.max(...this.data);
        const scale = 50 / maxValue;
        
        return this.data.map(item => {
            return {
            percent: (item / maxValue * 100).toFixed(0) + '%',
            value: String(Math.floor(item * scale))
            };
        });
    }
    setClassName(){
        return (this.data.length) ? this.defaultClassName : this.defaultClassName + '  column-chart_loading'; 
    }
    createTemplate(){
        return (`
        <div class="${this.setClassName()}" style="--chart-height: ${this.chartHeight}">
            <div class="column-chart__title">
                ${this.label}
                ${this.createLink()}
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
                <div data-element="body" class="column-chart__chart">
                    ${this.createChartBody()}
                </div>
            </div>
        </div>
        `);
    }
    update(newData){
        this.data = newData;
        this.element.querySelector('.column-chart__chart').innerHTML = this.createChartBody();
    }
    remove(){
        this.element.remove();
    }
    destroy(){
        this.remove();
    }
}
