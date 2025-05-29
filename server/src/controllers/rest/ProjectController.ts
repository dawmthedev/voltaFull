import { Controller, Inject } from "@tsed/di";
import { BodyParams, MultipartFile, PlatformMulterFile, QueryParams, PathParams } from "@tsed/common";
import { Get, Post, Patch, Returns } from "@tsed/schema";
import { NotFound } from "@tsed/exceptions";
import { ProjectModel } from "../../models/ProjectModel";
import { ProjectService, parseCSV, transformCSVToProject } from "../../services/ProjectService";
import { SuccessArrayResult, SuccessResult } from "../../util/entities";

@Controller("/projects")
export class ProjectController {
  @Inject()
  private projectService: ProjectService;

  @Get()
  @(Returns(200, SuccessArrayResult).Of(ProjectModel))
  public async getProjects(@QueryParams('page') page: number = 1, @QueryParams('pageSize') pageSize: number = 20) {
    const { items, total } = await this.projectService.getProjects(page, pageSize);
    return { data: items, total };
  }

  @Post()
  @(Returns(200, SuccessResult).Of(ProjectModel))
  public async createProject(@BodyParams() body: Partial<ProjectModel>) {
    const project = await this.projectService.createProject(body);
    return new SuccessResult(project, ProjectModel);
  }

  @Get(":id")
  @(Returns(200, SuccessResult).Of(ProjectModel))
  public async getById(@PathParams("id") id: string) {
    const project = await this.projectService.findById(id);
    if (!project) {
      throw new NotFound(`Project with id ${id} not found`);
    }
    return new SuccessResult(project, ProjectModel);
  }

  @Patch(":id")
  @(Returns(200, SuccessResult).Of(ProjectModel))
  public async updateProject(
    @PathParams("id") id: string,
    @BodyParams() body: Partial<ProjectModel>
  ) {
    const project = await this.projectService.updateProject(id, body);
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
