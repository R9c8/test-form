import React from "react";
import { Form, Field } from "react-final-form";
import styled, { css } from "styled-components";
import { Input, Button } from "../../ui";

import { parsePhoneNumberFromString } from "libphonenumber-js";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const required = value => value ? undefined : 'Required.';

const isUsernamePattern = /[A-Z][A-Za-z]{3,}/;
const isUsername = value => isUsernamePattern.test(value) ? undefined : "Must be longer than 3 characters, only latin letters allowed, starts with capital letter.";

const isEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isEmail = value => isEmailPattern.test(String(value).toLowerCase()) ? undefined : "Must be valid e-mail.";

const isPhoneNumber = value => {
  const error = "Must be valid phone number.";
  const parsed = parsePhoneNumberFromString(value);
  if (parsed === undefined) {
    return error;
  } else {
    if (parsed.isValid) {
      return undefined;
    } else {
      return error;
    }
  }
}

const isPasswordPattern1 = /[a-zA-Z\d/!@/#/$/%/^/&/*/(/)/}/{/>/</>}]{7,}/;
const isPasswordPattern2 = /[\d]+/;
const isPasswordPattern3 = /[a-z]+/;
const isPasswordPattern4 = /[A-Z]+/;
const isPasswordPattern5 = /[/!@/#/$/%/^/&/*/(/)/}/{/>/</>}]*/;

const isPassword = value => {
  const error = "Password must be longer than 6 characters, must include digits, upper and lower case letters, may include special characters (!@#$%^&*()}{><>}) but must not include spaces or non-latin unicode characters.";
  if (
    isPasswordPattern1.test(value) &&
    isPasswordPattern2.test(value) &&
    isPasswordPattern3.test(value) &&
    isPasswordPattern4.test(value) &&
    isPasswordPattern5.test(value)
  ) {
      return undefined;
    } else {
      return error;
    }
}


const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const TestForm = () => (
  <Form
      onSubmit={onSubmit}
      validate={values => {
          const errors = {}
          if (!values.confirm) {
            errors.confirm = 'Required.';
          } else if (values.confirm !== values.password) {
            errors.confirm = 'Must match.';
          }
          return errors
        }
      }
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <CaptionBox>
            <CaptionImg src="/caption.png" />
          </CaptionBox>
          <div>
            <Field
              name="userName"
              validate={composeValidators(required, isUsername)}
            >
              {({ input, meta }) => (
                <>
                  <FieldBox>
                    <LabelBox>
                      <label>User Name</label>
                    </LabelBox>
                    <InputBox>
                      <Input {...input} type="text" error={meta.error && meta.touched} />
                    </InputBox>
                  </FieldBox>
                  {meta.error && meta.touched && <ErrorSpan>{meta.error}</ErrorSpan>}
                </>
              )}
            </Field>
          </div>
          <div>
            <Field
              name="eMail"
              validate={composeValidators(required, isEmail)}
            >
              {({ input, meta }) => (
                <>
                  <FieldBox>
                    <LabelBox>
                      <label>E-Mail</label>
                    </LabelBox>
                    <InputBox>
                      <Input {...input} type="text" error={meta.error && meta.touched} />
                    </InputBox>
                  </FieldBox>
                  {meta.error && meta.touched && <ErrorSpan>{meta.error}</ErrorSpan>}
                </>
              )}
            </Field>
          </div>
          <div>
            <Field
              name="phoneNumber"
              validate={composeValidators(required, isPhoneNumber)}
            >
              {({ input, meta }) => (
                <>
                  <FieldBox>
                    <LabelBox>
                      <label>Phone Number</label>
                    </LabelBox>
                    <InputBox>
                      <Input {...input} type="text" error={meta.error && meta.touched} />
                    </InputBox>
                  </FieldBox>
                  {meta.error && meta.touched && <ErrorSpan>{meta.error}</ErrorSpan>}
                </>
              )}
            </Field>
          </div>
          <div>
            <Field
              name="password"
              validate={composeValidators(required, isPassword)}
            >
              {({ input, meta }) => (
                <>
                  <FieldBox>
                    <LabelBox>
                      <label>Password</label>
                    </LabelBox>
                    <InputBox>
                      <Input {...input} type="password" error={meta.error && meta.touched} />
                    </InputBox>
                  </FieldBox>
                  {meta.error && meta.touched && <ErrorSpan>{meta.error}</ErrorSpan>}
                </>
              )}
            </Field>
          </div>
          <div>
            <Field
              name="confirm"
              validate={composeValidators(required)}
            >
              {({ input, meta }) => (
                <>
                  <FieldBox>
                    <LabelBox>
                      <label>Password Repeat</label>
                    </LabelBox>
                    <InputBox>
                      <Input {...input} type="password" error={meta.error && meta.touched} />
                    </InputBox>
                  </FieldBox>
                  {meta.error && meta.touched && <ErrorSpan>{meta.error}</ErrorSpan>}
                </>
              )}
            </Field>
          </div>
          <SubmitButtonBox>
            <Button type="submit" disabled={submitting}>
              Submit
            </Button>
          </SubmitButtonBox>
          <Pre>{JSON.stringify(values, 0, 2)}</Pre>
        </form>
      )}
    />
)

const FieldBox = styled.div`
  display: flex;
  width: 300px;
  margin-top: 10px;
`;

const InputBox = styled.div`
  display: flex;
  //margin-top: 10px;
  width: 170px;
  //${p => css`width: ${p.width};`}
`;

const LabelBox = styled.div`
  width: 130px;
  padding-top: 3px;
  ${p => css`width: ${p.width};`}
  display: inline-block;
`;

const SubmitButtonBox = styled.div`
  display: flex;
  margin: 30px 0 30px 0;
  justify-content: flex-end;
`;

const ErrorSpan = styled.p`
  width: 300px;
  color: red;
  font-size: 11px;
`;

const CaptionBox = styled.div`
  margin-bottom: 10px;
  width: 300px;
  height: 57px;
`;

const CaptionImg = styled.img`
  width: 300px;
  height: 57px;
`;

const Pre = styled.pre`
  background-color: #111;
  color: #AAA;
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
  min-height: 130px;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 0;
`;