"use client";

import { useState } from "react";
import styles from "@/styles/ProposalForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"

import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"

export function CheckboxReactHookFormMultiple() {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {items: ["coen"]},
    })
}

const ProposalForm = () => {
  const [formData, setFormData] = useState({
    projectTitle: "", 
    projectDesc: "",
    projectMem: "",
    projectAd: "",
    skills: []
  });

const majors=[
    {id: "bioe", label: "Bioengineering",},
    {id: "ceng", label: "Civil, Environmental, and Sustainable Engineering",},
    {id: "coen",label: "Computer Science and Engineering",},
    {id: "elen", label: "Electrical and Computer Engineering",},
    {id: "geng", label: "General Engineering",},
    {id: "mech", label: "Mechanical Engineering",}
];

const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {items: ["coen"]},
});

const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};
   
const [skillInput, setSkillInput] = useState("");// track input for skills
    
const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

// handle input for skills
const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
};

// add the skill to the list when "Enter" is pressed
const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
        e.preventDefault(); // prevent form submission
        setFormData({
            ...formData, skills: [...formData.skills, skillInput.trim()],
        });
        setSkillInput(""); // clear the input after adding
    }
};

// remove a skill with the 'x'
const handleRemoveSkill = (skillToRemove) => {
    setFormData({
        ...formData, skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
};

const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
};


return (
    <FormProvider {...form}>
     <form>
        <div className={styles.container}>
            <label htmlFor="title">Project Title</label>
            <input type="text" name="title" placeholder="Enter project title" value={formData.title} onChange={handleInputChange} required></input>
      
            <label htmlFor="descr">Project Description</label>
            <input type="textarea" name="descr" placeholder="Enter a brief description of your project" value={formData.descr} onChange={handleInputChange} required></input>

            <label htmlFor="members">Project Team Members</label>
            <aside>Add the namesm of people who have already agreed to be members of this project. You may leave this section blank for now.</aside>

            <label htmlFor="advisor">Project Advisor(s)</label>
            <aside>Add the names of a faculty member who has already agreed to be an advisor for this project. You may leave this section blank for now.</aside>

            <FormField control={form.control} name="majors" 
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">Interdisciplinary</FormLabel>
                            <FormDescription>If this project is interdisciplinary, then what other majors/departments (other than your own) will be involved?</FormDescription>
                        </div>
                        {majors.map((item) => (
                            <FormField
                                key={item.id}
                                control={form.control}
                                name="items"
                                render={({ field }) => {
                                    return (
                                        <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(item.id)}
                                                    onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...field.value, item.id])
                                                            : field.onChange(field.value?.filter((value) => value !== item.id))
                                                    }}/>
                                            </FormControl>
                                            <FormLabel className="font-normal">{item.label}</FormLabel>
                                        </FormItem>
                                    );
                                }}
                            />
                        ))}
                    </FormItem>
                )}/>
        
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
                            <span onClick={() => handleRemoveSkill(skill)} className={styles.removeSkill}> x </span>
                        </div>
                    ))}
                </div>

            </div>
        </form>
        </FormProvider>
    );
  };
export default ProposalForm;