import React, { useState } from "react";
import { useAppSelector } from "../store";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import {
  UserCircle,
  EnvelopeSimple,
  Phone,
  Key,
  PencilLine,
  Camera,
} from "@phosphor-icons/react"; // Switch to phosphor icons which has better TypeScript support

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  avatar?: File | null;
}

const ProfilePage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [formData, setFormData] = useState<ProfileForm>({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    avatar: null,
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setMessage({ type: "success", text: "Profile updated successfully!" });
    setIsEditing(false);
    setIsSaving(false);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Profile Settings"
        actions={
          !isEditing && (
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center"
              >
                <PencilLine className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          )
        }
      />

      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-8 transition-all duration-500">
          {/* Profile Image Section */}
          <div className="flex items-center space-x-6">
            <div className="relative group">
              {formData.avatar ? (
                <img
                  src={URL.createObjectURL(formData.avatar)}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover ring-4 ring-teal-500/20"
                />
              ) : (
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-teal-500/20">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              {isEditing && (
                <label
                  className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg cursor-pointer
                  transform transition-all duration-200 hover:scale-110 hover:shadow-xl"
                >
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <Camera className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </label>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user?.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.role}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <Input
                label="Full Name"
                icon={<UserCircle className="w-5 h-5 text-gray-400" />}
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                disabled={!isEditing}
              />

              <Input
                label="Email Address"
                icon={<EnvelopeSimple className="w-5 h-5 text-gray-400" />}
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                disabled={!isEditing}
              />

              <Input
                label="Phone Number"
                icon={<Phone className="w-5 h-5 text-gray-400" />}
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                disabled={!isEditing}
              />

              {isEditing && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="input-base mt-1"
                        value={formData.currentPassword}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            currentPassword: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="input-base mt-1"
                        value={formData.newPassword}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="input-base mt-1"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" isLoading={isSaving}>
                  Save Changes
                </Button>
              </div>
            )}
          </form>

          {/* Message Toast */}
          {message && (
            <div className="fixed bottom-4 right-4 animate-in slide-in-from-bottom-2">
              <div
                className={`
                px-4 py-3 rounded-lg shadow-lg
                ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                    : "bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                }
              `}
              >
                {message.text}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default ProfilePage;
