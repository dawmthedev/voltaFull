import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { Server } from "../../server/src/Server";
import { ProjectService } from "../../server/src/services/ProjectService";

describe("ProjectController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  let projectService: ProjectService;

  beforeEach(PlatformTest.bootstrap(Server));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
    projectService = PlatformTest.injector.get(ProjectService)!;
  });

  afterEach(PlatformTest.reset);

  it("GET /projects returns projects", async () => {
    const projects = [{ _id: "1", homeowner: "John" }] as any;
    jest.spyOn(projectService, "getProjects").mockResolvedValue(projects);

    const res = await request.get("/rest/projects").expect(200);

    expect(res.body).toEqual({ success: true, data: projects });
  });

  it("POST /projects creates project", async () => {
    const payload = { homeowner: "Jane" };
    const created = { _id: "2", homeowner: "Jane" } as any;
    jest.spyOn(projectService, "createProject").mockResolvedValue(created);

    const res = await request.post("/rest/projects").send(payload).expect(200);

    expect(projectService.createProject).toHaveBeenCalledWith(payload);
    expect(res.body).toEqual({ success: true, data: created });
  });

  it("GET /projects/:id returns project", async () => {
    const proj = { _id: "1", homeowner: "John" } as any;
    jest.spyOn(projectService, "findById").mockResolvedValue(proj);

    const res = await request.get("/rest/projects/1").expect(200);

    expect(projectService.findById).toHaveBeenCalledWith("1");
    expect(res.body).toEqual({ success: true, data: proj });
  });

  it("GET /projects/:id returns 404 when missing", async () => {
    jest.spyOn(projectService, "findById").mockResolvedValue(null as any);

    const res = await request.get("/rest/projects/1").expect(404);

    expect(projectService.findById).toHaveBeenCalledWith("1");
    expect(res.body.message).toMatch(/not found/i);
  });

  it("PATCH /projects/:id updates project", async () => {
    const proj = { _id: "1", homeowner: "Jane" } as any;
    jest.spyOn(projectService, "updateProject").mockResolvedValue(proj);

    const res = await request
      .patch("/rest/projects/1")
      .send({ homeowner: "Jane" })
      .expect(200);

    expect(projectService.updateProject).toHaveBeenCalledWith("1", {
      homeowner: "Jane",
    });
    expect(res.body).toEqual({ success: true, data: proj });
  });
});
