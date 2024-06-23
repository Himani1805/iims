import React from "react";
import ComboBox from "../../Components/ComboBox/ComboBox";
import ButtonSubmit from "../../Components/Button/ButtonSubmit";
import ButtonReset from "../../Components/Button/ButtonReset";

export default function Test() {
  // Style Object for css
  const btnSubmitStyle = {
    padding: "10px 40px",
    bg: "white",
    color: "black",
    bgHover: "teal",
    colorHover: "white",
    border: "1px",
    borderColor: "gray.500",
    radius: "2px",
  };

  const btnResetStyle = {
    padding: "10px 40px",
    bg: "white",
    color: "black",
    bgHover: "black",
    colorHover: "white",
    border: "1px",
    borderColor: "gray.500",
    radius: "2px",
  };

  function handleOnSave() {
    alert("Button Submit Clicked");
  }
  function handleOnReset() {
    alert("Button Reset Clicked");
  }
  return (
    <div>
      <ComboBox />
      <ButtonSubmit
        text="Submit"
        onSave={handleOnSave}
        style={btnSubmitStyle}
      />
      <ButtonReset text="Reset" onReset={handleOnReset} style={btnResetStyle} />
    </div>
  );
}
