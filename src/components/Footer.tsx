import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg mb-3">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              EquiTech
            </Link>
            <p className="text-sm text-muted-foreground">
              Bridging the gender gap in technology through education, mentorship, and opportunity.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/learning" className="hover:text-foreground transition-colors">Learning Hub</Link></li>
              <li><Link to="/mentorship" className="hover:text-foreground transition-colors">Mentorship</Link></li>
              <li><Link to="/opportunities" className="hover:text-foreground transition-colors">Opportunities</Link></li>
              <li><Link to="/community" className="hover:text-foreground transition-colors">Community</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Analytics Dashboard</Link></li>
              <li><Link to="/toolkit" className="hover:text-foreground transition-colors">Career Toolkit</Link></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Blog</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Help Center</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-pointer">Code of Conduct</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2026 EquiTech. Building an equitable tech future for everyone.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
