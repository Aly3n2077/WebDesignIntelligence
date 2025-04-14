import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { 
  Linkedin, 
  Twitter, 
  Github, 
  Mail 
} from "lucide-react";
import { fadeIn, staggerContainer, slideUp } from "@/lib/animations";
import { teamMembers } from "@/lib/data";

const Team = () => {
  return (
    <section id="team" className="py-20 md:py-32 bg-gray-50">
      <Container>
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Meet Our Team</h2>
          <p className="text-gray-700 text-lg">
            Our talented professionals combine creativity, technical expertise, and innovative thinking.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <TeamMember key={member.name} member={member} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

interface TeamMemberProps {
  member: {
    name: string;
    role: string;
    bio: string;
    image: string;
    socials: {
      linkedin?: string;
      twitter?: string;
      github?: string;
      email?: string;
    };
  };
  index: number;
}

const TeamMember = ({ member, index }: TeamMemberProps) => {
  return (
    <motion.div
      variants={slideUp}
      custom={index}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 text-center hover:scale-105 float-animation" //added class
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-6">
        <h3 className="font-heading font-bold text-xl mb-1">{member.name}</h3>
        <p className="text-primary font-medium mb-3">{member.role}</p>
        <p className="text-gray-600 mb-4">{member.bio}</p>
        <div className="flex justify-center space-x-4">
          {member.socials.linkedin && (
            <a href={member.socials.linkedin} className="text-gray-500 hover:text-primary transition-colors">
              <Linkedin size={18} />
            </a>
          )}
          {member.socials.twitter && (
            <a href={member.socials.twitter} className="text-gray-500 hover:text-primary transition-colors">
              <Twitter size={18} />
            </a>
          )}
          {member.socials.github && (
            <a href={member.socials.github} className="text-gray-500 hover:text-primary transition-colors">
              <Github size={18} />
            </a>
          )}
          {member.socials.email && (
            <a href={`mailto:${member.socials.email}`} className="text-gray-500 hover:text-primary transition-colors">
              <Mail size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Team;