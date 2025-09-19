"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  Linkedin, 
  Twitter, 
  Mail, 
  Github,
  Award,
  Users,
  Target
} from "lucide-react"

const teamMembers = [
  {
    name: "Ahmet Yılmaz",
    position: "Kurucu & CEO",
    department: "Yönetim",
    experience: "8+ Yıl",
    description: "Dijital pazarlama ve strateji konularında uzman. 500+ projeye liderlik etti.",
    avatar: "AY",
    skills: ["Strateji", "Liderlik", "Dijital Pazarlama"],
    social: {
      linkedin: "https://linkedin.com/in/ahmetyilmaz",
      twitter: "https://twitter.com/ahmetyilmaz",
      email: "ahmet@softiel.com"
    }
  },
  {
    name: "Elif Demir",
    position: "CTO",
    department: "Teknoloji",
    experience: "6+ Yıl",
    description: "Full-stack geliştirme ve yapay zeka konularında uzman. 200+ web uygulaması geliştirdi.",
    avatar: "ED",
    skills: ["React", "Node.js", "AI/ML"],
    social: {
      linkedin: "https://linkedin.com/in/elifdemir",
      github: "https://github.com/elifdemir",
      email: "elif@softiel.com"
    }
  },
  {
    name: "Mehmet Kaya",
    position: "Tasarım Direktörü",
    department: "Tasarım",
    experience: "7+ Yıl",
    description: "UI/UX tasarım ve kullanıcı deneyimi konularında uzman. 300+ tasarım projesi tamamladı.",
    avatar: "MK",
    skills: ["UI/UX", "Figma", "Prototipleme"],
    social: {
      linkedin: "https://linkedin.com/in/mehmetkaya",
      twitter: "https://twitter.com/mehmetkaya",
      email: "mehmet@softiel.com"
    }
  },
  {
    name: "Zeynep Özkan",
    position: "SEO Uzmanı",
    department: "Pazarlama",
    experience: "5+ Yıl",
    description: "SEO ve içerik pazarlama konularında uzman. 100+ siteyi Google'da üst sıralara taşıdı.",
    avatar: "ZÖ",
    skills: ["SEO", "İçerik", "Analytics"],
    social: {
      linkedin: "https://linkedin.com/in/zeynepozkan",
      twitter: "https://twitter.com/zeynepozkan",
      email: "zeynep@softiel.com"
    }
  },
  {
    name: "Can Arslan",
    position: "Mobil Geliştirici",
    department: "Teknoloji",
    experience: "4+ Yıl",
    description: "React Native ve Flutter konularında uzman. 50+ mobil uygulama geliştirdi.",
    avatar: "CA",
    skills: ["React Native", "Flutter", "iOS/Android"],
    social: {
      linkedin: "https://linkedin.com/in/canarslan",
      github: "https://github.com/canarslan",
      email: "can@softiel.com"
    }
  },
  {
    name: "Selin Yıldız",
    position: "Proje Yöneticisi",
    department: "Yönetim",
    experience: "6+ Yıl",
    description: "Proje yönetimi ve müşteri ilişkileri konularında uzman. 200+ projeyi başarıyla yönetti.",
    avatar: "SY",
    skills: ["PMP", "Agile", "Müşteri İlişkileri"],
    social: {
      linkedin: "https://linkedin.com/in/selinyildiz",
      email: "selin@softiel.com"
    }
  }
]

export function Team() {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">
            Ekibimiz
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Deneyimli ve uzman ekibimizle tanışın. Her biri kendi alanında uzman olan 
            profesyonellerden oluşan ekibimizle projelerinizi hayata geçiriyoruz.
          </p>
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">15+</div>
            <div className="text-neutral-600 dark:text-neutral-400">Uzman Ekip Üyesi</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">50+</div>
            <div className="text-neutral-600 dark:text-neutral-400">Sertifika</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">500+</div>
            <div className="text-neutral-600 dark:text-neutral-400">Başarılı Proje</div>
          </div>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 h-full">
                {/* Avatar */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">
                    {member.position}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {member.department} • {member.experience}
                  </p>
                </div>

                {/* Description */}
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                  {member.description}
                </p>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
                    Uzmanlık Alanları
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  {member.social.linkedin && (
                    <motion.a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </motion.a>
                  )}
                  {member.social.twitter && (
                    <motion.a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </motion.a>
                  )}
                  {member.social.github && (
                    <motion.a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </motion.a>
                  )}
                  {member.social.email && (
                    <motion.a
                      href={`mailto:${member.social.email}`}
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 dark:text-white mb-4">
              Ekibimizle Çalışmak İster misiniz?
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
              Uzman ekibimizle birlikte projenizi hayata geçirelim. 
              Kariyer fırsatlarımızı inceleyin veya projeniz için iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Kariyer Fırsatları
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Proje Başlatın
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

