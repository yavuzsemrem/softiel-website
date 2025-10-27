"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useI18n } from "@/contexts/i18n-context"

export function Testimonials() {
  const { t } = useI18n()

  // Get all testimonials from translation files (0-19)
  const translatedTestimonials = useMemo(() => {
    const testimonials = []
    for (let i = 0; i < 20; i++) {
      const name = t(`about_why_choose.testimonials.${i}.name`, '')
      const company = t(`about_why_choose.testimonials.${i}.company`, '')
      const role = t(`about_why_choose.testimonials.${i}.role`, '')
      const content = t(`about_why_choose.testimonials.${i}.content`, '')
      
      if (name && company && role && content) {
        testimonials.push({ name, company, role, content, rating: 5 })
      }
    }
    return testimonials
  }, [t])

  const testimonials = translatedTestimonials

  return (
    <section id="testimonials" className="relative py-20 lg:py-24 bg-black">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="-mb-16"
        >
           <div className="text-center mb-20">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1, duration: 0.6 }}
               viewport={{ once: true }}
               className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 shadow-modern mb-8"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}
             >
               <Star className="h-5 w-5 text-cyan-500 fill-current" />
               <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                 {t('about_why_choose.testimonialsBadge', 'Müşteri Yorumları')}
               </span>
             </motion.div>
             
             <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-neutral-900 dark:text-white mb-8 leading-tight">
               {t('about_why_choose.testimonialsTitle', 'Müşterilerimiz')}{" "}
               <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                 {t('about_why_choose.testimonialsTitleGradient', 'Ne Diyor?')}
               </span>
             </h2>
             <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 mb-20 max-w-4xl mx-auto leading-relaxed">
               {t('about_why_choose.testimonialsDescription', 'Başarılı projelerimizde yer alan müşterilerimizin deneyimlerini ve görüşlerini keşfedin.')}
             </p>
           </div>

          {/* First Row - Moving Left */}
          <div className="mb-8 overflow-hidden relative">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
            <motion.div
              className="flex space-x-8"
              animate={{ x: [0, -416 * 10] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{ width: 'max-content' }}
            >
              {/* Multiple testimonials for smooth infinite scroll */}
              {[...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10), ...testimonials.slice(0, 10)].map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-96 glass rounded-2xl p-8 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed text-base">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-white text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Second Row - Moving Right */}
          <div className="overflow-hidden relative">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
            <motion.div
              className="flex space-x-8"
              animate={{ x: [-416 * 15, 0] }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              style={{ width: 'max-content' }}
            >
              {/* Multiple testimonials for smooth infinite scroll */}
              {[...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20), ...testimonials.slice(10, 20)].map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-96 glass rounded-2xl p-8 shadow-modern border border-white/50 dark:border-white/40 backdrop-blur-lg dark:[border:1px_solid_rgba(255,255,255,0.2)]"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed text-base">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-white text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </motion.div>

      </div>
    </section>
  )
}
