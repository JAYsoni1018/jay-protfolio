import { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Hero from '../components/hero/Hero'
import About from '../components/about/About';
import Skills from '../components/skills/Skills';
import Education from '../components/education/Education';
import Experience from '../components/experience/Experience';
import Projects from '../components/projects/Projects';
import Achievements from '../components/achievements/Achievements';
import Certificates from '../components/certificates/Certificates';
import Publications from '../components/publications/Publications';
import Contact from '../components/contact/Contact';
import Footer from '../components/footer/Footer';
import SEO from '../components/common/SEO';
import { sectionsApi } from '../services/resources'

const DEFAULT_SECTIONS = [
    { sectionKey: 'hero', enabled: true, displayOrder: 0 },
    { sectionKey: 'about', enabled: true, displayOrder: 1 },
    { sectionKey: 'skills', enabled: true, displayOrder: 2 },
    { sectionKey: 'education', enabled: true, displayOrder: 3 },
    { sectionKey: 'experience', enabled: true, displayOrder: 4 },
    { sectionKey: 'projects', enabled: true, displayOrder: 5 },
    { sectionKey: 'achievements', enabled: true, displayOrder: 6 },
    { sectionKey: 'certificates', enabled: true, displayOrder: 7 },
    { sectionKey: 'publications', enabled: true, displayOrder: 8 },
    { sectionKey: 'contact', enabled: true, displayOrder: 9 },
]

const SECTION_COMPONENTS = {
    hero: Hero,
    about: About,
    skills: Skills,
    education: Education,
    experience: Experience,
    projects: Projects,
    achievements: Achievements,
    certificates: Certificates,
    publications: Publications,
    contact: Contact,
}

const Home = () => {
    const [sections, setSections] = useState(DEFAULT_SECTIONS)

    useEffect(() => {
        sectionsApi.getAll().then((res) => {
            setSections(res.data.data.filter((section) => section.enabled !== false).sort((a, b) => a.displayOrder - b.displayOrder))
        }).catch(() => { })
    }, [])

    return (
        <div>
            <SEO title="Home" />
            <Navbar />
            {sections.map((section) => {
                const SectionComponent = SECTION_COMPONENTS[section.sectionKey]
                return SectionComponent ? <SectionComponent key={section.sectionKey} /> : null
            })}
            <Footer />
            {/* About, Skills, Education, Experience, Projects, Achievements,
          Certificates, Publications, Contact, Footer — built in next steps */}
        </div>
    )
}

export default Home