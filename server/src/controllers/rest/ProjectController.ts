import { Controller, Inject } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { Get, Post, Returns } from "@tsed/schema";
import { ProjectModel } from "../../models/ProjectModel";
import { ProjectService } from "../../services/ProjectService";
import { SuccessArrayResult, SuccessResult } from "../../util/entities";

@Controller("/projects")
export class ProjectController {
  @Inject()
  private projectService: ProjectService;

  @Get()
  @(Returns(200, SuccessArrayResult).Of(ProjectModel))
  public async getProjects() {
    const projects = await this.projectService.getProjects();
    return new SuccessArrayResult(projects, ProjectModel);
  }

  @Post()
  @(Returns(200, SuccessResult).Of(ProjectModel))
  public async createProject(@BodyParams() body: Partial<ProjectModel>) {
    const project = await this.projectService.createProject(body);
    return new SuccessResult(project, ProjectModel);
  }
}
