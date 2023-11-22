// this (контекст)

// function fn(){
//     return 2023 - this.age
// }

// const users = {
//     1:{
//         name: 'Den',
//         age: 27
//     },
//     2:{
//         name: 'Mark',
//         age: 22,
//     },
//     3:{
//         name: 'James',
//         age: 30
//     },
// }

// for(const key in users){
//     users[key].fn = fn
//     console.log(users[key].fn());
// }


// const Den = {
//     name: 'Den',
//     age: 25,
//     jobs: 'WebDew',
//     logInfo: function(addr='', phone=''){
//         console.group(`Пользователь: ${this.name}`)
//         console.log(`возраст: ${this.age}`);
//         console.log(`работает: ${this.jobs}`);
//         console.log(`адрес: ${addr}`);
//         console.log(`телефон: ${phone}`);
//         console.groupEnd()
//     }
// }
// Den.logInfo()

// const Lena = {
//     name: 'Lena',
//     age: 22,
//     jobs: 'Disinger'
// }
// Den.logInfo.call(Lena, 'Tashkent', 998911238349)
// Den.logInfo.apply(Lena, ['Tashkent', '+998 91 123 83 49'])
// const infoLena = Den.logInfo.bind(Lena);
// infoLena('Tashkent', '+998 91 123 83 49')

// function sum(b){
//     return function(a){
//         return a + b
//     }
// }
// console.log(sum(5)(3));

// class
class COMPONENTS {
    constructor(selector){
        this.el = document.querySelector(selector)
        this.el.addEventListener('mouseover', ()=>{
            this.hide()
        })
        this.el.addEventListener('mouseout', ()=>{
            this.show()
        })
    }
    show(){this.el.style.opacity = '1'}
    hide(){this.el.style.opacity = '0'}
}

class BOX extends COMPONENTS {
    constructor(option){
        super(option.selector)
        this.w = this.el.style.width = option.width
        this.h = this.el.style.height = option.height
        this.b = this.el.style.background = option.bg
    }
}

const box = new COMPONENTS('.box')
const box1 = new BOX({
    selector: '.box1',
    width: '300px',
    height: '200px',
    bg: 'green'
})
console.log(box);
console.log(box1);