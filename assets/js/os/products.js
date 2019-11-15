import Master from "./master"

export default class Products extends Master {

    constructor() {
        super();
    }

    Init() {
        const title = document.querySelector('.product-name')
        if (title) {
            var product = title.innerHTML,
                firstFilter = product.replace(/[(]/g, '<span class="small dispaly-4">('),
                newTitle = firstFilter.replace(/[)]/g, ')</span>')
            title.innerHTML = newTitle
        }
    }

}