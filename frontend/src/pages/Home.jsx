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

const Home = () => {
    return (
        <div>
            <SEO title="Home" />
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Education />
            <Experience />
            <Projects />
            <Achievements />
            <Certificates />
            <Publications />
            <Contact />
            <Footer />
            {/* About, Skills, Education, Experience, Projects, Achievements,
          Certificates, Publications, Contact, Footer — built in next steps */}
        </div>
    )
}

export default Home