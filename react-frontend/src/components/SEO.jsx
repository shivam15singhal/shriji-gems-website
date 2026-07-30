import { Helmet } from "react-helmet-async";

function SEO({
  title,
  description,
  keywords = "",
  image = "https://shrijigems.in/FINAL__LOGO.png",
  url = typeof window !== "undefined" ? window.location.href : "",
  type = "website",
  noIndex = false,
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shri Ji Gems",
    url: "https://shrijigems.in",
    logo: "https://shrijigems.in/FINAL__LOGO.png",
    description:
      "Certified natural gemstones with expert astrology guidance.",
    email: "support@shrijigems.in",
    sameAs: [
      
       "https://www.instagram.com/astro_vijaysharma?igsh=MWN5ZGJhcnl4cHBmcQ%3D%3D"
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shri Ji Gems",
    url: "https://shrijigems.in",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://shrijigems.in/gemstones?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta
        name="robots"
        content={noIndex ? "noindex,nofollow" : "index,follow"}
      />

      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Shri Ji Gems" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      

      <meta name="theme-color" content="#ffffff" />

      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
}

export default SEO;