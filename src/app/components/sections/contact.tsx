'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { MapPin, Phone, Mail, Globe, Send } from 'lucide-react';
import { useState } from 'react';
import { useReducedMotion } from '@/app/lib/responsive';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'aniruddha.ponnuri@gmail.com';
const CONTACT_PHONE = process.env.NEXT_PUBLIC_PHONE || '+91-9205481551';
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.PUBLIC_APP_URL ||
  'https://aniruddhaponnuri.vercel.app';
const LOCATION = process.env.NEXT_PUBLIC_LOCATION || 'Chennai, Tamil Nadu, India';
const MAPS_URL =
  process.env.NEXT_PUBLIC_MAPS_URL || 'https://www.google.co.in/maps/@13.0475255,80.2090117,8z';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    content: LOCATION,
    link: MAPS_URL,
  },
  {
    icon: Phone,
    title: 'Contact Number',
    content: CONTACT_PHONE,
    link: `tel:${CONTACT_PHONE.replace(/\s+/g, '')}`,
  },
  {
    icon: Mail,
    title: 'Email Address',
    content: CONTACT_EMAIL,
    link: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: Globe,
    title: 'Website',
    content: SITE_URL.replace(/^https?:\/\//, ''),
    link: SITE_URL,
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    alert('Message sent successfully!');
  };

  return (
    <section id="contact" className="section-shell">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45 }}
          className="mb-16 text-center"
        >
          <h2 className="section-title mb-4 text-3xl font-semibold sm:text-4xl lg:text-5xl">Contact Me</h2>
          <p className="section-lead mx-auto text-base sm:text-lg lg:text-xl">
            The greatest gift you can give someone is your time, your attention, and your presence. Let us connect and
            discuss meaningful opportunities.
          </p>
        </motion.div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
              className="lg:col-span-4"
            >
              <div className="mb-6">
                <h3 className="section-title mb-4 text-xl font-semibold sm:text-2xl lg:text-3xl">Get In Touch</h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  I am always open to discussing interesting projects, collaborations, and impactful opportunities.
                  Whether you have a question or just want to say hi, feel free to reach out.
                </p>
              </div>

              <div className="surface-card h-[320px] overflow-hidden rounded-xl sm:h-[360px] lg:h-[410px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124378.0459849938!2d80.12661197303541!3d13.047512418768992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709738681575!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location map showing Chennai, Tamil Nadu, India"
                  aria-label="Google Maps embed showing location in Chennai"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, delay: prefersReducedMotion ? 0 : 0.08 }}
              className="lg:col-span-4"
            >
              <div className="grid h-full grid-cols-2 gap-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: prefersReducedMotion ? 0.01 : 0.24,
                        delay: prefersReducedMotion ? 0 : index * 0.05,
                      }}
                      className="h-full"
                    >
                      <Card className="h-full hover:-translate-y-0.5 hover:shadow-lg">
                        <CardContent className="flex h-full flex-col justify-center p-3 text-center sm:p-4">
                          <div className="mx-auto mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/12 sm:mb-3 sm:h-10 sm:w-10">
                            <Icon className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                          </div>
                          <h4 className="mb-1 text-xs font-semibold sm:mb-2 sm:text-sm">{info.title}</h4>
                          <a
                            href={info.link}
                            target={info.link.startsWith('http') ? '_blank' : undefined}
                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="break-words text-xs leading-tight text-muted-foreground transition-colors duration-150 hover:text-primary"
                          >
                            {info.content}
                          </a>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, delay: prefersReducedMotion ? 0 : 0.15 }}
              className="lg:col-span-4"
            >
              <Card className="h-full">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="section-title text-lg font-semibold sm:text-xl lg:text-2xl">
                    Send Me a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" aria-label="Contact form">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="sr-only">
                          Your Name
                        </label>
                        <Input
                          id="contact-name"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          aria-required="true"
                          autoComplete="name"
                          className="h-11 text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="sr-only">
                          Your Email
                        </label>
                        <Input
                          id="contact-email"
                          name="email"
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          aria-required="true"
                          autoComplete="email"
                          className="h-11 text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="sr-only">
                        Subject
                      </label>
                      <Input
                        id="contact-subject"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        aria-required="true"
                        className="h-11 text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="sr-only">
                        Your Message
                      </label>
                      <Textarea
                        id="contact-message"
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        aria-required="true"
                        rows={4}
                        className="resize-none text-sm sm:text-base"
                      />
                    </div>

                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full group">
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                          Sending...
                        </div>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
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
