const slider = document.querySelector('.slider')
const sliderList = document.querySelector('.slider-list')
const sliderItems = document.querySelectorAll('.slider-list__item')
const prewBtn = document.querySelector('.prew')
const nextBtn = document.querySelector('.next')

let activeSlide = 0;
let moveSlide = 100;
let timeMove = 1000;
let dir = 'X';
let interval = timeMove + 1000;

let autoPlaySlider = setInterval(function(){
    move(nextBtn)
}, interval);
slider.addEventListener('mouseenter', function(){
    clearInterval(autoPlaySlider)
})
slider.addEventListener('mouseleave', function(){
    autoPlaySlider = setInterval(function(){
        move(nextBtn)
    }, interval);
})

sliderItems.forEach(function(slide, key){
    if(activeSlide != key){
        slide.style.transform = `translate${dir}(${moveSlide}%)`
    }
    if(key == sliderItems.length - 1){
        slide.style.transform = `translate${dir}(${-moveSlide}%)`
    }
})

prewBtn.addEventListener('click', function(){move(prewBtn)})
nextBtn.addEventListener('click', function(){move(nextBtn)})

function move(btn){
    prewBtn.disabled = true
    nextBtn.disabled = true
    setTimeout(() => {
        prewBtn.disabled = false
        nextBtn.disabled = false
    }, timeMove + 200);

    let btnPrewOrNext = nextBtn == btn ? -moveSlide : moveSlide;
    sliderItems.forEach(function(slide, key){
        if(activeSlide != key){
            slide.style.transform = `translate${dir}(${-btnPrewOrNext}%)`
            slide.style.transition = `0ms`
        }
    })
    setTimeout(() => {
        sliderItems[activeSlide].style.transform = `translate${dir}(${btnPrewOrNext}%)`
        sliderItems[activeSlide].style.transition = `${timeMove}ms`
        sliderDotsLi[activeSlide].classList.remove('active')
        if(btn == nextBtn){
            activeSlide++
            if(activeSlide >= sliderItems.length){
                activeSlide = 0;
            }
        }else if(btn == prewBtn){
            activeSlide--
            if(activeSlide < 0){
                activeSlide = sliderItems.length - 1
            }
        }
        sliderItems[activeSlide].style.transform = `translate${dir}(${0}%)`
        sliderItems[activeSlide].style.transition = `${timeMove}ms`
        sliderDotsLi[activeSlide].classList.add('active')
    }, 100);
}
// dots
const ul = document.createElement('ul');
ul.classList.add('slider-dots')
sliderItems.forEach(function(slide, key){
    const li = document.createElement('li')
    ul.appendChild(li)
})
slider.appendChild(ul)
const sliderDotsLi = document.querySelectorAll('.slider-dots li')
sliderDotsLi[activeSlide].classList.add('active')
sliderDotsLi.forEach(function(dot, key){
    dot.addEventListener('click', function(){controllerDots(key)})
})
let active = true
function controllerDots(dotKey){
    if(active && dotKey != activeSlide){
        sliderItems.forEach(function(slide){
            slide.style.transition = '0ms'
        })
        active = false
        sliderDotsLi.forEach(function(dot){dot.classList.remove('active')});
        let dotLeftOrRight = dotKey > activeSlide ? -moveSlide : moveSlide
        sliderItems[dotKey].style.transform = `translate${dir}(${-dotLeftOrRight}%)`
        setTimeout(() => {
            sliderItems[activeSlide].style.transform = `translate${dir}(${dotLeftOrRight}%)`
            sliderItems[activeSlide].style.transition = `${timeMove}ms`
            sliderDotsLi[activeSlide].classList.remove('active')
            activeSlide = dotKey
            sliderItems[activeSlide].style.transform = `translate${dir}(${0}%)`
            sliderItems[activeSlide].style.transition = `${timeMove}ms`
            sliderDotsLi[activeSlide].classList.add('active')
        }, 100);
        setTimeout(() => {
            active = true
        }, timeMove + 200);
    }
}