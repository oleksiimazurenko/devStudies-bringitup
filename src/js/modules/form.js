export default class Form{

    constructor({forms}){
        this.forms = document.querySelectorAll(forms);
        this.statusParrent = {
            success: "Great! We will contact you shortly!",
            loading: "Please wait loading",
            failure: "Something went wrong"
        };                  
    }

   async postData(url, data){

        let res = await fetch(url, {
            method: "POST",
            body: data
        });
    
        return await res.text();
    }

    bindStatusBlock(form, statusText){
        let aClearTimeout;

        if(form.querySelector('.policy') && !form.querySelector('.status')){
            
            const statusMessage = document.createElement('div');
            statusMessage.classList.add("status");
            form.querySelector('.policy').insertAdjacentElement('beforebegin', statusMessage);
            statusMessage.style.cssText = `font-weight: 400; line-height: 18px; font-size: 12px; color: #fff; mix-blend-mode: normal; opacity: .89;`;
            
            statusMessage.textContent = statusText;
            
            form.querySelector('div.policy').style.display = 'none';
            aClearTimeout = setTimeout(() => {
                form.querySelector('.policy').style.display = 'block';
                statusMessage.style.display = 'none';
            }, 5000);

        } else if(form.querySelector('.status')){

            const statusMessage = document.querySelector('.status');

            statusMessage.textContent = statusText;
            statusMessage.style.display = 'block';

            clearTimeout(aClearTimeout);

            form.querySelector('div.policy').style.display = 'none';
            aClearTimeout = setTimeout(() => {
                form.querySelector('.policy').style.display = 'block';
                statusMessage.style.display = 'none';
            }, 5000);
        }

        if(form.lastElementChild.nodeName === 'BUTTON'){
            const lastBlock = document.createElement('div');
            lastBlock.style.cssText = `
                display: flex;
                justify-content: flex-start;
                margin-top: 32px;
                align-items: center;
            `;
            lastBlock.classList.add("form__item");
            form.lastElementChild.insertAdjacentElement('beforebegin', lastBlock);
            form.lastElementChild.style.cssText = `margin-top: 4px;`;
            lastBlock.insertAdjacentElement('afterbegin', form.lastElementChild);


            const statusMessage = document.createElement('div');
            statusMessage.classList.add("secondStatus");
            lastBlock.insertAdjacentElement('beforeend', statusMessage);

            statusMessage.style.cssText = `font-weight: 400; margin-left: 30px; line-height: 18px; font-size: 12px; color: #000; mix-blend-mode: normal; opacity: .89;`;
            
            statusMessage.textContent = statusText;
            
            clearTimeout(aClearTimeout);

            aClearTimeout = setTimeout(() => {
                form.querySelector('.secondStatus').style.display = 'none';
            }, 5000);
        }else if(form.querySelector('.secondStatus')){

            form.querySelector('.secondStatus').textContent = statusText;
            form.querySelector('.secondStatus').style.display = 'flex';

            clearTimeout(aClearTimeout);
            console.log(1);
            aClearTimeout = setTimeout(() => {
                form.querySelector('.secondStatus').style.display = 'none';
            }, 3000);
        }
        
    }

    bindPostData(){
        this.forms.forEach(form => {
            form.addEventListener('submit', (e)=>{
                e.preventDefault();

                const formData = new FormData(form);

                this.postData('assets/question.php', formData)
                .then(data =>{
                    console.log(data);
                    this.bindStatusBlock(form, this.statusParrent.success);
                })
                .catch(()=>{
                    this.bindStatusBlock(form, this.statusParrent.failure);
                })
                .finally(()=>{
                    // Очистить все инпуты
                    form.reset();

                });
            });
        });
    }

    checkLatinText(){

        this.forms.forEach(form =>{
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input =>{
                if(input.getAttribute('type') === 'email'){
                    input.addEventListener('input', () => {
                        const value = input.value;
                        const latinOnly = /^[a-zA-Z@\s]*$/;
                        if (!latinOnly.test(value)) {
                            input.value = value.replace(/[^a-zA-Z@\s]/g, '');
                        }
                    });
                }
            });
        });

    }

    checkNum(){

        this.forms.forEach(form =>{
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input =>{
                if(input.getAttribute('placeholder') === '+1 (___) ___-____'){
                    input.addEventListener('input', () => {
                        
                        input.addEventListener('keydown', (e) => {
                            if (e.target.selectionStart < 2 && e.keyCode !== 8 && e.keyCode !== 46) {
                            e.preventDefault();
                            }
                        });
                          
                        let matrix = '+1 (___) ___-____',
                            i = 0,
                            def = matrix.replace(/\D/g, ''),
                            val = input.value.replace(/\D/g, '');
                    
                        if (def.length >= val.length) {
                            val = def;
                        }
                    
                        input.value = matrix.replace(/./g, function(a) {
                            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
                        });
                    });
                }
            });
        });
    }

    init(){

        this.bindPostData();
        this.checkLatinText();
        this.checkNum();

    }

}