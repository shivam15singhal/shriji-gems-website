import { Helmet } from "react-helmet-async";

function ProductSEO({ gem, quality, data }) {
  if (!gem || !data) return null;

  const productName = `${quality.toUpperCase()} ${gem.name}`;

  const productUrl = `https://shrijigems.in/gems/${gem._id}/${quality}`;

  const image =
    data.images?.length > 0
      ? data.images[0]
      : gem.image || "https://shrijigems.in/FINAL__LOGO.png";

  const description =
    data.description ||
    gem.description ||
    `Buy certified natural ${gem.name} from Shri Ji Gems.`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: productName,

    image: [image],

    description,

    brand: {
      "@type": "Brand",
      name: "Shri Ji Gems",
    },

    category: "Gemstones",

    color: gem.color || "",

    sku: `${gem._id}-${quality}`,

    url: productUrl,

    offers: {
      "@type": "Offer",

      url: productUrl,

      priceCurrency: "INR",

      price: data.pricePerRatti,

      availability: "https://schema.org/InStock",

      itemCondition: "https://schema.org/NewCondition",

      seller: {
        "@type": "Organization",
        name: "Shri Ji Gems",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",

        position: 1,

        name: "Home",

        item: "https://shrijigems.in/",
      },

      {
        "@type": "ListItem",

        position: 2,

        name: "Gemstones",

        item: "https://shrijigems.in/gemstones",
      },

      {
        "@type": "ListItem",

        position: 3,

        name: gem.name,

        item: `https://shrijigems.in/gems/${gem._id}`,
      },

      {
        "@type": "ListItem",

        position: 4,

        name: quality.toUpperCase(),

        item: productUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",

    "@type": "FAQPage",

    mainEntity: [
      {
        "@type": "Question",

        name: "Is this a natural gemstone?",

        acceptedAnswer: {
          "@type": "Answer",

          text: "Yes, all gemstones offered are carefully sourced and verified for authenticity.",
        },
      },

      {
        "@type": "Question",

        name: "Will I receive a certificate?",

        acceptedAnswer: {
          "@type": "Answer",

          text: "Certification is provided for eligible gemstones wherever applicable.",
        },
      },

      {
        "@type": "Question",

        name: "How long does delivery take?",

        acceptedAnswer: {
          "@type": "Answer",

          text: "Delivery timelines vary by location, but most orders are delivered within a few business days.",
        },
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}

export default ProductSEO;