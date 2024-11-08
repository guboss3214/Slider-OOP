import Carousel from "./carousel.js";

class SwipeCarousel extends Carousel{
    constructor(...args){
        super(...args);
        this.slidesContainer = this.slides[0]?.parentNode;
    }
    _initListeners(){
        super._initListeners();
        this.slidesContainer.addEventListener("touchstart", this._swipeStart.bind(this));
        this.slidesContainer.addEventListener("mousedown", this._swipeStart.bind(this));
        this.slidesContainer.addEventListener("touchend", this._swipeEnd.bind(this));
        this.slidesContainer.addEventListener("mouseup", this._swipeEnd.bind(this));
    }
    _swipeStart(e){
        if(e instanceof MouseEvent){
            this.startPosX = e.pageX;
            return;
        }
        if(e instanceof TouchEvent){
            this.startPosX = e.changedTouches[0].pageX; 
        }  
    }
    _swipeEnd(e){
        if(e instanceof MouseEvent){
            this.endPosX = e.pageX;
        }
        else if(e instanceof TouchEvent){
            this.endPosX = e.changedTouches[0].pageX;
        }
        if (this.startPosX - this.endPosX > 100) this.nextClick();
        if (this.startPosX - this.endPosX < -100) this.prevClick();
    }
}

export default SwipeCarousel;