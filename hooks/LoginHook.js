import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { LoginValidator } from "./auth-validator";
import { yupResolver } from "@hookform/resolvers/yup";

const LoginHook = () => {
  const { 
    handleSubmit, 
    setValue, 
    formState, 
    watch } = useForm({
    resolver: yupResolver(LoginValidator),
    mode: 'all',
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleValueChange = (field, value) => {
    setValue(field, value);
  };

  const isSubmitting = useMemo(() => {
    return formState.isSubmitting;
  }, [formState]);

  const {email, password} = watch();

  return {
    handleValueChange,
    handleSubmit,
    isSubmitting,
    email,
    password,
    errors: formState.errors
  };
};

export default LoginHook;