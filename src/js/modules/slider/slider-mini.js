import Slider from './slider';

export default class MiniSlider extends Slider{
    constructor(container, next, prev, activeClass, animate, autoplay){
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSLides(){
        this.slides.forEach(slide =>{
           slide.classList.remove(this.activeClass); 
           if(this.animate){
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        if(!this.slides[0].closest('button')) this.slides[0].classList.add(this.activeClass);
       

        if(this.animate){
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    bindTriggers(){
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () =>{
            for(let i = this.slides.length - 1; i > 0; i--){
                if(this.slides[i].tagName !== 'BUTTON'){
                    // Перебираем все слайды, начиная с последнего слайда (i = slides.length - 1) 
                    // и заканчивая вторым слайдом (i > 0).
                    this.container.insertBefore(this.slides[i], this.slides[0]);
                    // Для каждого слайда меняем его позицию, перемещая его перед первым слайдом в контейнере.
                    this.decorizeSLides();
                    // Вызываем метод, который применяет стили к активному слайду и декору к другим слайдам.
                    break;
                    // Прерываем цикл после первой итерации, чтобы переставить только один слайд.
                }
              }
        });

    }

    nextSlide(){
        if(this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON') {
            const firstSlide = this.slides[0];
            const secondSlide = this.slides[1];
            const thirdSlide = this.slides[2];
        
            // Удаляем первые три слайда из текущей позиции
            this.container.removeChild(firstSlide);
            this.container.removeChild(secondSlide);
            this.container.removeChild(thirdSlide);
        
            // Добавляем первые три слайда в конец контейнера
            this.container.appendChild(firstSlide);
            this.container.appendChild(secondSlide);
            this.container.appendChild(thirdSlide);
            this.decorizeSLides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSLides();
        }
    }

    init(){
        try{

            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;
            this.bindTriggers();
            this.decorizeSLides();

            if(this.autoplay){
                setInterval(()=>{this.nextSlide();}, 5000);
            }

        } catch(e){}
    }
    
}