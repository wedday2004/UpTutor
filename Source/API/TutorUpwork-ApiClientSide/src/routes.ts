import { Router } from "express";
const router = Router();
import { UserRoutes } from "./user/user.route";
import { TutorRoutes } from "./tutor/tutor.route";
import { StudentRoutes } from "./student/student.route";
import { SkillRoutes } from "./skill/skill.route";
import { UploadRoutes } from "./upload/upload.route";
import { SandBoxRoutes } from "./sandbox/sanbox.routes";
import { ContractRoutes } from "./contract/contract.routes";
// import { AuthRoutes } from "./auth/auth.route";
import { ConversationRoutes } from './conversation/conversation.route';

const assign: { path: string; controller: Router }[] = [
  {
    path: "/",
    controller: new UserRoutes().router
  },
  {
    path: "/tutor",
    controller: new TutorRoutes().router
  },
  {
    path: "/student",
    controller: new StudentRoutes().router
  },
  {
    path: "/skill",
    controller: new SkillRoutes().router
  },
  {
    path: "/upload",
    controller: new UploadRoutes().router
  },
  {
    path: "/conversations",
    controller: new ConversationRoutes().router
  },
  {
    path: "/pay",
    controller: new SandBoxRoutes().router
  },
  {
    path: "/contract",
    controller: new ContractRoutes().router
  }
];

assign.forEach(({ path, controller }) => {
  router.use(path, controller);
});

export default router;
