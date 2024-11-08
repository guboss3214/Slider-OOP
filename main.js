(function () {
    const container = document.querySelector("#carousel");
    const slides = container.querySelectorAll(".slide");
    const pauseBtn = container.querySelector("#pause");
    const nextBtn = container.querySelector("#next");
    const prevBtn = container.querySelector("#prev");
    const indecator = container.querySelector(".indecators-container");

    let currentSlide = 0;
    let isPlaying = true;
    let intervalId = null;
    const INTERVAL = 2000;
    let startPosX = 0;
    let endPosX = 0;


    function gotoSlide(n){
        slides[currentSlide].classList.toggle("active");
        updateIndecators(currentSlide);
        currentSlide = (n + slides.length) % slides.length;
        updateIndecators(currentSlide);
        slides[currentSlide].classList.toggle("active");
    }

    function tick(){
        intervalId = setInterval(nextSlide, INTERVAL);
    }

    function indicatorClickHandler(e){
        const { target } = e;
        if(target && target.classList.contains("indecator")){
            gotoSlide(+target.dataset.slideId);
            pauseSlider();
        }
    }

    function updateIndecators(num){
        indecator.children[num].classList.toggle("sync");
    }

    function addIndicators(slides){
        for(let i = 0; i < slides.length; i++){
            const div = document.createElement("div");
            div.setAttribute("data-slide-id", i);
            div.classList.add("indecator");
            indecator.appendChild(div);
        }
        indecator.children[0].classList.add("sync");
    }


    function pausePlaySliderHandler(){
        isPlaying ? pauseSlider() : playSlider();
    }

    function pauseSlider(){
        pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        clearInterval(intervalId);
        isPlaying = false;
    }
    function playSlider(){
        pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        tick();
        isPlaying = true;
    }
    function nextSlide() {
        gotoSlide(currentSlide + 1);
    }

    function prevSlide() {
        gotoSlide(currentSlide - 1);
    }

    function nextClickHandler(){
        pauseSlider();
        nextSlide();
    }

    function prevClickHandler(){
        pauseSlider();
        prevSlide();
    }

    function pressKeyHandler(e){
        if(e.keyCode === 39) nextClickHandler();
        if(e.keyCode === 37) prevClickHandler();
        if(e.keyCode === 32){
            e.preventDefault();
            pausePlaySliderHandler();
        }
    }

    function swipeStartHandler(e){
        if(e instanceof MouseEvent){
            startPosX = e.pageX;
            return;
        }
        if(e instanceof TouchEvent){
            startPosX = e.changedTouches[0].pageX; 
        }
        
    }

    function swipeEndHandler(e){
        if(e instanceof MouseEvent){
            endPosX = e.pageX;
        }
        else if(e instanceof TouchEvent){
            endPosX = e.changedTouches[0].pageX;
        }
        
        if (startPosX - endPosX > 100) nextClickHandler();
        if (startPosX - endPosX < -100) prevClickHandler();
    }


    function initListeners(){
        pauseBtn.addEventListener("click", pausePlaySliderHandler);
        nextBtn.addEventListener("click", nextClickHandler);
        prevBtn.addEventListener("click", prevClickHandler);
        indecator.addEventListener("click", indicatorClickHandler);
        document.addEventListener("keydown", pressKeyHandler);
        container.addEventListener("touchstart", swipeStartHandler);
        container.addEventListener("mousedown", swipeStartHandler);
        container.addEventListener("touchend", swipeEndHandler);
        container.addEventListener("mouseup", swipeEndHandler);
    }
    function init(){
        initListeners();
        addIndicators(slides);
        tick();
    }
    init();
}())

