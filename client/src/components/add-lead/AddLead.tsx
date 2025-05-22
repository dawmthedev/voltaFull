import React from 'react';

export interface LeadField {
  name: string;
  type: string;
  value: string;
}

export interface AddLeadProps {
  leadValue: LeadField[];
  getAddLeadData: (value: string, name: string, index: number) => void;
}

const AddLead: React.FC<AddLeadProps> = ({ leadValue, getAddLeadData }) => {
  return (
    <div>
      {leadValue.map((lead, index) => (
        <div key={index}>
          <label>
            {lead.name}
            <input
              value={lead.value}
              name={lead.name}
              onChange={(e) => getAddLeadData(e.target.value, e.target.name, index)}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default AddLead;
