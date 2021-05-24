//import { doc } from "prettier";

class Tooltip {
    static instance;
    element;

    constructor() {
        if (Tooltip.instance) return Tooltip.instance;

        Tooltip.instance = this;
    }

    initialize() {    
        document.addEventListener('pointerover', this.onStartShowToolTip);
        document.addEventListener('pointerout', this.onStopShowToolTip);
    }

    onStartShowToolTip = event => {
        const targetElem = event.target.closest('[data-tooltip]');
        if (targetElem) {
            this.render(targetElem.dataset.tooltip);
            document.addEventListener('pointermove', this.onPointerMove);
        }
    }

    onPointerMove = event => {
        this.updateTooltip(event);
    }

    updateTooltip(event) {
        this.element.style.top = `${event.clientY}px`;
        this.element.style.left = `${event.clientX}px`;
    }

    onStopShowToolTip = event => {
        this.remove();
    }

    render(toolTipMessage) {
        this.element = document.createElement('div');
        this.element.className = 'tooltip';
        this.element.innerHTML = toolTipMessage;
    
        document.body.append(this.element);
    }

    remove() {
        if (this.element) {
            this.element.remove();
        }
      }
    
      destroy() {
        const targetElems = document.querySelectorAll('[data-tooltip]');

        targetElems.forEach(item => item.removeEventListener('pointerover', this.onStartShowToolTip));  
        this.remove();
      }
}

export default Tooltip;
