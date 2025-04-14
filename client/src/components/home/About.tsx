import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { fadeIn, slideIn } from "@/lib/animations";

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
              The Digital Agency for the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">AI Era</span>
            </h2>
            <p className="text-gray-700 mb-6">
              W&D Studios (WebIt and DesignIt Studios Incorporated) is a cutting-edge digital agency that bridges the gap between creative design and innovative technology solutions.
            </p>
            <p className="text-gray-700 mb-6">
              As a proud subsidiary of MILLI, we leverage their industry-leading AI expertise to enhance our creative services, delivering digital experiences that are not only visually stunning but also incredibly intelligent.
            </p>
            <p className="text-gray-700 mb-8">
              Our team of designers, developers, and AI specialists work collaboratively to create solutions that help businesses thrive in the digital landscape.
            </p>
            <div className="flex items-center space-x-6">
              <Link href="#services" className="flex items-center font-medium text-primary hover:text-primary/80 transition-colors">
                <span>Our Services</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="#team" className="flex items-center font-medium text-primary hover:text-primary/80 transition-colors">
                <span>Meet The Team</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80" 
                alt="Creative digital agency workspace" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <img src="https://milliintell.netlify.app/images/logo.png" alt="MILLI Logo" className="h-10 w-auto mr-3" />
                <div>
                  <p className="text-xs text-gray-500">A Subsidiary of</p>
                  <p className="font-bold">MILLI</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default About;
