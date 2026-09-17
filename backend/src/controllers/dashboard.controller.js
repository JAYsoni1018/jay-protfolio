import Project from '../models/Project.js'
import Skill from '../models/Skill.js'
import Education from '../models/Education.js'
import Experience from '../models/Experience.js'
import Achievement from '../models/Achievement.js'
import Certificate from '../models/Certificate.js'
import Publication from '../models/Publication.js'
import Contact from '../models/Contact.js'

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      projects,
      skills,
      education,
      experience,
      achievements,
      certificates,
      publications,
      messages,
      unreadMessages,
      recentProjects,
      recentMessages,
      featuredProjects,
    ] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Education.countDocuments(),
      Experience.countDocuments(),
      Achievement.countDocuments(),
      Certificate.countDocuments(),
      Publication.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ isRead: false }),
      Project.find().sort('-createdAt').limit(5),
      Contact.find().sort('-createdAt').limit(5),
      Project.find({ featured: true }).limit(5),
    ])

    res.json({
      success: true,
      data: {
        counts: { projects, skills, education, experience, achievements, certificates, publications, messages, unreadMessages },
        recentProjects,
        recentMessages,
        featuredProjects,
      },
    })
  } catch (err) {
    next(err)
  }
}