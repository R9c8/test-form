import React from "react";

import styled from "styled-components"; 
import { TestForm } from "../../features/test-form/";

export const Main = () => (
  <FormBox>
    <TestForm />
  </FormBox>
)

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgb(20, 20, 20) 0px 0px 5rem;
  overflow: hidden;
  border-radius: 30px;
  padding: 50px 50px;
`;