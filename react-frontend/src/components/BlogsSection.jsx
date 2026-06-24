import React from "react";

function BlogsSection() {
  return (
    <section className="astro-blog-section">
      <h2 className="astro-blog-title">From the Stars: My Blog</h2>

      <div className="astro-blog-wrapper">
        {[1, 2, 3].map((b) => (
          <div className="astro-blog-card" key={b}>
            <img src={`/blog${b}.jpg`} alt="blog" />
            <h3>Astrology Insight {b}</h3>
            <p>Discover how astrology shapes life decisions.</p>
            <a href="#">Read More</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogsSection;
