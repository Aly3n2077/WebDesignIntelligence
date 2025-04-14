import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { fadeIn, slideUp } from "@/lib/animations";

const Cta = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-500 to-orange-500 opacity-90"></div>
      
      <Container className="relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 
            variants={slideUp}
            custom={0}
            className="font-heading font-bold text-3xl md:text-4xl text-white mb-6"
          >
            Ready to Transform Your Digital Presence?
          </motion.h2>
          
          <motion.p 
            variants={slideUp}
            custom={1}
            className="text-white/90 text-lg mb-8 max-w-2xl mx-auto"
          >
            Let's collaborate to create innovative digital solutions that drive real results for your business.
          </motion.p>
          
          <motion.div 
            variants={slideUp}
            custom={2}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              <Link href="#contact">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="#portfolio">View Our Work</Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Cta;
