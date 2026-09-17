import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'

import Hero from '../models/Hero.js'
import About from '../models/About.js'
import SkillCategory from '../models/SkillCategory.js'
import Skill from '../models/Skill.js'
import Education from '../models/Education.js'
import Experience from '../models/Experience.js'
import Project from '../models/Project.js'
import Achievement from '../models/Achievement.js'
import Certificate from '../models/Certificate.js'
import Publication from '../models/Publication.js'
import SocialLink from '../models/SocialLink.js'
import Section from '../models/Section.js'

const run = async () => {
  await connectDB()

  console.log('Clearing existing data...')
  await Promise.all([
    Hero.deleteMany(),
    About.deleteMany(),
    SkillCategory.deleteMany(),
    Skill.deleteMany(),
    Education.deleteMany(),
    Experience.deleteMany(),
    Project.deleteMany(),
    Achievement.deleteMany(),
    Certificate.deleteMany(),
    Publication.deleteMany(),
    SocialLink.deleteMany(),
    Section.deleteMany(),
  ])

  console.log('Seeding sections...')
  await Section.insertMany([
    { sectionKey: 'hero', title: 'Home', enabled: true, displayOrder: 0 },
    { sectionKey: 'about', title: 'About', enabled: true, displayOrder: 1 },
    { sectionKey: 'skills', title: 'Skills', enabled: true, displayOrder: 2 },
    { sectionKey: 'education', title: 'Education', enabled: true, displayOrder: 3 },
    { sectionKey: 'experience', title: 'Experience', enabled: true, displayOrder: 4 },
    { sectionKey: 'projects', title: 'Projects', enabled: true, displayOrder: 5 },
    { sectionKey: 'achievements', title: 'Achievements', enabled: true, displayOrder: 6 },
    { sectionKey: 'certificates', title: 'Certificates', enabled: true, displayOrder: 7 },
    { sectionKey: 'publications', title: 'Publications', enabled: true, displayOrder: 8 },
    { sectionKey: 'contact', title: 'Contact', enabled: true, displayOrder: 9 },
  ])

  console.log('Seeding hero...')
  await Hero.create({
    name: 'Jay',
    title: 'AI & Full Stack Developer',
    tagline: 'Building intelligent, scalable and user-focused applications.',
    introduction:
      'M.Tech student specializing in AI & Decision Science, working on RAG pipelines, LLM-powered apps, and full-stack platforms.',
    githubUrl: 'https://github.com/yourusername',
    linkedinUrl: 'https://linkedin.com/in/yourusername',
  })

  console.log('Seeding about...')
  await About.create({
    biography: 'Passionate about building AI-driven applications that solve real problems.',
    professionalSummary: 'Experienced with RAG pipelines, LangChain, LangGraph, FastAPI, and full-stack development.',
    interests: ['AI/ML', 'Trading Systems', 'Open Source'],
    careerFocus: 'AI/ML Engineering & Full Stack Development',
    stats: [
      { label: 'Projects Completed', value: '10+', order: 0 },
      { label: 'Technologies', value: '20+', order: 1 },
      { label: 'Publications', value: '1', order: 2 },
      { label: 'Certifications', value: '5+', order: 3 },
    ],
  })

  console.log('Seeding skill categories + skills...')
  const categories = await SkillCategory.insertMany([
    { name: 'Programming', displayOrder: 0 },
    { name: 'AI / ML', displayOrder: 1 },
    { name: 'Web Development', displayOrder: 2 },
    { name: 'Tools', displayOrder: 3 },
  ])
  const catMap = Object.fromEntries(categories.map((c) => [c.name, c._id]))

  await Skill.insertMany([
    { name: 'Python', category: catMap['Programming'], proficiency: 90, displayOrder: 0 },
    { name: 'JavaScript', category: catMap['Programming'], proficiency: 85, displayOrder: 1 },
    { name: 'RAG Pipelines', category: catMap['AI / ML'], proficiency: 88, featured: true, displayOrder: 0 },
    { name: 'LangChain', category: catMap['AI / ML'], proficiency: 85, displayOrder: 1 },
    { name: 'React', category: catMap['Web Development'], proficiency: 85, displayOrder: 0 },
    { name: 'FastAPI', category: catMap['Web Development'], proficiency: 80, displayOrder: 1 },
    { name: 'Docker', category: catMap['Tools'], proficiency: 75, displayOrder: 0 },
    { name: 'Git', category: catMap['Tools'], proficiency: 85, displayOrder: 1 },
  ])

  console.log('Seeding education...')
  await Education.create({
    degree: 'M.Tech, AI & Decision Science',
    institution: 'Your Institution Name',
    fieldOfStudy: 'Artificial Intelligence',
    startDate: new Date('2025-07-01'),
    endDate: new Date('2027-06-01'),
    description: 'Specializing in AI/ML, RAG systems, and decision science.',
    displayOrder: 0,
  })

  console.log('Seeding experience...')
  await Experience.create({
    jobTitle: 'AI/ML Intern',
    company: 'Sample Company',
    employmentType: 'Internship',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-06-01'),
    description: 'Worked on RAG pipelines and LLM-powered applications.',
    technologies: ['Python', 'LangChain', 'FastAPI'],
    displayOrder: 0,
  })

  console.log('Seeding projects...')
  await Project.insertMany([
    {
      title: 'NSE Command Deck',
      slug: 'nse-command-deck',
      shortDescription: 'Real-time trading dashboard for NSE market data.',
      fullDescription: '<p>A real-time trading dashboard built with FastAPI and vanilla JS.</p>',
      technologies: ['FastAPI', 'JavaScript', 'WebSockets'],
      category: 'Full Stack',
      githubUrl: 'https://github.com/yourusername/nse-command-deck',
      featured: true,
      displayOrder: 0,
    },
    {
      title: 'DICOM Radiology Assistant',
      slug: 'dicom-radiology-assistant',
      shortDescription: 'AI assistant for analyzing radiology DICOM images.',
      fullDescription: '<p>An intelligent assistant for radiology image analysis.</p>',
      technologies: ['Python', 'AI/ML', 'DICOM'],
      category: 'AI/ML',
      featured: true,
      displayOrder: 1,
    },
  ])

  console.log('Seeding achievements...')
  await Achievement.create({
    title: 'GATE Qualified',
    description: 'Qualified the Graduate Aptitude Test in Engineering.',
    date: new Date('2024-03-01'),
    category: 'Academic',
    displayOrder: 0,
  })

  console.log('Seeding certificates...')
  await Certificate.insertMany([
    {
      title: 'Sample Cloud Certification',
      issuingOrganization: 'Sample Issuer',
      issueDate: new Date('2024-05-01'),
      category: 'Cloud',
      skills: ['Cloud Computing'],
      displayOrder: 0,
    },
  ])

  console.log('Seeding publications...')
  await Publication.create({
    title: 'Your IEEE Publication Title',
    authors: ['Jay', 'Co-author Name'],
    venue: 'IEEE Xplore',
    venueType: 'Conference',
    publicationDate: new Date('2024-08-01'),
    abstract: 'Abstract of the published research paper.',
    tags: ['AI', 'Machine Learning'],
    featured: true,
    displayOrder: 0,
  })

  console.log('Seeding social links...')
  await SocialLink.insertMany([
    { platform: 'GitHub', url: 'https://github.com/yourusername', displayOrder: 0 },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', displayOrder: 1 },
    { platform: 'Email', url: 'mailto:you@example.com', displayOrder: 2 },
  ])

  console.log('Seed complete!')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})