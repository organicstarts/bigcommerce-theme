import $ from "jquery";

export function getArticles() {
  $.ajax({
    crossOrigin: true,
    type: "GET",
    url:
      "https://cors-anywhere.herokuapp.com/https://blog.organicstart.com/rss/",
    success: function(data) {
      var count = 0;
      $(data)
        .find("item")
        .each(function() {
          $("#recent-post").append(`<li class="nav-item">
            <a
              class="item text-white"
              href=${$(this)
                .find("link")
                .text()}
              target="_blank"
              aria-describedby="a11y-new-window-external-message"
              rel="noopener"
            >
              ${$(this)
                .find("title")
                .text()
                .substring(0, 45) + "..."}
            </a>
          </li>`);

          count++;
          if (count === 5) {
            return false;
          }
        });
    }
  });
}
export function footer(store) {
  let storeColor = "";
  switch (store) {
    case "os":
      storeColor = "moss";
      break;
    case "osw":
      storeColor = "mustard";
      break;
    default:
      storeColor = "store-color";
      break;
  }
  $("#wrapper").append(footerTemplate(storeColor));
}

function footerTemplate(storeColor) {
  let footerArray = [
    `<footer class=${storeColor}>`,
    '<section class="ui very padded basic vertical site segment">',
    '<div class="container">',
    '<nav class="row">'
  ];
  const footerObj = {
    company: [
      { name: "COMPANY" },
      { name: "Retail", link: "https://organicstart.com/" },
      { name: "Blog", link: "https://blog.organicstart.com/" },
      { name: "Support/Contact Us", link: "https://support.organicstart.com/" },
      { name: "About Us", link: "https://organicstart.com/about-us/" },
      { name: "Testimonials", link: "https://organicstart.com/reviews" },
      { name: "Careers", link: "https://organicstart.com/careers" },
      { name: "GIFT CERTIFICATES" },
      {
        name: "Purchase Gift Certificates",
        link: "https://organicstart.com/giftcertificates.php"
      },
      {
        name: "Redeem Gift Certificates",
        link: "https://organicstart.com/giftcertificates.php?action=redeem"
      },
      {
        name: "Check Certificate Balance",
        link: "https://organicstart.com/giftcertificates.php?action=balance"
      }
    ],
    retail: [
      { name: "RETAIL" },
      {
        name: "The Baby Bank: Loyalty Rewards Program",
        link: "https://organicstart.com/baby-bank"
      },
      {
        name: "Multiples Discount",
        link: "https://organicstart.com/multiples"
      },
      {
        name: "Affiliate Program",
        link: "https://organicstart.com/affiliate-program"
      },
      {
        name: "Shipping & Returns",
        link: "https://organicstart.com/shipping-returns"
      },
      { name: "RETAIL STORE" },
      {
        name: "HiPP",
        link: "https://organicstart.com/hipp"
      },
      {
        name: "Holle",
        link: "https://organicstart.com/holle"
      },
      {
        name: "Lebenswert",
        link: "https://organicstart.com/lebenswert"
      },
      {
        name: "Topfer",
        link: "https://organicstart.com/topfer"
      },
      {
        name: "Goat Milk",
        link: "https://organicstart.com/goat-milk"
      },
      {
        name: "Cereal",
        link: "https://organicstart.com/cereals"
      },
      {
        name: "Snack & Teas",
        link: "https://organicstart.com/snacks-teas"
      },
      {
        name: "Juices",
        link: "https://organicstart.com/juices"
      },
      {
        name: "Baby Care",
        link: "https://organicstart.com/baby-care"
      },
      {
        name: "Clearance",
        link: "https://organicstart.com/clearance"
      }
    ],
    resources: [
      { name: "RESOURCES" },
      {
        name: "Comparison Chart",
        link: "https://organicstart.com/comparison-chart"
      },
      { name: "SUPPORT" },
      {
        name: "Nutrition",
        link:
          "https://support.organicstart.com/hc/en-us/categories/115000448613-Nutrition"
      },
      {
        name: "Common Q&As",
        link:
          "https://support.organicstart.com/hc/en-us/sections/115000941634-Common-Q-As"
      },
      {
        name: "Instructions",
        link:
          "https://support.organicstart.com/hc/en-us/categories/115000447534-Instructions"
      },
      {
        name: "Orders",
        link:
          "https://support.organicstart.com/hc/en-us/categories/115000448813-Orders"
      },
      {
        name: "Inventory",
        link: "https://support.organicstart.com/hc/en-us/articles/360000114354"
      },
      {
        name: "Loyalty Points",
        link:
          "https://support.organicstart.com/hc/en-us/sections/360000011453-Loyalty-Points"
      },
      {
        name: "Gift Certificates",
        link:
          "https://support.organicstart.com/hc/en-us/sections/360000011473-Gift-Certificates"
      },
      {
        name: "Tech Support",
        link: "https://support.organicstart.com/hc/en-us/requests/new"
      },
      {
        name: "Submit a Request",
        link: "https://support.organicstart.com/hc/en-us/requests/new"
      }
    ],
    article: [{ name: "RECENT ARTICLES" }, { id: "recent-post" }]
  };

  footerArray.push(appendItem(footerObj));
  footerArray.push("</nav><div></section></footer>");
  return footerArray.join("");
}

function appendItem(items) {
  let itemsArray = Object.keys(items).map(item => {
    let itemArray = items[item].map((data, index) => {
      if (index === 0) {
        return `<ul class="col-md-3 col-lg-3 col-12 nav flex-column text-center text-md-left ui vertical text menu footer-menu mt-0 mb-0 pt-0 pb-0"
    data-section-type="footer-webPages"><li class="nav-item"><div class="ui divider my-4" /><h4 class="text-white m-0">${
      data.name
    }</h4><div class="ui divider my-4" /></li>`;
      } else if (data.link) {
        return `<li class="nav-item">
                <a
                  class="item text-white"
                  href=${data.link}
                  target="_blank"
                  aria-describedby="a11y-new-window-external-message"
                  rel="noopener"
                >
                  ${data.name}
                </a>
              </li>`;
      } else if (data.id) {
        return '<div id="recent-post"> </div>';
      } else {
        return `<li class="nav-item"><div class="ui divider my-4" /><h4 class="text-white m-0">${
          data.name
        }</h4><div class="ui divider my-4" /></li>`;
      }
    });
    itemArray.push("</ul>");
    return itemArray.join("");
  });
  return itemsArray.join("");
}
