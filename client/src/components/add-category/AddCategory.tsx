import React from 'react';

export interface FieldTypes {
  name: string;
  type: string;
}
export interface CategoryTypes {
  name: string;
}
export interface AddCategoryProps {
  fields: FieldTypes[];
  category: CategoryTypes;
  isEdit?: boolean;
  getFieldsData?: (value: string, name: string, index: number) => void;
  addNewField?: () => void;
  removeField?: (index: number) => void;
  setCategory?: React.Dispatch<React.SetStateAction<CategoryTypes>>;
}

const AddCategory: React.FC<AddCategoryProps> = ({ fields }) => {
  return (
    <div>
      {fields && fields.map((field, idx) => (
        <div key={idx}>{field.name}</div>
      ))}
    </div>
  );
};

export default AddCategory;
