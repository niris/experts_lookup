import React, { useState, useEffect, useRef, useImperativeHandle } from "react";

const SkillsList = React.forwardRef(
  ({ skills, isModifiable, type }, ref) => {
    const [initialSkills, setInitialSkills] = useState(skills);

    useEffect(() => {
      setInitialSkills(skills);
    }, [skills]);

    const handleSkillChange = (e, index) => {
      const newSkills = [...initialSkills];
      newSkills[index] = e.target.value;
      setInitialSkills(newSkills);
    };

    const handleAddSkill = () => {
      setInitialSkills((prevSkills) => [...prevSkills, ""]);
    };

    function handleDeleteSkill(index) {
      const updatedSkills = [...initialSkills];
      updatedSkills.splice(index, 1);
      setInitialSkills(updatedSkills);
    }

    useImperativeHandle(ref, () => ({
      getSkills: () => initialSkills,
    }));

    return (
      <div>
        {initialSkills.map((skill, index) => (
          <div className="row" key={index}>
            <input
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(e, index)}
              required
              className="col"
              readOnly={!isModifiable}
            />
            {isModifiable && (
              <button
                type="button"
                className="col-1 button clear text-error icon-only"
                onClick={() => handleDeleteSkill(index)}
              >
                <i className="material-icons">delete</i>
              </button>
            )}
          </div>
        ))}
        {isModifiable && (
          <div className="is-center">
            <button
              type="button"
              className="button clear secondary"
              onClick={handleAddSkill}
            >
              <i className="material-icons">add_circle_outline</i> 
            </button>
          </div>
        )}
      </div>
    );
  }
);

export default SkillsList;
