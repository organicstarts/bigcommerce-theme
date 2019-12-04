export default function () {
    const tint = document.querySelector('#tint');
    const sidebar = document.querySelector('#sidebar');
    const toggleSidebar = document.querySelector('.toggleSidebar');

    toggleSidebar.addEventListener('click', (e) => {
        e.preventDefault();
        tint.classList.toggle('active');
        sidebar.classList.toggle('active');
        sidebar.setAttribute('aria-hidden', 'false');
        document.body.classList.toggle('unscrollable');
    });

    tint.addEventListener('click', (e) => {
        e.preventDefault();
        tint.classList.remove('active');
        sidebar.classList.remove('active');
        sidebar.setAttribute('aria-hidden', 'false');
        document.body.classList.remove('unscrollable');
    });
}
