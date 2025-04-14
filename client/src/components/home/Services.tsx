import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, Globe, PaintbrushVertical, Bot, Smartphone, BarChart2, Cog } from "lucide-react";
import { Link } from "wouter";
import { fadeIn, staggerContainer, slideUp } from "@/lib/animations";
import { services } from "@/lib/data";

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-gray-50">
      <Container>
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Our Services</h2>
          <p className="text-gray-700 text-lg">
            We offer a comprehensive suite of digital services powered by AI to help businesses succeed in the digital landscape.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    icon: string;
    gradient: string;
    features: string[];
  };
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  // Map icon string to Lucide icon components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return <Globe className="text-white text-5xl" />;
      case "PaintbrushVertical":
        return <PaintbrushVertical className="text-white text-5xl" />;
      case "Bot":
        return <Bot className="text-white text-5xl" />;
      case "Smartphone":
        return <Smartphone className="text-white text-5xl" />;
      case "BarChart2":
        return <BarChart2 className="text-white text-5xl" />;
      case "Cog":
        return <Cog className="text-white text-5xl" />;
      default:
        return <Globe className="text-white text-5xl" />;
    }
  };

  return (
    <motion.div
      variants={slideUp}
      custom={index}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] group cursor-pointer"
    >
      <div className={`h-48 ${service.gradient} flex items-center justify-center`}>
        {getIcon(service.icon)}
      </div>
      <div className="p-6">
        <h3 className="font-heading font-bold text-xl mb-3">{service.title}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="text-green-500 mt-1 mr-2 h-4 w-4" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <Link href="#contact" className="text-primary hover:text-primary/80 font-medium flex items-center">
          <span>Learn More</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default Services;