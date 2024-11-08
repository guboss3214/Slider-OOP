function SwipeCarousel(){
    Carousel.apply(this, arguments);
    this.slidesContainer = this.container.querySelector("#slides");
}
//Premium
SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;
SwipeCarousel.prototype._initListeners = function(){
    Carousel.prototype._initListeners.apply(this);
    this.slidesContainer.addEventListener("touchstart", this.swipeStartHandler.bind(this));
    this.slidesContainer.addEventListener("mousedown", this.swipeStartHandler.bind(this));
    this.slidesContainer.addEventListener("touchend", this.swipeEndHandler.bind(this));
    this.slidesContainer.addEventListener("mouseup", this.swipeEndHandler.bind(this));
}
SwipeCarousel.prototype.swipeStartHandler = function(e){
    if(e instanceof MouseEvent){
        this.startPosX = e.pageX;
        return;
    }
    if(e instanceof TouchEvent){
        this.startPosX = e.changedTouches[0].pageX; 
    }  
}
SwipeCarousel.prototype.swipeEndHandler = function(e){
    if(e instanceof MouseEvent){
        this.endPosX = e.pageX;
    }
    else if(e instanceof TouchEvent){
        this.endPosX = e.changedTouches[0].pageX;
    }
    if (this.startPosX - this.endPosX > 100) this.nextClick();
    if (this.startPosX - this.endPosX < -100) this.prevClick();
}