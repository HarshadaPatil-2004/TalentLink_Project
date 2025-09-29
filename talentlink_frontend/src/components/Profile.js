import React, { useState, useEffect, useContext } from "react";
import API from "./axiosInstance";
import AuthContext from "./AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    location: "",
    hourly_rate: "",
    skills: [],
  });
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("profile/");
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSkills = async () => {
      try {
        const res = await API.get("skills/");
        setAllSkills(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selected.push(options[i].value);
    }
    setProfile({ ...profile, skills: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put("profile/", profile);
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>{user?.username}'s Profile</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={profile.location}
          onChange={handleChange}
        />
        <input
          type="number"
          name="hourly_rate"
          placeholder="Hourly Rate"
          value={profile.hourly_rate}
          onChange={handleChange}
        />
        <select multiple value={profile.skills} onChange={handleSkillsChange}>
          {allSkills.map((skill) => (
            <option key={skill.id} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
