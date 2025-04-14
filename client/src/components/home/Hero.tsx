import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Code, Palette, Bot } from "lucide-react";
import { fadeIn, slideUp } from "@/lib/animations";

const Hero = () => {
  return (
    <section id="hero" className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 z-0"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>

      <Container className="relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            We Design. <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
              We Build. We Scale.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Digital agency crafting beautiful experiences and scalable solutions for forward-thinking brands.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button asChild size="lg" className="text-base h-14 px-8 rounded-2xl">
              <Link href="#services">View Our Services</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base h-14 px-8 rounded-2xl">
              <Link href="#portfolio">Browse Work</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div 
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mb-6">
              <Palette className="text-violet-600 w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-3">Design Excellence</h3>
            <p className="text-gray-600">Beautiful, intuitive interfaces that elevate your brand.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6">
              <Code className="text-indigo-600 w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-3">Clean Code</h3>
            <p className="text-gray-600">Scalable, maintainable solutions built to last.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
              <Bot className="text-purple-600 w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-3">AI Integration</h3>
            <p className="text-gray-600">Next-gen solutions powered by artificial intelligence.</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;