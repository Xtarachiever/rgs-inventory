import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { confirmPasswordValidator } from "./auth-validator";
import { yupResolver } from "@hookform/resolvers/yup";

const ConfirmPasswordHook = () => {
  const { 
    handleSubmit, 
    setValue, 
    formState, 
    watch } = useForm({
    resolver: yupResolver(confirmPasswordValidator),
    mode: 'all',
    defaultValues: {
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

  const {confirmPassword, password} = watch();

  return {
    handleValueChange,
    handleSubmit,
    isSubmitting,
    confirmPassword,
    password,
    errors: formState.errors
  };
};

export default ConfirmPasswordHook;