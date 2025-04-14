
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Code, Palette, Bot } from "lucide-react";
import { fadeIn, slideUp } from "@/lib/animations";

const Hero = () => {
  return (
    <section id="hero" className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-200 via-white to-indigo-100 z-0"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-violet-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>

      <Container className="relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-8">
            We Design. <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600">
              We Build. We Scale.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Digital agency crafting beautiful experiences and scalable solutions for forward-thinking brands.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button asChild size="lg" className="text-base h-14 px-8 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 transition-all duration-300">
              <Link href="#services">Explore Our Services</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base h-14 px-8 rounded-2xl border-2 hover:bg-gray-50/50 transition-all duration-300">
              <Link href="#portfolio">View Our Work</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div 
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mb-6 group-hover:bg-violet-200 transition-colors duration-300">
              <Palette className="text-violet-600 w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-2xl mb-4">Design Excellence</h3>
            <p className="text-gray-600 text-lg leading-relaxed">Beautiful, intuitive interfaces that elevate your brand.</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors duration-300">
              <Code className="text-indigo-600 w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-2xl mb-4">Clean Code</h3>
            <p className="text-gray-600 text-lg leading-relaxed">Scalable, maintainable solutions built to last.</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors duration-300">
              <Bot className="text-purple-600 w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-2xl mb-4">AI Integration</h3>
            <p className="text-gray-600 text-lg leading-relaxed">Next-gen solutions powered by artificial intelligence.</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
