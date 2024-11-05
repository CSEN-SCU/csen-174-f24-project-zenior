"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react"; // importing camera icon from Lucide icons
import styles from "@/styles/StudentAccountForm.module.css";
import { usePathname } from "next/navigation";
import {useSession } from "next-auth/react"; // added to import session data 

const StudentAccountForm = ({ user, userUpdate, hideInstruction }) => {
  const {data: session } = useSession(); // access session data
  const [formData, setFormData] = useState({
    name: user.student
      ? `${user.student.firstName} ${user.student.lastName}`
      : "",
    major: user.student?.major || "",
    minor: user.student?.minor || "",
    skills: user.student?.skills?.map((skill) => skill.skill.name) || [],
  });

  // track input for skills
  const [skillInput, setSkillInput] = useState("");

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState(null);

  const pathname = usePathname();

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
        <div className={styles.avatarContainer}>
          <Avatar className="w-32 h-32">
            {" "}
            {/* make avatar larger */}
            <AvatarImage
              src={session?.user.image || "/images/default-avatar.png"}
              alt="Profile"
            />
            <AvatarFallback>Profile Picture</AvatarFallback>
          </Avatar>
          <label htmlFor="profile-upload" className={styles.cameraIcon}>
            <Camera />
          </label>
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
        </div>

        <form
          action={() =>
            userUpdate(user.id, {
              new: false,
              Student: {
                firstName: formData.name.split(" ")[0],
                lastName: formData.name.split(" ")[1],
                major: formData.major,
                minor: formData.minor,
                skills: formData.skills,
              },
            })
          }
        >
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
              <option value="civil">
                Civil, Environmental, and Sustainable Engineering
              </option>
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

          <Button variant="custom">
            {pathname === "/my-team" ? "Update Profile" : "Create Profile"}
          </Button>
        </form>
      </div>
      {/* Conditionally rendering the instruction text */}
      {!hideInstruction && (
        <div className={styles.instructionContainer}>
          <p className={styles.instructionText}>
            Enter your information on the left to create an account.
          </p>
        </div>
      )}
    </div>
  );
};

StudentAccountForm.propTypes = {
  user: PropTypes.object.isRequired,
  userUpdate: PropTypes.func.isRequired,
  hideInstruction: PropTypes.bool,
};

export default StudentAccountForm;
