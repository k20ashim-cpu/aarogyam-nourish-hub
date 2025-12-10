import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-warm">
                <span className="text-xl font-bold text-primary-foreground">🍜</span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                Flavor<span className="text-primary">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Fresh, flavorful food delivered to your door. Experience the taste of happiness.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/menu" className="hover:text-foreground">Our Menu</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-foreground">Delivery Info</Link></li>
              <li><Link to="/returns" className="hover:text-foreground">Returns</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Contact Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>hello@flavorhub.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Flavor Street, Food City</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FlavorHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;