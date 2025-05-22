import React from 'react';

const EmailUserForm: React.FC = () => {
  return (
    <form>
      <input placeholder="Subject" />
      <textarea placeholder="Message" />
      <button type="submit">Send</button>
    </form>
  );
};

export default EmailUserForm;
