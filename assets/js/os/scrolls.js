import Master from "./master"

export default class Scrolls extends Master {

    constructor() {
        super()
    }

    Init() {
        const $ = require('jquery')
        $('[data-spy="item"]').each(function () {
            $(this).addClass('invisible')
        })
    }

    Animate(event) {
        const $ = require('jquery') // TODO: Remove jQuery Dependence

        $('[data-spy="scroll"]').each(function (i) {

            var border = $(this).attr('id'),
                delayed = $(this).attr('data-delayed'),
                $target = $(`#${border}`),
                $targetTop = $target.offset().top,
                $targetBottom = $target.offset().top + $target.outerHeight(),
                screenTop = window.scrollY,
                screenBottom = window.scrollY + window.innerHeight

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
                setTimeout(function () {
                    $(`#${border} [data-spy="item"]`).each(function (i) {

                        // TODO: Link items using data-spy

                        var $item = $(this)
                        var animation = $item.attr('data-animation')
                        var staggered = $item.attr('data-staggered')
                        var timeout = $item.attr('data-timeout')
                        if ($target && animation) {
                            //if ((window.scrollY >= $target.offset().top - ((window.innerHeight / 4) * 3))  || (window.scrollY > $target.offset().top && window.scrollY < ($target.offset().top + $target.offsetHeight))) {
                                if (staggered) {
                                    setTimeout(function () {
                                        $item.addClass(`animated ${animation}`).removeClass('invisible')
                                    }, (timeout ? timeout : 300) * i)
                                } else {
                                    $item.addClass(`animated ${animation}`).removeClass('invisible')
                                }
                            //}
                        }
                    })
                }, (event == 'ready' ? (delayed || 0) : 0))
            }

        })
    }

}