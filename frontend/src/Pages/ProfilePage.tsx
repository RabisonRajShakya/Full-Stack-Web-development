import { useState, useEffect } from "react";
import axios from "axios";
// import Profile from "../assets/image/profile.png"; // Default profile image
import { NavLink } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    location:"",
    phone: "",
    website: "",
    avatar: "",
    joinDate: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const userRole = localStorage.getItem("role"); // "admin" or "user"
  const selectedUserId = localStorage.getItem("selectedUserId"); // optional for admin

  // Determine if editing is allowed
  const canEdit = userRole === "admin" || !selectedUserId;

  // Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        let url = "http://localhost:3000/api/profile"; // default for normal user

        if (userRole === "admin" && selectedUserId) {
          url = `http://localhost:3000/api/profile${selectedUserId}`;
        }

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        const avatarUrl = data.avatar
          ? `http://localhost:3000/uploads/${data.avatar}`
          : user.avatar;

        const updatedUser = { ...data, avatar: avatarUrl };
        setUser(updatedUser);
        setEditForm(updatedUser);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = () => {
    if (canEdit) setIsEditing(true);
  };

  const handleSave = async () => {
    if (!canEdit) return;

    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      
      // Properly append form fields, excluding avatar and joinDate
      Object.entries(editForm).forEach(([key, value]) => {
        if (key !== "avatar" && key !== "joinDate" && value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });
      
      if (avatarFile) formData.append("avatar", avatarFile);

      let url = "http://localhost:3000/api/profile";
      if (userRole === "admin" && selectedUserId) {
        url = `http://localhost:3000/api/profile ${selectedUserId}`;
      }

      const res = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const avatarUrl = res.data.avatar
        ? `http://localhost:3000/uploads/${res.data.avatar}`
        : editForm.avatar;

      const updatedUser = { ...res.data, avatar: avatarUrl };
      setUser(updatedUser);
      setEditForm(updatedUser);
      setIsEditing(false);
      setAvatarFile(null);
    } catch (err) {
      console.error("Failed to update profile:", err);
      // Add alert or toast notification here for user feedback
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditForm(user);
    setIsEditing(false);
    setAvatarFile(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setAvatarFile(e.target.files[0]);
  };

  const triggerFileInput = () => {
    if (!canEdit) return;
    const fileInput = document.getElementById("avatar-upload") as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <div className="profile min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">
              {userRole === "admin" && selectedUserId ? "User Profile" : "My Profile"}
            </h1>
            <p className="text-blue-100 mt-2 text-2xl font-medium">
              Manage personal information
            </p>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Section */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                  <img
                    src={avatarFile ? URL.createObjectURL(avatarFile) : user.avatar}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Member since {user.joinDate}
                </p>
                {canEdit && isEditing && (
                  <div className="mt-2 text-center">
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      onClick={triggerFileInput}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200"
                    >
                      Upload Image
                    </button>
                    {avatarFile && (
                      <p className="text-xs text-green-600 mt-1">
                        Selected: {avatarFile.name}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="flex-1">
                {!isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
                      <p className="text-gray-600">{user.email}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Bio
                      </h3>
                      <p className="mt-1 text-gray-900">{user.bio}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          Location
                        </h3>
                        <p className="mt-1 text-gray-900">{user.location}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          Phone
                        </h3>
                        <p className="mt-1 text-gray-900">{user.phone}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          Website
                        </h3>
                        <NavLink
                          to={user.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 text-blue-600 hover:text-blue-800 underline"
                        >
                          {user.website}
                        </NavLink>
                      </div>
                    </div>

                    {canEdit && (
                      <div className="pt-4">
                        <button
                          onClick={handleEdit}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                        >
                          Edit Profile
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Editable Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={editForm.name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={editForm.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={editForm.bio}
                        onChange={handleInputChange}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={editForm.location}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={editForm.phone}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={editForm.website}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;