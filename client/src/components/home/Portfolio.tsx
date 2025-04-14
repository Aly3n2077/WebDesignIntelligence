import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { fadeIn, staggerContainer, scaleIn } from "@/lib/animations";
import { portfolioItems } from "@/lib/data";

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 md:py-32 bg-white">
      <Container>
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Our Work</h2>
          <p className="text-gray-700 text-lg">
            Explore our latest projects where design excellence meets innovative technology.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioItems.map((item, index) => (
            <PortfolioItem key={item.title} item={item} index={index} />
          ))}
        </motion.div>

        <motion.div 
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg">
            <Link href="#contact">Discuss Your Project</Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

interface PortfolioItemProps {
  item: {
    title: string;
    description: string;
    image: string;
  };
  index: number;
}

const PortfolioItem = ({ item, index }: PortfolioItemProps) => {
  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      className="rounded-xl overflow-hidden shadow-lg group"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <h3 className="font-heading font-bold text-xl text-white mb-2">{item.title}</h3>
          <p className="text-white text-sm">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Portfolio;
