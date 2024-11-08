function Carousel(){
    this.container = document.querySelector("#carousel");
    this.slides = this.container.querySelectorAll(".slide");
    this.pauseBtn = this.container.querySelector("#pause");
    this.nextBtn = this.container.querySelector("#next");
    this.prevBtn = this.container.querySelector("#prev");
    this.indecator = this.container.querySelector(".indecators-container");

    this.currentSlide = 0;
    this.isPlaying = true;
    this.intervalId = null;
    this.INTERVAL = 2000;
    this.startPosX = 0;
    this.endPosX = 0;
}

Carousel.prototype = {
    gotoSlide(n){
        this.slides[this.currentSlide].classList.toggle("active");
        this.updateIndecators(this.currentSlide);
        this.currentSlide = (n + this.slides.length) % this.slides.length;
        this.updateIndecators(this.currentSlide);
        this.slides[this.currentSlide].classList.toggle("active");
    },

    tick(){
        this.intervalId = setInterval(() => this.nextSlide(), this.INTERVAL);
    },

    indicatorClickHandler(e){
        const { target } = e;
        if(target && target.classList.contains("indecator")){
            this.gotoSlide(+target.dataset.slideId);
            this.pauseSlider();
        }
    },

    updateIndecators(num){
        this.indecator.children[num].classList.toggle("sync");
    },

    addIndicators(slides){
        for(let i = 0; i < slides.length; i++){
            const div = document.createElement("div");
            div.setAttribute("data-slide-id", i);
            div.classList.add("indecator");
            this.indecator.appendChild(div);
        }
        this.indecator.children[0].classList.add("sync");
    },


    pausePlaySliderHandler(){
        this.isPlaying ? this.pauseSlider() : this.playSlider();
    },

    pauseSlider(){
        this.pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        clearInterval(this.intervalId);
        this.isPlaying = false;
    },
    playSlider(){
        this.pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        this.tick();
        this.isPlaying = true;
    },
    nextSlide() {
        this.gotoSlide(this.currentSlide + 1);
    },

    prevSlide() {
        this.gotoSlide(this.currentSlide - 1);
    },

    nextClickHandler(){
        this.pauseSlider();
        this.nextSlide();
    },

    prevClickHandler(){
        this.pauseSlider();
        this.prevSlide();
    },

    pressKeyHandler(e){
        if(e.keyCode === 39) this.nextClickHandler();
        if(e.keyCode === 37) this.prevClickHandler();
        if(e.keyCode === 32){
            e.preventDefault();
            this.pausePlaySliderHandler();
        }
    },

    swipeStartHandler(e){
        if(e instanceof MouseEvent){
            this.startPosX = e.pageX;
            return;
        }
        if(e instanceof TouchEvent){
            this.startPosX = e.changedTouches[0].pageX; 
        }
        
    },

    swipeEndHandler(e){
        if(e instanceof MouseEvent){
            this.endPosX = e.pageX;
        }
        else if(e instanceof TouchEvent){
            this.endPosX = e.changedTouches[0].pageX;
        }
        
        if (this.startPosX - this.endPosX > 100) this.nextClickHandler();
        if (this.startPosX - this.endPosX < -100) this.prevClickHandler();
    },


    initListeners(){
        this.pauseBtn.addEventListener("click", this.pausePlaySliderHandler.bind(this));
        this.nextBtn.addEventListener("click", this.nextClickHandler.bind(this));
        this.prevBtn.addEventListener("click", this.prevClickHandler.bind(this));
        this.indecator.addEventListener("click", this.indicatorClickHandler.bind(this));
        document.addEventListener("keydown", this.pressKeyHandler.bind(this));
        this.container.addEventListener("touchstart", this.swipeStartHandler.bind(this));
        this.container.addEventListener("mousedown", this.swipeStartHandler.bind(this));
        this.container.addEventListener("touchend", this.swipeEndHandler.bind(this));
        this.container.addEventListener("mouseup", this.swipeEndHandler.bind(this));
    },
    init(){
        this.initListeners();
        this.addIndicators(this.slides);
        this.tick();
    },
}

Carousel.prototype.constructor = Carousel;

const carousel = new Carousel();
carousel.init();



