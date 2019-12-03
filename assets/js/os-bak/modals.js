import Master from './master';
import Cookies from './cookies';

export default class Modals extends Master {
    constructor() {
        super();
        this.Cookies = new Cookies();
    }

    modal(target, options) {
        this.jQuery(target).modal(options);
    }

    create(id, options, bootstrap) {
        // size: sm | md | lg
        // centered: true | false
        // header: text
        // body: html text
        const size = options.size ? `-${options.size}` : null;
        this.jQuery('body').prepend(`
            <div class="modal os-modal fade" id="${id}" tabindex="-1" role="dialog" aria-labelledby="${id}Title" aria-hidden="true">
                <div class="modal-dialog modal${size}${options.centered ? ' modal-dialog-centered' : null} os-modal-dialog os-modal${size}${options.centered ? ' modal-dialog-centered' : null}" role="document">
                    <div class="modal-content os-modal-content">
                        <div class="modal-header os-modal-header">
                            <h5 class="modal-title os-modal-title" id="${id}Title">${options.header}</h5>
                            ${
    options.dismissable ?
        `<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>`
        :
        ''
}
                        </div>
                        <div class="modal-body os-modal-body">
                            ${options.body}
                        </div>
                    </div>
                </div>
            </div>
        `);
        this.modal(`#${id}`, (bootstrap || {}));
    }

    countryModal() {
        if (!this.Cookies.check('countryModal')) {
            this.jQuery.get('https://ipapi.co/json').then(res => {
                if (res.country === 'US') {
                    this.create('alertModalCenter', {
                        dismissable: true,
                        size: 'lg',
                        centered: true,
                        header: '⚠️ These products are unavailable in your country.',
                        body: '<p>Thank you for your interest however these products are not approved for retail in your country. While these formulas do meet rigorous European Union (EU) quality standards and nutritional requirements, the importation of these products do not comply with your country\'s regulations. We know this comes as a grave disappointment to many of you and we sincerely apologize for any inconvenience. We understand that this may especially difficult for those of you who rely on these products.</p><p>For further information, please refer to <a href="http://alert.organicstart.com/">our public alert</a>.</p>',
                    });
                }
                if (res.country === 'CA') {
                    this.create('alertModalCenter', {
                        dismissable: true,
                        size: 'lg',
                        centered: true,
                        header: '👋 These products are coming soon to your country.',
                        body: '<p><strong>We\'ve got great news!</strong> Organic Start is coming to Canada! In the next coming months, these great formulas from Europe will be available in Canada via our website. Be sure to check back and connect with us either via social media or by subscribing to our newsletter for when we make the big announcement!</p><p>In the meantime, you can always order bulk and save up to 40% via <a href="https://organicstartwholesale.com">Organic Start Wholesale</a>.</p>',
                    });
                }
            });
            this.Cookies.set('countryModal', true);
        }
    }

    swal(options) {
        const Swal = require('sweetalert2');
        const config = {
            customClass: {
                confirmButton: `${options.type}-button`,
            },
        };
        Swal.fire(Object.assign({}, config, options));
    }
}
