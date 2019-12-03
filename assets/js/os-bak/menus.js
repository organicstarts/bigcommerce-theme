// import Master from './master';

// export default class Menus extends Master {
//     constructor() {
//         super();

//         this.state = 'splash';
//         this.mainMenu = document.getElementById('mainMenu');
//         this.mobileMenu = document.getElementById('mainMobileMenu');
//     }

//     Scrolling(dir) {
//         if (dir === 'up') {
//             if (window.scrollY === 0 && this.state !== 'splash') { // 32 Pixels is the difference in top padding between default and slide-down
//                 this.mainMenu.classList.add('splash', 'on-canvas');
//                 this.mainMenu.classList.remove('invisible', 'drawer', 'off-canvas');
//                 this.state = 'splash';
//             } else if (window.scrollY >= this.mainMenu.offsetHeight + 32 && this.state !== 'drawer') {
//                 this.mainMenu.classList.add('drawer', 'on-canvas');
//                 this.mainMenu.classList.remove('invisible', 'splash', 'off-canvas');
//                 this.state = 'drawer';
//             }
//         } else if (window.scrollY >= this.mainMenu.offsetHeight + 32 && this.state !== 'offcanvas') {
//             this.mainMenu.classList.add('off-canvas');
//             this.mainMenu.classList.remove('on-canvas');
//             this.state = 'offcanvas';
//         }
//         // } else {
//         //   this.mainMenu.classList.remove("splash", "drawer", "off-canvas")
//         // }
//     }

//     AnimateItems() {
//         // Show Menu Items with Animation
//         const staggedElements = document.querySelectorAll('.staggered-fade-up');
//         this.forEachElements(staggedElements, (i, el) => {
//             setTimeout(() => {
//                 el.classList.add('animated', 'fadeInDown');
//                 el.classList.remove('staggered-fade-up');
//             }, 150 * i);
//         });
//     }

//     ShowItems() {
//         // Show Menu Items without Animation
//         const staggedElements = document.querySelectorAll('.staggered-fade-up');
//         this.forEachElements(staggedElements, (i, el) => {
//             el.classList.remove('staggered-fade-up');
//         });
//     }

//     Init(mobile) {
//         // Show Menu Items with Animation
//         const staggedElements = document.querySelectorAll('.staggered-fade-up');
//         this.forEachElements(staggedElements, (i, el) => {
//             setTimeout(() => {
//                 el.classList.add('animated', 'fadeInDown');
//                 el.classList.remove('staggered-fade-up');
//             }, 150 * i);
//         });

//         if (mobile) {
//             // Mobile Only

//             this.mobileMenu.classList.remove('d-none');

//             // new Mmenu("#mainMobileMenu", {
//             //     navbar: false,
//             //     "extensions": [
//             //         "border-none",
//             //         "fx-listitems-drop",
//             //         "pagedim-black",
//             //         "position-front",
//             //         "theme-white"

//             //     ]
//             // })
//         } else {
//             // Desktop Only

//         }

//         if (window.scrollY <= this.mainMenu.offsetHeight * 2) { // 32 Pixels is the difference in top padding between default and slide-down
//             this.mainMenu.classList.add('on-canvas');
//             this.mainMenu.classList.remove('invisible', 'drawer', 'off-canvas');
//             this.state = 'splash';
//         } else {
//             this.mainMenu.classList.add('drawer', 'on-canvas');
//             this.mainMenu.classList.remove('invisible', 'splash', 'off-canvas');
//             this.state = 'drawer';
//         }
//     }
// }
