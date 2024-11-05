"use client";

import { useState } from "react";
import styles from "@/styles/ProposalForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const ProposalForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectMem: "",
    projectAd: "",
    skills: [],
    //prereqs: [],
    //recs: [],
  });

  const majors = [
    { id: "bioe", label: "Bioengineering" },
    { id: "ceng", label: "Civil, Environmental, and Sustainable Engineering" },
    { id: "coen", label: "Computer Science and Engineering" },
    { id: "elen", label: "Electrical and Computer Engineering" },
    { id: "geng", label: "General Engineering" },
    { id: "mech", label: "Mechanical Engineering" },
  ];

  const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { items: ["coen"] },
  });

  const handleInputChange = (e) => {
    //setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid =
    formData.title.trim() !== "" &&
    formData.description !== "" &&
    formData.skills.length > 0;

  const [skillInput, setSkillInput] = useState(""); // track input for skills
  // const [prereqInput, setPrereqsInput] = useState("");
  // const[recsInput, setRecsInput] = useState("");

  // handle input for skills
  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  //const handlePrereqsInputChange = (e) => {
  //  setPrereqsInput(e.target.value);
  //};

  //const handleRecsInputChange = (e) => {
  //  setRecsInput(e.target.value);
  //};

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

  /*
  const handlePrereqsKeyDown = (e) => {
    if (e.key === "Enter" && prereqInput.trim() !== "") {
      e.preventDefault(); // prevent form submission
      setFormData({
        ...formData,
        prereqs: [...formData.prereqs, prereqInput.trim()],
      });
      setPrereqsInput(""); // clear the input after adding
    }
  };

  const handleRecKeyDown = (e) => {
    if (e.key === "Enter" && recsInput.trim() !== "") {
      e.preventDefault(); // prevent form submission
      setFormData({
        ...formData,
        recs: [...formData.recs, recsInput.trim()],
      });
      setRecsInput(""); // clear the input after adding
    }
  }; */

  // remove a skill with the 'x'
  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  /*
  const handleRemovePrereq = (prereqToRemove) => {
    setFormData({
      ...formData,
      prereqs: formData.prereqs.filter((prereq) => prereq !== prereqToRemove),
    });
  };

  const handleRemoveRec = (recToRemove) => {
    setFormData({
      ...formData,
      recs: formData.recs.filter((rec) => rec !== recToRemove),
    });
  };
  */
  //handle form submission
  const handleSubmit = (data) => {
    //send to server
    console.log("Form submitted", { ...formData, ...data });
    //route to new page
  };

  return (
    <FormProvider {...form}>
      <form className="my-2 mx-8 space-y-6" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-extrabold">Proposal Form</h1>
        <p>
          This form creates a SD project proposal, which will be shown on your
          profile. You may edit any of the fields, at any time
        </p>
        <div className="w-full">
          <div className="flex items-center mb-4 space-x-4">
            <label htmlFor="title" className="font-bold">
              Project Title<span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter project title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-1 w-1/2 px-3 py-2 ps-1 border focus:outline-none border-gray-300 rounded-md shadow-sm focus:ring-[#033B4C] focus:border-[#033B4C] sm:text-sm"
            ></input>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="font-bold">
              Project Description<span className="text-red-500"> *</span>
            </label>
            <textarea
              name="description"
              placeholder="Enter a brief description of your project. If applicable, please include any courses that are recommended to and/or required for students who join this project."
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              required
              className="block w-1/2 px-3 py-2 ps-1 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#033B4C] focus:border-[#033B4C] sm:text-sm"
            ></textarea>
          </div>

          <div className="flex items-center mb-4 space-x-4">
            <div>
              <label htmlFor="members" className="font-bold">
                Project Team Members
              </label>
              <aside className="w-48 text-xs">
                Add the names of people who you would like to request as members
                of this project. You may leave this section blank for now.
              </aside>
            </div>
            <div className="w-full max-w-sm min-w-[200px]">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-[#033B4C]-400 hover:border-[#033B4C]-300 shadow-sm focus:shadow"
                  placeholder="Type here..."
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="absolute top-2.5 right-2.5 w-5 h-5 text-slate-600"
                >
                  <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center mb-4 space-x-4">
            <div>
              <label htmlFor="advisor" className="font-bold">
                Project Advisor(s)
              </label>
              <aside className="w-48 text-xs">
                Add the names of a faculty member who you would like to request
                as an advisor for this project. You may leave this section blank
                for now.
              </aside>
            </div>
            <input
              type="text"
              className="w-96 pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-[#033B4C]-400 hover:border-[#033B4C]-300 shadow-sm focus:shadow"
              placeholder="Type here..."
            />
          </div>

          <div className="mb-4">
            <FormField
              control={form.control}
              name="majors"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base font-bold">
                      Departments
                    </FormLabel>
                    <FormDescription>
                      If this project is interdisciplinary, then what other
                      majors/departments (other than your own) will be involved?
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {majors.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex items-start space-x-3"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                        ...field.value,
                                        item.id,
                                      ])
                                      : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id,
                                        ),
                                      );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </div>
          <label className="font-bold">
            Desired Skillsets<span className="text-red-500"> *</span>
          </label>
          {/* Skills input box */}
          <div className="mb-4">
            <input
              className="mt-1 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#033B4C] focus:border-[#033B4C] sm:text-sm"
              type="text"
              name="skills"
              value={skillInput}
              onChange={handleSkillInputChange}
              onKeyDown={handleSkillKeyDown}
            />
          </div>

          {/* Skills list below the input */}
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <div key={index} className={styles.skillTag}>
                {skill}{" "}
                <span
                  onClick={() => handleRemoveSkill(skill)}
                  className={styles.removeSkill}
                >
                  {" "}
                  x{" "}
                </span>
              </div>
            ))}
          </div>

          {/* Prerequisit Courses */}
          {/*
          <div className="flex items-center mb-4 space-x-4">
            <div>
              <label htmlFor="prereqs" className="font-bold">
                Prerequisite Courses
              </label>
              <aside className="w-48 text-xs">
                If applicable, add course titles that are prerequisites to joining this project.
              </aside>
            </div>

            <div className="mb-4">
              <input
                className="mt-1 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#033B4C] focus:border-[#033B4C] sm:text-sm"
                type="text"
                name="prereqs"
                value={prereqInput}
                onChange={handlePrereqsInputChange}
                onKeyDown={handlePrereqsKeyDown}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.prereqs.map((prereq, index) => (
                <div key={index} className={styles.prereqsTag}>
                  {prereq}{" "}
                  <span
                    onClick={() => handleRemovePrereq(prereq)}
                    className={styles.removePrereq}
                  >
                    {" "}
                    x{" "}
                  </span>
                </div>
              ))}
            </div>
          </div>
          */}

          {/* Recommended Courses 
          <div className="flex items-center mb-4 space-x-4">
            <div>
              <label htmlFor="recs" className="font-bold">
                Recommended Course(s)
              </label>
              <aside className="w-48 text-xs">
                If applicable, add course titles that are recommended to project team members.</aside>
            </div>

            <div className="mb-4">
              <input
                className="mt-1 block w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#033B4C] focus:border-[#033B4C] sm:text-sm"
                type="text"
                name="recs"
                value={recsInput}
                onChange={handleRecsInputChange}
                onKeyDown={handleRecKeyDown}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.recs.map((rec, index) => (
                <div key={index} className={styles.recsTag}>
                  {rec}{" "}
                  <span
                    onClick={() => handleRemoveRec(rec)}
                    className={styles.removeRec}
                  >
                    {" "}
                    x{" "}
                  </span>
                </div>
              ))}
            </div>

          </div>
          */}
        </div>
      </form>
      <button
        type="submit"
        className="bg-[#b30738] text-white cursor-pointer py-2 px-4 m-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!isFormValid}
      >
        Create Project
      </button>
    </FormProvider>
  );
};
export default ProposalForm;
