import { Helmet } from "react-helmet-async";

function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://shrijigems.in/#organization",
        name: "Shri Ji Gems",
        url: "https://shrijigems.in",
        logo: "https://shrijigems.in/FINAL__LOGO.png",
        image: "https://shrijigems.in/FINAL__LOGO.png",
        email: "info@shrijigems.in",
        telephone: "+91-9818307307",
        description:
          "Shri Ji Gems offers certified natural gemstones along with expert astrology consultation to help customers choose the right gemstone based on their birth chart and requirements.",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "414/2 Main Chowk Samaypur Near HDFC Bank Badli",
          addressLocality: "New Delhi",
          postalCode: "110042",
          addressCountry: "IN"
        },
        sameAs: [
          "https://www.instagram.com/astro_vijaysharma",
          "https://www.youtube.com/@AstroVijay_01"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://shrijigems.in/#website",
        url: "https://shrijigems.in",
        name: "Shri Ji Gems",
        publisher: {
          "@id": "https://shrijigems.in/#organization"
        },
        inLanguage: "en-IN"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
    
export default StructuredData;