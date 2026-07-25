import { useState } from "react";
import { toast } from "sonner";
import "../../css/profile/SkillsForm.css";

function SkillsForm() {

    const [skills, setSkills] = useState([
        {
            id: 1,
            name: "React.js",
            level: "Advanced",
            progress: 90,
        },
        {
            id: 2,
            name: "JavaScript",
            level: "Advanced",
            progress: 85,
        },
        {
            id: 3,
            name: "HTML",
            level: "Advanced",
            progress: 95,
        },
        {
            id: 4,
            name: "CSS",
            level: "Intermediate",
            progress: 75,
        },
    ]);

    const [skillName, setSkillName] = useState("");

    const [skillLevel, setSkillLevel] = useState("Beginner");

    const [progress, setProgress] = useState(50);

    const [editingId, setEditingId] = useState(null);

    const addSkill = () => {

       if (skillName.trim() === "") {
    toast.error("Please enter a skill.");
    return;
}

        const newSkill = {
            id: Date.now(),
            name: skillName,
            level: skillLevel,
            progress: 50,
        };

        setSkills([...skills, newSkill]);

        setSkillName("");

        setSkillLevel("Beginner");

    };

    const deleteSkill = (id) => {

        const updatedSkills = skills.filter((skill) => {

            return skill.id !== id;

        });

        setSkills(updatedSkills);

    };

    const editSkill = (skill) => {

        setSkillName(skill.name);

        setSkillLevel(skill.level);

        setProgress(skill.progress);

        setEditingId(skill.id);

    };

    const updateSkill = () => {

        const updatedSkills = skills.map((skill) => {

            if (skill.id === editingId) {

                return {

                    ...skill,

                    name: skillName,

                    level: skillLevel,

                    progress: progress,

                };

            }

            return skill;

        });

        setSkills(updatedSkills);

        setSkillName("");

        setSkillLevel("Beginner");

        setProgress(50);

        setEditingId(null);

    };

    return (
        <div className="skills-form">

            <div className="skills-header">
                <h2>Skills</h2>
                <p>Manage your technical skills</p>
            </div>

            <div className="add-skill">

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                />
                <p>{progress}%</p>

                <input
                    type="text"
                    placeholder="Enter Skill"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                />

                <select
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>

                <button onClick={editingId ? updateSkill : addSkill}>
                    {editingId ? "Update Skill" : "Add Skill"}
                </button>

            </div>


            <div className="skills-list">

                {skills.map((skill) => (

                    <div
                        className="skill-card"
                        key={skill.id}
                    >

                        <div className="skill-top">

                            <div>

                                <h3>{skill.name}</h3>

                                <span className="level">
                                    {skill.level}
                                </span>

                            </div>

                            <div className="skill-actions">

                                <button
                                    className="edit-btn"
                                    onClick={() => editSkill(skill)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => deleteSkill(skill.id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                        <div className="progress-bar">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${skill.progress}%`,
                                }}
                            ></div>

                        </div>

                        <p>{skill.progress}%</p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default SkillsForm;