import Headroom from 'headroom.js';

export default function () {
    const header = document.querySelector('#hdrm');
    const headroom = new Headroom(header, {
        tolerance: 15,
        offset: 67.5,
        classes: {
            initial: 'hdrm',
            pinned: 'pinned',
            unpinned: 'unpinned',
            top: 'top',
            notTop: 'not-top',
            bottom: 'bottom',
            notBottom: 'not-bottom',
            frozen: 'frozen',
        },
    });

    if (window.scrollY) {
        header.classList.add('not-top', 'not-bottom', 'unpinned');
    } else {
        header.classList.add('not-bottom', 'pinned', 'top');
    }

    headroom.init();
}
