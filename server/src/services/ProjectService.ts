import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { ProjectModel } from "../models/ProjectModel";

@Injectable()
export class ProjectService {
  constructor(@Inject(ProjectModel) private projectModel: MongooseModel<ProjectModel>) {}

  public async createProject(data: Partial<ProjectModel>) {
    return await this.projectModel.create(data);
  }

  public async getProjects() {
    return await this.projectModel.find();
  }
}
