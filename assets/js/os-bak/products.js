import Master from './master';

export default class Products extends Master {
    init() {
        const title = document.querySelector('.product-name');
        if (title) {
            const product = title.innerHTML;
            const firstFilter = product.replace(/[(]/g, '<span class="small dispaly-4">(');
            const newTitle = firstFilter.replace(/[)]/g, ')</span>');
            title.innerHTML = newTitle;
        }
    }
}
