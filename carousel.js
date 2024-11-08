function Carousel(containerId = '#carousel', slidesId = '.slide', interval = 2000, isPlaying = true){
    this.container = document.querySelector(containerId);
    this.slides = this.container.querySelectorAll(slidesId);
    this.INTERVAL = interval;
    this.isPlaying = isPlaying;
}

Carousel.prototype = {
    _initProps(){
        this.currentSlide = 0;
        this.indecator = this.container.querySelector(".indecators-container");
        
    },
    _initControls(){
        const controls = document.createElement("div");
        controls.classList.add("controls");
        const PREV = `<div id="prev" class="prev"><i class="fa-solid fa-arrow-left"></i></div>`;
        const PAUSE =  `<div id="pause" class="pause"><i class="fa-solid fa-pause"></i></div>`;
        const NEXT = `<div id="next" class="next"><i class="fa-solid fa-arrow-right"></i></div>`;
        controls.innerHTML = PREV + PAUSE + NEXT;
        this.container.appendChild(controls);

        this.pauseBtn = this.container.querySelector("#pause");
        this.nextBtn = this.container.querySelector("#next");
        this.prevBtn = this.container.querySelector("#prev");
    },
    _initListeners(){
        this.pauseBtn.addEventListener("click", this.pausePlaySlider.bind(this));
        this.nextBtn.addEventListener("click", this.nextClick.bind(this));
        this.prevBtn.addEventListener("click", this.prevClick.bind(this));
        this.indecator.addEventListener("click", this._indicatorClick.bind(this));
        document.addEventListener("keydown", this._pressKey.bind(this));
    },
    _gotoSlide(n){
        this.slides[this.currentSlide].classList.toggle("active");
        this.updateIndecators(this.currentSlide);
        this.currentSlide = (n + this.slides.length) % this.slides.length;
        this.updateIndecators(this.currentSlide);
        this.slides[this.currentSlide].classList.toggle("active");
    },

    _tick(){
        this.intervalId = setInterval(() => this._nextSlide(), this.INTERVAL);
    },

    _indicatorClick(e){
        const { target } = e;
        if(target && target.classList.contains("indecator")){
            this._gotoSlide(+target.dataset.slideId);
            this.pauseSlider();
        }
    },

    _playSlider(){
        this.pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        this._tick();
        this.isPlaying = true;
    },
    _nextSlide() {
        this._gotoSlide(this.currentSlide + 1);
    },

    _prevSlide() {
        this._gotoSlide(this.currentSlide - 1);
    },
    _pressKey(e){
        if(e.keyCode === 39) this.nextClick();
        if(e.keyCode === 37) this.prevClick();
        if(e.keyCode === 32){
            e.preventDefault();
            this.pausePlaySlider();
        }
    },

    nextClick(){
        this.pauseSlider();
        this._nextSlide();
    },

    prevClick(){
        this.pauseSlider();
        this._prevSlide();
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


    pausePlaySlider(){
        this.isPlaying ? this.pauseSlider() : this._playSlider();
    },

    pauseSlider(){
        this.pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        clearInterval(this.intervalId);
        this.isPlaying = false;
    },
    init(){
        this._initProps();
        this._initControls();
        this._initListeners();
        this.addIndicators(this.slides);
        this._tick();
    },
}

Carousel.prototype.constructor = Carousel;