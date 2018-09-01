import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
    constructor(els, offset, delay = 0){
        this.itemsToReveal = $(`${els}__reveal`);
        this.corner = $(`${els}__corner`);
        this.delay = delay
        this.offsetPercentage = offset;
        this.hideInitally();
        this.createWaypoints();
    }

    hideInitally() {
        this.itemsToReveal.addClass('reveal-item');
    }
    //ES6 method with arrow functions
    createWaypoints(){
        this.itemsToReveal.each(el => {
            new Waypoint({
                element: this.itemsToReveal[el],
                handler: () => {
                    this.corner.each(el => $(this.corner[el]).addClass('showCorner'));
                    const reveal = () => $(this.itemsToReveal[el]).addClass('reveal-item--visible');
                    setTimeout(reveal, this.delay);
                },
                offset: this.offsetPercentage
            })
        })

    }
}

export default RevealOnScroll;