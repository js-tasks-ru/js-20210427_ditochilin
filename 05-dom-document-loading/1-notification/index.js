export default class NotificationMessage {
    
    static currentMessage;
    constructor(message, settings) {
        this.update(message, settings);
        this.dialogBox = document.querySelector('#targetDialog');
    }

    render() {        
        const element = document.createElement('div');
        element.innerHTML = this.dialogBoxBuilder(this.message, this.type, this.duration / 1000);        
        this.element = element.firstElementChild;

        NotificationMessage.currentMessage = this.element;
    }

    update(message, settings) {
        if(NotificationMessage.currentMessage) {
            NotificationMessage.currentMessage.remove();
        }
        this.message = message;
        
        if (settings) {      
            this.duration = settings.duration;
            this.type = settings.type;         
        }
        this.render();
      }

    show(targetDiv) {
        if(targetDiv) {
            targetDiv.append(this.element);
        }
        
         setTimeout(() => {            
             this.destroy();         
         }, this.duration);
    }


    dialogBoxBuilder(message, type, duration) {
        return `
        <div class="notification ${type}" style="--value:${duration}s">
            <div class="timer"></div>
            <div class="inner-wrapper">
                <div class="notification-header">${type}</div>
                <div class="notification-body">
                    ${message}
                </div>
            </div>
         </div>
      `;
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }
}