"use client";

import { useState } from "react";
import styles from "@/styles/StudentAccountForm.module.css";

const StudentAccountForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    major: "",
    minor: "",
    skills: [],
  });

  // track input for skills
  const [skillInput, setSkillInput] = useState("");

  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle input for skills
  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  // add the skill to the list when "Enter" is pressed
  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault(); // prevent form submission
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput(""); // clear the input after adding
    }
  };

  // remove a skill with the 'x'
  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.profilePicture}>
          {profilePicture ? (
            <img src={profilePicture} alt="Profile" />
          ) : (
            <img src="/default-profile.png" alt="Default Profile" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        <form onSubmit={handleLogin}>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Enter First and Last Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <div className={styles.selectContainer}>
            <label htmlFor="major" className={styles.label}>
              Major
            </label>
            <select
              className={styles.select}
              name="major"
              value={formData.major}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Your Major</option>
              <option value="csen">Computer Science and Engineering</option>
              <option value="bioe">Bioengineering</option>
              <option value="mech">Mechanical Engineering</option>
              <option value="web">Web Design and Engineering</option>
              <option value="civil">Civil Engineering</option>
              <option value="ecen">Electrical and Computer Engineering</option>
              <option value="gen">General Engineering</option>
            </select>
          </div>

          <div className={styles.selectContainer}>
            <label htmlFor="minor" className={styles.label}>
              Minor
            </label>
            <input
              className={styles.input}
              type="text"
              name="minor"
              placeholder="Minor(s)"
              value={formData.minor}
              onChange={handleInputChange}
            />
          </div>

          {/* Skills input box */}
          <div className={styles.skillsInputContainer}>
            <input
              className={styles.input}
              type="text"
              name="skills"
              placeholder="Type your skills and press Enter"
              value={skillInput}
              onChange={handleSkillInputChange}
              onKeyDown={handleSkillKeyDown}
            />
          </div>

          {/* Skills list below the input */}
          <div className={styles.skillsContainer}>
            {formData.skills.map((skill, index) => (
              <div key={index} className={styles.skillTag}>
                {skill}{" "}
                <span
                  onClick={() => handleRemoveSkill(skill)}
                  className={styles.removeSkill}
                >
                  x
                </span>
              </div>
            ))}
          </div>

          <button className={styles.button} type="submit">
            Create Account
          </button>
        </form>
      </div>

      {!isLoggedIn && (
        <div className={styles.instructionContainer}>
          <p className={styles.instructionText}>
            Enter your information on the left to create an account.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentAccountForm;
