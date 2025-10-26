import { motion } from 'framer-motion';
import { Star, Award, ExternalLink, Linkedin, Twitter } from 'lucide-react';

export default function Teachers() {
  const teachers = [
    {
      id: 1,
      name: 'Dr. Emily Chen',
      title: 'Senior Data Scientist',
      company: 'Google',
      expertise: ['Business Analytics', 'Machine Learning', 'Data Visualization'],
      experience: '12 years',
      students: 2450,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=300&h=300&fit=crop&crop=face',
      bio: 'Leading data scientist with expertise in transforming complex business problems into actionable insights. Former McKinsey consultant turned tech leader.',
      achievements: ['PhD in Statistics', 'Google Analytics Expert', 'TEDx Speaker'],
      social: {
        linkedin: '#',
        twitter: '#',
      }
    },
    {
      id: 2,
      name: 'Mark Rodriguez',
      title: 'Marketing Director',
      company: 'HubSpot',
      expertise: ['Digital Marketing', 'Growth Strategy', 'Brand Management'],
      experience: '10 years',
      students: 1890,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Growth marketing expert who has scaled multiple startups from seed to IPO. Passionate about data-driven marketing strategies.',
      achievements: ['Marketing Week Award', 'Growth Hacker of the Year', 'Harvard Business Review Contributor'],
      social: {
        linkedin: '#',
        twitter: '#',
      }
    },
    {
      id: 3,
      name: 'Jennifer Wu',
      title: 'CFO Consultant',
      company: 'Deloitte',
      expertise: ['Financial Planning', 'Investment Analysis', 'Risk Management'],
      experience: '15 years',
      students: 1456,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Former Fortune 500 CFO with deep expertise in financial strategy and corporate development. Now helps businesses optimize their financial operations.',
      achievements: ['CPA Certified', 'CFO of the Year', 'Forbes Finance Council'],
      social: {
        linkedin: '#',
        twitter: '#',
      }
    },
    {
      id: 4,
      name: 'David Thompson',
      title: 'Executive Coach',
      company: 'Leadership Dynamics',
      expertise: ['Leadership Development', 'Team Management', 'Organizational Psychology'],
      experience: '18 years',
      students: 3200,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Executive coach and organizational psychologist who has worked with C-level executives at Fortune 100 companies.',
      achievements: ['ICF Master Coach', 'Bestselling Author', 'Harvard Business School Faculty'],
      social: {
        linkedin: '#',
        twitter: '#',
      }
    },
    {
      id: 5,
      name: 'Amanda Foster',
      title: 'Project Management Expert',
      company: 'Microsoft',
      expertise: ['Project Management', 'Agile Methodologies', 'Team Leadership'],
      experience: '14 years',
      students: 987,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face',
      bio: 'PMP-certified project management expert with experience leading complex technology initiatives across multiple industries.',
      achievements: ['PMP Certified', 'Scrum Master', 'PMI Global Award'],
      social: {
        linkedin: '#',
        twitter: '#',
      }
    },
    {
      id: 6,
      name: 'Alex Kumar',
      title: 'Serial Entrepreneur',
      company: 'TechStars',
      expertise: ['Entrepreneurship', 'Startup Strategy', 'Venture Capital'],
      experience: '16 years',
      students: 2150,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      bio: 'Serial entrepreneur with 3 successful exits. Now mentors the next generation of startup founders and teaches practical entrepreneurship.',
      achievements: ['3 Successful Exits', 'Y Combinator Mentor', '40 Under 40'],
      social: {
        linkedin: '#',
        twitter: '#',
      }
    }
  ];

  return (
    <section id="teachers" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6"
          >
            <Award className="w-4 h-4 mr-2" />
            Meet Our Expert Instructors
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold font-poppins mb-6">
            Learn from{' '}
            <span className="gradient-text">Industry Leaders</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our instructors are seasoned professionals currently working at top companies. 
            They bring real-world experience and cutting-edge insights directly to your learning journey.
          </p>
        </motion.div>

        {/* Teachers Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 relative">
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    {teacher.rating}
                  </div>
                </div>

                {/* Profile Image Section */}
                <div className="relative bg-gradient-to-br from-blue-100 to-cyan-100 p-8 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative inline-block"
                  >
                    <img 
                      src={teacher.image} 
                      alt={teacher.name}
                      className="w-24 h-24 rounded-full mx-auto shadow-xl border-4 border-white object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </motion.div>

                  <h3 className="text-xl font-bold font-poppins mt-4 mb-1 text-gray-900">
                    {teacher.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">{teacher.title}</p>
                  <p className="text-gray-600 text-sm">{teacher.company}</p>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text">{teacher.students.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text">{teacher.experience}</div>
                      <div className="text-xs text-gray-500">Experience</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {teacher.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {teacher.expertise.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-gray-900 text-sm">Key Achievements</h4>
                    {teacher.achievements.slice(0, 2).map((achievement, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-600">
                        <Award className="w-3 h-3 mr-2 text-yellow-500" />
                        {achievement}
                      </div>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex space-x-3">
                      <motion.a
                        href={teacher.social.linkedin}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
                      >
                        <Linkedin className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        href={teacher.social.twitter}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 hover:bg-cyan-600 hover:text-white transition-all duration-200"
                      >
                        <Twitter className="w-4 h-4" />
                      </motion.a>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group"
                    >
                      View Profile
                      <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Our Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold font-poppins mb-4">Want to Teach with Us?</h3>
            <p className="text-gray-600 mb-6">
              Join our community of expert instructors and share your knowledge with thousands of eager learners worldwide.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Become an Instructor
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
