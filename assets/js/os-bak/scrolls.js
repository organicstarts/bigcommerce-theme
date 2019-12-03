import Master from './master';

export default class Scrolls extends Master {
    init() {
        const $ = require('jquery');
        $('[data-spy="item"]').each(function () {
            $(this).addClass('invisible');
        });
    }

    animate(event) {
        const $ = require('jquery'); // TODO: Remove jQuery Dependence

        $('[data-spy="scroll"]').each(() => {
            const border = $(this).attr('id');
            const delayed = $(this).attr('data-delayed');
            // console.log(border);
            const $target = $(`#${border}`);
            const $targetTop = $target.offset().top;
            const $targetBottom = $target.offset().top + $target.outerHeight();
            const screenTop = window.scrollY;
            const screenBottom = window.scrollY + window.innerHeight;

            if (
                (
                    (
                        $targetBottom > (screenTop + 100 + (window.innerHeight / 4))
                    ) && (
                        $targetBottom < screenBottom
                    )
                ) || (
                    (
                        $targetTop > screenTop
                    ) && (
                        $targetTop < (screenBottom - 100 - (window.innerHeight / 4))
                    )
                )
            ) { // Do not animate elements above view
                setTimeout(() => {
                    $(`#${border} [data-spy="item"]`).each(function (i) {
                        // TODO: Link items using data-spy

                        const $item = $(this);
                        const animation = $item.attr('data-animation');
                        const staggered = $item.attr('data-staggered');
                        const timeout = $item.attr('data-timeout');
                        if ($target && animation) {
                            // if ((window.scrollY >= $target.offset().top - ((window.innerHeight / 4) * 3))  || (window.scrollY > $target.offset().top && window.scrollY < ($target.offset().top + $target.offsetHeight))) {
                            if (staggered) {
                                setTimeout(() => {
                                    $item.addClass(`animated ${animation}`).removeClass('invisible');
                                }, (timeout || 300) * i);
                            } else {
                                $item.addClass(`animated ${animation}`).removeClass('invisible');
                            }
                            // }
                        }
                    });
                }, (event === 'ready' ? (delayed || 0) : 0));
            }
        });
    }
}
