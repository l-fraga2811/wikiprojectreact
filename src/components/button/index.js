import React from "react";
import { ButtonContainer } from "./styles";

export default function Button({onClick}) {
  return (
    <ButtonContainer onClick={onClick}>
      <h1>Buscar</h1>
    </ButtonContainer>
  );
}
