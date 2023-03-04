export default class Difference {
    constructor({before, after}){
        this.before = document.querySelector(before);
        this.after = document.querySelector(after);
    }

    hideItem(){
        try{
            this.before.children.forEach(child =>{
                if(!child.classList.contains('officer__card-title') && !child.querySelector('.card__click')){
                    child.style.display = 'none';
                }
            });
            this.after.children.forEach(child =>{
                if(!child.classList.contains('officer__card-title') && !child.querySelector('.card__click')){
                    child.style.display = 'none';
                }
            });

        } catch(e){}
    }

    showItemBefore(){
        let arrayChildHided = [];
        
        try{

            this.before.children.forEach(child =>{
                if(getComputedStyle(child).display == 'none'){
                    arrayChildHided.push(child);
                }
            });
    
            if(arrayChildHided.length == 1){
                this.before.children.forEach(child =>{
                    if(child.querySelector('.card__click')){
                        child.style.display = 'none';
                    }
                });
            }

        } catch(e){}

        arrayChildHided[0].style.display = 'flex';
        arrayChildHided[0].classList.add('animated', 'fadeInUp');
    }

    showItemAfter(){
        let arrayChildHided = [];

        try{
            
            this.after.children.forEach(child =>{
                if(getComputedStyle(child).display == 'none'){
                    arrayChildHided.push(child);
                }
            });

            if(arrayChildHided.length == 1){
                this.after.children.forEach(child =>{
                    if(child.querySelector('.card__click')){
                        child.style.display = 'none';
                    }
                });
            }

        } catch(e){}

        arrayChildHided[0].style.display = 'flex';
        arrayChildHided[0].classList.add('animated', 'fadeInUp');
    }

    init(){
        this.hideItem();
        try{
            this.before.children.forEach(child =>{
                if(!child.classList.contains('officer__card-title') && child.querySelector('.card__click')){
                    const trigger = child.querySelector('.card__click > .plus');
                    trigger.addEventListener('click', () =>{
                        this.showItemBefore();
                    });
                }
            });

            this.after.children.forEach(child =>{
                if(!child.classList.contains('officer__card-title') && child.querySelector('.card__click')){
                    const trigger = child.querySelector('.card__click > .plus');
                    trigger.addEventListener('click', () =>{
                        this.showItemAfter();
                    });
                }
            });

        } catch(e){}
    }

}

