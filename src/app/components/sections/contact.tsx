'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { MapPin, Phone, Mail, Globe, Send } from 'lucide-react';
import { useState } from 'react';
import { useReducedMotion } from '@/app/lib/responsive';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    content: 'Chennai, Tamil Nadu, India',
    link: 'https://www.google.co.in/maps/@13.0475255,80.2090117,8z',
  },
  {
    icon: Phone,
    title: 'Contact Number',
    content: '+91-9205481551',
    link: 'tel:+919205481551',
  },  {
    icon: Mail,
    title: 'Email Address',
    content: 'aniruddha.ponnuri@gmail.com',
    link: 'mailto:aniruddha.ponnuri@gmail.com',
  },
  {
    icon: Globe,
    title: 'Website',
    content: 'Portfolio',
    link: 'aniruddha-ponnuri-portfolio.vercel.app',
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    // You could add a toast notification here
    alert('Message sent successfully!');
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Contact Me</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            The greatest gift you can give someone is your time, your attention, your love, and your presence.
            Let&apos;s connect and discuss opportunities!
          </p>
        </motion.div>        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Google Maps - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
              className="lg:col-span-4"
            >
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">Get In Touch</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  I&apos;m always open to discussing new opportunities, interesting projects, 
                  and potential collaborations. Whether you have a question or just want 
                  to say hi, feel free to reach out!
                </p>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-lg h-[300px] sm:h-[350px] lg:h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124378.0459849938!2d80.12661197303541!3d13.047512418768992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709738681575!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>            {/* Contact Information - Middle (2x4 Grid) */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
              className="lg:col-span-4"
            >
              <div className="grid grid-cols-2 gap-4 h-full">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: prefersReducedMotion ? 0.01 : 0.3, 
                        delay: prefersReducedMotion ? 0 : index * 0.1 
                      }}
                      className="h-full"
                    >
                      <Card className="h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col">
                        <CardContent className="p-3 sm:p-4 text-center flex-1 flex flex-col justify-center">
                          <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg mb-2 sm:mb-3 mx-auto">
                            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          </div>
                          <h4 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">{info.title}</h4>
                          <a
                            href={info.link}
                            target={info.link.startsWith('http') ? '_blank' : undefined}
                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200 break-words leading-tight"
                          >
                            {info.content}
                          </a>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}              </div>
            </motion.div>            
            {/* Contact Form - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, delay: prefersReducedMotion ? 0 : 0.4 }}
              className="lg:col-span-4"
            >
              <Card className="shadow-lg h-full">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl">Send Me a Message</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Input
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="h-10 sm:h-12 text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <Input
                          name="email"
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="h-10 sm:h-12 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Input
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="h-10 sm:h-12 text-sm sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="resize-none text-sm sm:text-base"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full group text-sm sm:text-base py-2 sm:py-3"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending...
                        </div>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
