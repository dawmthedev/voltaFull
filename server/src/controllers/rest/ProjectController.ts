import { Controller, Inject } from "@tsed/di";
import { BodyParams, MultipartFile, PlatformMulterFile } from "@tsed/common";
import { Get, Post, Returns } from "@tsed/schema";
import { ProjectModel } from "../../models/ProjectModel";
import { ProjectService, parseCSV, transformCSVToProject } from "../../services/ProjectService";
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

  @Post("/upload")
  @(Returns(200, SuccessArrayResult).Of(ProjectModel))
  public async uploadCSV(@MultipartFile("file") file: PlatformMulterFile) {
    const records = parseCSV(file.buffer.toString());
    const mapped = records.map(transformCSVToProject);
    const inserted = await this.projectService.insertMany(mapped);
    return new SuccessArrayResult(inserted, ProjectModel);
  }
}
