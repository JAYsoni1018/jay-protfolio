import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import ProjectDetails from './pages/ProjectDetails'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminLayout from './layouts/AdminLayout'
import AdminProjects from './pages/admin/Projects';
import ProjectForm from './pages/admin/ProjectForm'
import AdminSkills from './pages/admin/Skills'
import AdminEducation from './pages/admin/Education'
import AdminExperience from './pages/admin/Experience'
import AdminAchievements from './pages/admin/Achievements'
import AdminCertificates from './pages/admin/Certificates'
import AdminPublications from './pages/admin/Publications'
import AdminSocialLinks from './pages/admin/SocialLinks'
import HeroEditor from './pages/admin/HeroEditor'
import AboutEditor from './pages/admin/AboutEditor'
import AdminResume from './pages/admin/Resume'
import AdminMessages from './pages/admin/Messages'
import AdminSettings from './pages/admin/Settings'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="projects/:id" element={<ProjectForm />} />
              <Route path="skills" element={<AdminSkills />} />
              <Route path="education" element={<AdminEducation />} />
              <Route path="experience" element={<AdminExperience />} />
              <Route path="achievements" element={<AdminAchievements />} />
              <Route path="certificates" element={<AdminCertificates />} />
              <Route path="publications" element={<AdminPublications />} />
              <Route path="social-links" element={<AdminSocialLinks />} />
              <Route path="hero" element={<HeroEditor />} />
              <Route path="about" element={<AboutEditor />} />
              <Route path="resume" element={<AdminResume />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="settings" element={<AdminSettings />} />
              {/* hero, about, skills, education, experience, projects, achievements,
      certificates, publications, resume, social-links, messages, settings
      — added over the next steps */}
            </Route>
          </Routes>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              {/* more admin child routes added in the admin dashboard step */}
            </Route>
          </Routes>

        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App