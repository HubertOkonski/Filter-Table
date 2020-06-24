import React, { useState } from "react";
function Checkbox(props) {
  const [checked, setChecked] = useState(true);
  const handleChange = (e, branchName) => {
    let index = props.formData.branch.indexOf(branchName);
    let array = [...props.formData.branch];
    setChecked(!checked);
    if (index !== -1) {
      array.splice(index, 1);
      props.setFormData((prevState) => ({
        ...prevState,
        branch: array,
      }));
    } else array.push(branchName);
    props.setFormData((prevState) => ({
      ...prevState,
      branch: array,
    }));
  };
  return (
    <>
      <div className="control-group">
        <label className="control control-checkbox">
          {props.branch}
          <input
            type="checkbox"
            label={props.branch}
            name="check"
            checked={props.formData.branch.indexOf(props.branch) !== -1}
            id={props.branch}
            onChange={(e) => handleChange(e, props.branch)}
          />
          <div className="control_indicator"></div>
        </label>
      </div>
    </>
  );
}

export default Checkbox;
