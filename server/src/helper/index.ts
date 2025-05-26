import { model, Schema } from "mongoose";
import { LeadStatusEnum } from "../../types";

export const createSchema = ({ tableName, columns }: { tableName: string; columns: any }) => {
  let dynamicModel;
  try {
    dynamicModel = model(tableName);
  } catch (error) {
    const schemaDefinition: Record<string, any> = {};
    for (const column of columns) {
      schemaDefinition[column.name] = column.type;
    }
    const schema = new Schema(schemaDefinition);
    schema.add({
      isNotify: Boolean,
      status: {
        type: String,
        enum: Object.values(LeadStatusEnum)
      },
      categoryId: String,
      adminId: String,
      orgId: String,
      createdAt: Date,
      updatedAt: Date
    });
    // Create a dynamic model based on the schema
    dynamicModel = model(tableName, schema);
  }
  return dynamicModel;
};

// normalize data
export const normalizeData = (data: any) => {
  const result = data.map((item: any) => {
    const { _doc } = item;
    const rest = { ..._doc };
    return rest;
  });
  return result;
};

// get columns for raw data
export const getColumns = (data: any) => {
  const columns: any = [];
  const keys = Object?.keys(data);
  keys.forEach((key) => {
    columns.push({
      name: key,
      type: "string"
    });
  });
  return columns;
};

// write algorithm to assign lead to sales rep based on availability and 15 min duration and score of sale rep
// const assignLeadToSaleRep = async (lead: any, adminId: string) => {
//   const { _id, name, email, phone, address, createdAt, updatedAt } = lead;
//   const saleRep = await SaleRepModel.find({ availabilityStatus: true, durationStatus: true, adminId: adminId }).sort({ score: -1 }).limit(1);
//   if (saleRep.length) {
//     const { _id: saleRepId } = saleRep[0];
//     const saleRepData = {
//       leadId: _id,
//       name,
//       email,
//       phone,
//       address,
//       createdAt,
//       updatedAt,
//       adminId: adminId,
//       availabilityId: saleRep[0].availabilityId,
//       saleRepId
//     };
//     await SaleRepModel.create(saleRepData);
//   }
// }
