import { Link } from "wouter";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook, 
  Layers 
} from "lucide-react";

const Footer = () => {
  const services = [
    { name: "Web Development", href: "#services" },
    { name: "UI/UX Design", href: "#services" },
    { name: "AI Integration", href: "#services" },
    { name: "Mobile App Development", href: "#services" },
    { name: "Digital Marketing", href: "#services" },
    { name: "Business Automation", href: "#services" },
  ];

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Our Team", href: "#team" },
    { name: "Careers", href: "#team" },
    { name: "Blog", href: "/" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-slate-900 py-12 text-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center">
                <span className="text-primary font-bold text-xl">W&D</span>
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg md:text-xl tracking-tight">W&D Studios</h2>
                <p className="text-xs text-gray-400 -mt-1">A subsidiary of MILLI</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Creating innovative digital solutions through the perfect blend of design excellence and technological innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-gray-400 hover:text-white transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates on digital trends and our services.
            </p>
            <form className="mb-4" onSubmit={handleNewsletterSubmit}>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="rounded-r-none bg-gray-800 border-gray-700 text-white focus:border-primary" 
                  required
                />
                <Button type="submit" className="rounded-l-none px-3">
                  <Layers size={18} />
                </Button>
              </div>
            </form>
            <p className="text-gray-500 text-sm">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} W&D Studios Inc. All rights reserved. A subsidiary of{" "}
            <a href="https://milliintell.netlify.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
              MILLI
            </a>.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
