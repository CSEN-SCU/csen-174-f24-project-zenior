"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react"; // importing camera icon from Lucide icons
import styles from "@/styles/FacultyAccountForm.module.css";
import { usePathname } from "next/navigation";


const FacultyAccountForm = ({ user, userUpdate, hideInstruction }) => {
  const [formData, setFormData] = useState({
    name: user.faculty ? `${user.faculty.firstName} ${user.faculty.lastName}` : "",
    department: user.faculty?.department || "",
    email: user.faculty?.email || "",
    biography: user.faculty?.biography || "",
    researchInterests: user.faculty?.researchInterests || [],
    areasOfExpertise: user.faculty?.areasOfExpertise || [],
  });

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState(null);

  const pathname = usePathname();


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // file changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setProfilePicture(imageUrl);
    }
  };


  return (
    <div className={styles.container}>
      {/* Conditionally rendering the instruction text */}
      {!hideInstruction && (
      <div className={styles.instructionContainer}>
        <p className={styles.instructionText}>
          Enter your information below to create an account.
        </p>
      </div>
      )}
      <div className={styles.formCard}>
        <div className={styles.avatarContainer}>
          <Avatar className="w-32 h-32">
            <AvatarImage
              src={profilePicture || "/default-profile.png"}
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
                department: formData.department,
                email: formData.email,
                biography: formData.biography,
                researchInterests: formData.researchInterests,
                areasofExpertise: formData.areasOfExpertise,
              },
            })
          }
        >
          <input
            className={styles.input}
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.name.split(" ")[0]}
            onChange={handleInputChange}
            required
          />


          <input
            className={styles.input}
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.name.split(" ")[1]}
            onChange={handleInputChange}
            required
          />

          <select
            className={styles.select}
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            required
          >
            <option value=""> Engineering Department </option>
            <option value="csen">Computer Science and Engineering</option>
            <option value="bioe">Bioengineering</option>
            <option value="mech">Mechanical Engineering</option>
            <option value="web">Web Design and Engineering</option>
            <option value="civil">Civil, Environmental, and Sustainable Engineering</option>
            <option value="ecen">Electrical and Computer Engineering</option>
            <option value="gen">General Engineering</option>
          </select>


          {/* biography portion */}
          <label className={styles.label}> Biography: </label>
          <textarea
            className={styles.textarea}
            name="biography"
            placeholder="Write a brief bio to introduce yourself to students."
            value={formData.biography}
            onChange={handleInputChange}
          />


        {/* research interests portion */}
          <label className={styles.label}> Research Interests: </label>
          <textarea
            className={styles.textarea}
            name="researchInterests"
            placeholder="Enter research interests"
            value={formData.researchInterests}
            onChange={handleInputChange}
          />


        {/* areas of expertise portion */}
          <label className={styles.label}> Areas of Expertise: </label>
          <textarea
            className={styles.textarea}
            name="areasOfExpertise"
            placeholder="Enter areas of expertise"
            value={formData.areasOfExpertise}
            onChange={handleInputChange}
          />


          <Button variant="custom">
            {pathname === "/my-team" ? "Update Profile" : "Create Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
};


//FacultyAccountForm.propTypes = {
  //user: PropTypes.object.isRequired,
  //userUpdate: PropTypes.func.isRequired,
//};


export default FacultyAccountForm;