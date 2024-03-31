export default class NotificationMessage {
    static lastInstance;
    classList = ['notification'];
    constructor(message, {duration = 1000, type = ''} = {}){
        this.message = message;
        this.duration = duration;
        this.type = type;
        this.element = this.createElement();
    }
    setFormatTime(){
        return (this.duration / 1000).toFixed(0) + 's';
    }
    createElement(){
        const element = document.createElement('div');
        if (this.type.length) this.classList.push(this.type);
        element.classList.add(...this.classList);
        element.setAttribute('style', '--value:'+this.setFormatTime());
        element.innerHTML = this.createTemplate();
        return element;
    }
    createTemplate(){
        return (`
            <div class="timer"></div>
            <div class="inner-wrapper">
                <div class="notification-header">${this.type}</div>
                <div class="notification-body">${this.message}</div>
            </div> 
        `);
    }
    show(container = document.body){
        if (NotificationMessage.lastInstance) {
            NotificationMessage.lastInstance.destroy();
        }
        NotificationMessage.lastInstance = this;
        
        this.timerId = setTimeout(() => {
            this.destroy();
        }, this.duration);

        container.appendChild(this.element);
    }
    remove(){
        this.element.remove();
    }
    destroy(){
        this.remove();
        clearTimeout(this.timerId);
    }
}
