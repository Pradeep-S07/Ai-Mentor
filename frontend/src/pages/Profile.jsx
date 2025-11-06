import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit2, Plus, Trash2, Save, X, Award, Calendar } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { userAPI } from '../lib/api';

export default function Profile() {
  const { userId } = useParams();
  const { user: authUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: '', bio: '', avatar: '' });
  const [skillFormData, setSkillFormData] = useState({ name: '', level: 'Beginner', yearsOfExperience: 0 });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const isOwnProfile = authUser && authUser._id === userId;

  useEffect(() => {
    loadUserProfile();
  }, [userId]);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      const data = await userAPI.getUser(userId);
      setUser(data.user);
      setEditFormData({
        name: data.user.name,
        bio: data.user.bio || '',
        avatar: data.user.avatar || ''
      });
    } catch (err) {
      setError('Failed to load user profile');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setError('');
      const data = await userAPI.updateProfile(userId, editFormData.name, editFormData.bio, editFormData.avatar);
      setUser(data.user);
      updateUser(data.user);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddSkill = async () => {
    try {
      if (!skillFormData.name.trim()) {
        setError('Skill name is required');
        return;
      }
      setError('');
      const data = await userAPI.addSkill(userId, skillFormData.name, skillFormData.level, skillFormData.yearsOfExperience);
      setUser(data.user);
      updateUser(data.user);
      setSkillFormData({ name: '', level: 'Beginner', yearsOfExperience: 0 });
      setIsAddingSkill(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      setError('');
      const data = await userAPI.deleteSkill(userId, skillId);
      setUser(data.user);
      updateUser(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 text-gray-600 hover:text-gray-900 font-medium"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 mb-6">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={editFormData.bio}
                      onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
                      rows="3"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleUpdateProfile}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditFormData({
                          name: user.name,
                          bio: user.bio || '',
                          avatar: user.avatar || ''
                        });
                      }}
                      className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                      <p className="text-gray-600">@{user.email.split('@')[0]}</p>
                    </div>
                  </div>
                  {user.bio && <p className="text-gray-700 mb-4">{user.bio}</p>}
                  {isOwnProfile && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Award className="w-6 h-6 text-blue-600" />
                Skills
              </h2>
              {isOwnProfile && !isAddingSkill && (
                <button
                  onClick={() => setIsAddingSkill(true)}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Skill
                </button>
              )}
            </div>

            {isAddingSkill && isOwnProfile && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4 border-2 border-blue-200">
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Skill name"
                    value={skillFormData.name}
                    onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
                  />
                  <select
                    value={skillFormData.level}
                    onChange={(e) => setSkillFormData({ ...skillFormData, level: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Years of experience"
                    value={skillFormData.yearsOfExperience}
                    onChange={(e) => setSkillFormData({ ...skillFormData, yearsOfExperience: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
                    min="0"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddSkill}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add Skill
                    </button>
                    <button
                      onClick={() => {
                        setIsAddingSkill(false);
                        setSkillFormData({ name: '', level: 'Beginner', yearsOfExperience: 0 });
                      }}
                      className="flex-1 bg-gray-400 text-white px-3 py-2 rounded-lg hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {user.skills && user.skills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.skills.map((skill) => (
                  <div key={skill._id} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-100">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">{skill.name}</h3>
                        <p className="text-sm text-gray-600">{skill.level}</p>
                      </div>
                      {isOwnProfile && (
                        <button
                          onClick={() => handleDeleteSkill(skill._id)}
                          className="text-red-600 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} experience</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No skills added yet</p>
                {isOwnProfile && (
                  <button
                    onClick={() => setIsAddingSkill(true)}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Add your first skill
                  </button>
                )}
              </div>
            )}
          </div>

          {user.currentRoadmap && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Roadmap</h2>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-200">
                <h3 className="font-bold text-gray-900 mb-2">{user.currentRoadmap.role}</h3>
                <div className="w-full bg-white rounded-full h-3 overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
                    style={{ width: `${user.currentRoadmap.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {user.currentRoadmap.progress}% complete
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
