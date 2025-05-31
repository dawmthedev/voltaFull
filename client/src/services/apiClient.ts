interface UpdateRoleParams {
  userId: string;
  role: string;
}

export const updateUserRole = async ({ userId, role }: UpdateRoleParams) => {
  const response = await fetch(`/rest/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user role");
  }

  return await response.json();
};

export type { UpdateRoleParams };
