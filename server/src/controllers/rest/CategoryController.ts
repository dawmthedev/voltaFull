import { Controller, Inject } from "@tsed/di";
import { BodyParams, Context, PathParams } from "@tsed/platform-params";
import { ArrayOf, Delete, Get, Post, Property, Put, Required, Returns } from "@tsed/schema";
import { CategoryResultModel, IdModel, SuccessMessageModel } from "../../models/RestModels";
import { CategoryService } from "../../services/CategoryService";
import { AdminService } from "../../services/AdminService";
import { ADMIN, MANAGER } from "../../util/constants";
import { SuccessArrayResult, SuccessResult } from "../../util/entities";
import { ADMIN_NOT_FOUND, CATEGORY_ALREADY_EXISTS, CATEGORY_NOT_FOUND, ORG_NOT_FOUND } from "../../util/errors";
import { BadRequest } from "@tsed/exceptions";
import logger from "../../util/logger";
import { CategoryFieldType } from "../../models/CategoryModel";
import { FieldTypes } from "../../../types";
import { LeadService } from "../../services/LeadsService";
import mongoose, { Schema, model } from "mongoose";




//test psuh 
class CategoryBodyParams {
  @Required() public name: string;
  @Property() public description: string;
  @ArrayOf(Object) public fields: CategoryFieldType[];
}

@Controller("/category")
export class CategoryController {
  @Inject()
  private adminService: AdminService;
  @Inject()
  private categoryService: CategoryService;
  @Inject()
  private leadsService: LeadService;

  @Get("/")
  @(Returns(200, SuccessArrayResult).Of(CategoryResultModel))
  public async getCategories(@Context() context: Context) {
    const { orgId } = await this.adminService.checkPermissions({ hasRole: [ADMIN, MANAGER] }, context.get("user"));
    if (!orgId) throw new BadRequest(ORG_NOT_FOUND);
    const categories = await this.categoryService.findCategories();
    const response = categories.map((category) => {
      return {
        id: category._id,
        name: category.name,
        description: category.description,
        adminId: category.adminId,
        orgId: category.orgId,
        fields: category.fields,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
      };
    });
    return new SuccessArrayResult(response, CategoryResultModel);
  }

  @Get("/:id")
  @(Returns(200, SuccessResult).Of(CategoryResultModel))
  public async getCategory(@PathParams() { id }: IdModel, @Context() context: Context) {
    const { orgId, email } = await this.adminService.checkPermissions({ hasRole: [ADMIN, MANAGER] }, context.get("user"));
    if (!orgId) throw new BadRequest(ORG_NOT_FOUND);
    const category = await this.categoryService.findCategoryById(id);
    return new SuccessResult({ ...category?.toObject()!, id: category?._id ?? "" }, CategoryResultModel);
  }

  @Post("/")
  @(Returns(200, SuccessResult).Of(CategoryResultModel))
  public async createCategory(@BodyParams() body: CategoryBodyParams, @Context() context: Context) {
    const { orgId, email } = await this.adminService.checkPermissions(
      { hasRole: [ADMIN, MANAGER, "CRM System Administrator"] },
      context.get("user")
    );
    if (!orgId) throw new BadRequest(ORG_NOT_FOUND);
    const admin = await this.adminService.findAdminByEmail(email!);
    if (!admin) throw new BadRequest(ADMIN_NOT_FOUND);
    const { name } = body;
    // dupicate category check
    const categoryCheck = await this.categoryService.findCategoryByName(name);
    if (categoryCheck) throw new BadRequest(CATEGORY_ALREADY_EXISTS);
    const category = await this.categoryService.createCategory({ ...body, orgId, adminId: admin.id });
    return new SuccessResult({ ...category.toObject(), id: category?._id }, CategoryResultModel);
  }

  @Post("/new-column")
  async addNewColumn(@BodyParams() { tableId, fields }: { tableId: string; fields: FieldTypes[] }, @Context() context: Context) {
    await this.adminService.checkPermissions({ hasRole: [ADMIN] }, context.get("user"));
    const category = await this.categoryService.findCategoryById(tableId);
    if (!category) throw new BadRequest(CATEGORY_NOT_FOUND);

    const updatedCategory = await this.categoryService.addFieldsToCategory({ id: category._id, fields });
    return new SuccessResult({ ...updatedCategory?.toObject()!, id: updatedCategory?._id  ?? "" }, CategoryResultModel);
  }

  @Put()
  @(Returns(200, SuccessResult).Of(CategoryResultModel))
  public async updateCategory(@BodyParams() body: IdModel & CategoryBodyParams, @Context() context: Context) {
    const { orgId, email } = await this.adminService.checkPermissions({ hasRole: [ADMIN, MANAGER] }, context.get("user"));
    if (!orgId) throw new BadRequest(ORG_NOT_FOUND);
    const category = await this.categoryService.updateCategory({ ...body });
    return new SuccessResult({ ...category?.toObject()!, id: category?._id ?? "" }, CategoryResultModel);
  }

  @Delete("/:id")
  @(Returns(200, SuccessResult).Of(SuccessMessageModel))
  public async deleteCategory(@PathParams() { id }: IdModel, @Context() context: Context) {
    const { orgId, email } = await this.adminService.checkPermissions({ hasRole: [ADMIN] }, context.get("user"));
    if (!orgId) throw new BadRequest(ORG_NOT_FOUND);
    const category = await this.categoryService.findCategoryById(id);
    if (!category) throw new BadRequest(CATEGORY_NOT_FOUND);
    await this.categoryService.deleteCategory(id);
    await this.leadsService.deleteLeadsByCategoryId(category._id);
    
    if (mongoose.connection && mongoose.connection.db) {
      await mongoose.connection.db.dropCollection(category.name);
    } else {
      logger.error("Database connection or db is undefined.");
      // Optionally handle this case with a throw, custom error, or fallback action
    }
    






    return new SuccessResult({ success: true, message: "Category deleted successfully" }, SuccessMessageModel);
  }
}
