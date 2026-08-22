import './AboutPage.css';

export default function AboutPage() {
  return (
    <section className="page-container about-page">

      <div className="about-content">

        <h2>About Bunlong Cafe</h2>

        <p className="lead-text">
          Founded with a passion for exceptional coffee,
          Bunlong Cafe brings artisan roasting standards
          and warm community hospitality together under
          one roof.
        </p>

        <div className="about-grid">

          <div className="about-feature">
            <h3>☕ Quality Sourcing</h3>

            <p>
              We partner directly with ethical coffee
              farms across South America and Southeast
              Asia to source high-quality Arabica beans.
            </p>
          </div>

          <div className="about-feature">
            <h3>🔥 In-House Roasting</h3>

            <p>
              Our beans are small-batch roasted weekly
              to preserve delicate aromatic profiles
              and peak flavor intensity.
            </p>
          </div>

          <div className="about-feature">
            <h3>🌱 Sustainability</h3>

            <p>
              We care about our environment and use
              eco-friendly packaging whenever possible.
            </p>
          </div>

        </div>

        <div className="store-info">

          <h3>Visit Us</h3>

          <p>
            📍 Phnom Penh, Cambodia
          </p>

          <p>
            ⏰ Open Daily: 7:00 AM – 8:00 PM
          </p>

        </div>

      </div>

    </section>
  );
}