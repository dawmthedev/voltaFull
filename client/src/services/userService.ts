import { api } from "./api";
import { baseURL } from "../apiConfig";

interface UpdateRoleParams {
  userId: string;
  role: string;
}

export interface InviteUserParams {
  name: string;
  email: string;
  role: string;
  phone?: string;
}

export const userService = {
  /**
   * Updates a user's role by making a POST request to /api/users/:id/role
   */
  updateRole: async (userId: string, role: string): Promise<{ id: string; role: string }> => {
    try {
      const endpoint = `${baseURL}/api/users/${userId}/role`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ role })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract the user data from the response
      const userData = data.data || data;
      
      return {
        id: userData._id || userData.id || userId,
        role: userData.role || role
      };
    } catch (error) {
      console.error('Failed to update user role:', error);
      throw error;
    }
  },
  
  /**
   * Sends an invite to a new user via Zapier webhook
   */
  inviteUser: async (userData: InviteUserParams): Promise<void> => {
    try {
      const response = await fetch(`${baseURL}/api/webhooks/invite-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send invitation');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to send invitation:', error);
      throw error;
    }
  }
};

export default userService;