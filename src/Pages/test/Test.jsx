import React from "react";
import ComboBox from "../../Components/ComboBox/ComboBox";
import ButtonSubmit from "../../Components/Button/ButtonSubmit";

export default function Test() {
  function handleOnSave() {
    alert("button Clicked");
  }
  return (
    <div>
      <ComboBox />
      <ButtonSubmit
        text="Submit"
        onSave={handleOnSave}
        pad="10px 40px"
        color="white"
        bg="blue"
        bgHover="red"
        radius={"2px"}
      />
    </div>
  );
}
