export const userService = {
  updateRole: async (id: string, role: string) => {
    const response = await fetch(`/api/users/${id}/role`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user role");
    }

    return await response.json();
  },
};
