import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Code, Palette, Bot } from "lucide-react";
import { fadeIn, slideUp } from "@/lib/animations";

const Hero = () => {
  return (
    <section id="hero" className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 z-0"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>

      <Container className="relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Crafting Digital <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Experiences</span> Through AI-Powered <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-orange-500">Innovation</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            W&D Studios combines cutting-edge AI solutions with creative design expertise to deliver exceptional digital experiences that drive real business results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#services">Explore Our Services</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#portfolio">View Our Work</Link>
            </Button>
          </div>
        </motion.div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <Code className="text-primary text-xl" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Web Development</h3>
            <p className="text-gray-600">Custom websites and applications optimized for performance and user experience.</p>
          </motion.div>

          <motion.div 
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={1}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <Palette className="text-purple-500 text-xl" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Digital Design</h3>
            <p className="text-gray-600">Stunning visuals and intuitive interfaces that captivate and convert your audience.</p>
          </motion.div>

          <motion.div 
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={2}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
              <Bot className="text-orange-500 text-xl" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">AI Solutions</h3>
            <p className="text-gray-600">Intelligent automation and data-driven insights powered by advanced AI technology.</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
