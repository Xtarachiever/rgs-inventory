import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { SignUpValidator } from "./auth-validator";
import { yupResolver } from "@hookform/resolvers/yup";

const SignUpHook = () => {
  const { 
    handleSubmit, 
    setValue, 
    formState, 
    watch } = useForm({
    resolver: yupResolver(SignUpValidator),
    mode: 'all',
    defaultValues: {
        firstName:"",
        lastName:"",
        email: "",
        password: "",
        confirmPassword:""
    },
  });

  const handleValueChange = (field, value) => {
    setValue(field, value);
  };

  const isSubmitting = useMemo(() => {
    return formState.isSubmitting;
  }, [formState]);

  const {firstName, lastName,email, password, confirmPassword} = watch();

  return {
    handleValueChange,
    handleSubmit,
    isSubmitting,
    email,
    password,
    firstName,
    lastName,
    confirmPassword,
    errors: formState.errors
  };
};

export default SignUpHook;