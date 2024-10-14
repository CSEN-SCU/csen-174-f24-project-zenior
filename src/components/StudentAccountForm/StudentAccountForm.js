"use client";

import { useState } from 'react';
import styles from '../../styles/StudentAccountForm.module.css';

const StudentAccountForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    major: '',
    minor: '',
    skills: ''
  });

  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.profilePicture}>
          <img src="/default-profile.png" alt="Profile" />
        </div>
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
          <input
            className={styles.input}
            type="text"
            name="minor"
            placeholder="Minor(s)"
            value={formData.minor}
            onChange={handleInputChange}
          />
          <input
            className={styles.input}
            type="text"
            name="skills"
            placeholder="Type your skills"
            value={formData.skills}
            onChange={handleInputChange}
          />
          <button className={styles.button} type="submit">Create Account</button>
        </form>
      </div>
      {!isLoggedIn && (
        <div className={styles.instructionContainer}>
          <p className={styles.instructionText}>
            Enter your information on the left to create an account
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentAccountForm;
