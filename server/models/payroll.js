import mongoose from "mongoose";

const { Schema } = mongoose;

const payrollSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },
    technicianId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    projectName: {  // Add this field
      type: String,
      required: true
    },
    technicianName: {  // Add this field
      type: String,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    amountDue: {
      type: Number,
      required: true
    },
    paid: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

payrollSchema.index({ projectId: 1 });
payrollSchema.index({ technicianId: 1 });

const Payroll = mongoose.model("Payroll", payrollSchema);

export default Payroll;
