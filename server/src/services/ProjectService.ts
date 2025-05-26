import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { ProjectModel } from "../models/ProjectModel";

export function parseCSV(content: string): Record<string, string>[] {
  const [headerLine, ...lines] = content.split(/\r?\n/).filter(Boolean);
  const headers = headerLine.split(',');
  return lines.map((line) => {
    const values = line.split(',');
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = values[i]?.trim() || '';
    });
    return obj;
  });
}

export function transformCSVToProject(row: Record<string, string>): Partial<ProjectModel> {
  return {
    homeowner: row['Homeowner'],
    saleDate: row['Sale Date'],
    products: row['Products'] ? row['Products'].split(';') : [],
    contractAmount: parseFloat(row['Contract Amount']?.replace(/[^0-9.]/g, '') || '0'),
    status: row['Solar Install - Status'],
    stage: row['Stage'],
    duration: row['Project Duration'],
    systemSize: row['Final System Size (Watts)'],
    assignedTo: row['email1']?.toLowerCase() || null
  };
}

@Injectable()
export class ProjectService {
  constructor(@Inject(ProjectModel) private projectModel: MongooseModel<ProjectModel>) {}

  public async createProject(data: Partial<ProjectModel>) {
    return await this.projectModel.create(data);
  }

  public async getProjects() {
    return await this.projectModel.find();
  }

  public async insertMany(data: Partial<ProjectModel>[]) {
    return await this.projectModel.insertMany(data);
  }
}
