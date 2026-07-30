import { Helmet } from "react-helmet-async";

function SEO({
  title,
  description,
  keywords = "",
  image = "https://shrijigems.in/FINAL__LOGO.png",
  url = typeof window !== "undefined" ? window.location.href : "",
  type = "website",
  noIndex = false
}) {
  return (
    <Helmet>

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

      <meta property="og:url" content={url} />

      <meta property="og:site_name" content="Shri Ji Gems" />

      {/* Twitter */}

      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={image} />

      <meta name="theme-color" content="#ffffff" />

    </Helmet>
  );
}

export default SEO;