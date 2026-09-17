import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import heroRoutes from "./routes/hero.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import projectRoutes from "./routes/project.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import educationRoutes from "./routes/education.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import achievementRoutes from "./routes/achievement.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";
import publicationRoutes from "./routes/publication.routes.js";
import socialRoutes from "./routes/social.routes.js";
import sectionRoutes from "./routes/section.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import { swaggerSpec } from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";
const app = express();

app.use(helmet());
app.use(cors({ origin: env.frontendUrl, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/api/health", (req, res) =>
  res.json({ success: true, message: "API running" }),
);
app.use("/api/auth", authRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/publications", publicationRoutes);
app.use("/api/social-links", socialRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// routes will be mounted here in later steps

app.use(errorMiddleware);

export default app;
