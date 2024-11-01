"use client";

import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Input from "@/components/Input";
import { toFormikValidate } from "zod-formik-adapter";
import { useAuth } from "@/hooks/useAuth";

const validationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: z.infer<typeof validationSchema>) => {
    try {
      await register(values.name, values.email, values.password);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="max-w-lg w-full space-y-8 bg-white dark:bg-gray-800 p-12 rounded-lg shadow-lg">
      <div>
        <h1 className="mt-6 text-center text-xl font-semibold text-gray-900 dark:text-white">
          Create your account
        </h1>
      </div>
      <Formik
        initialValues={initialValues}
        validate={toFormikValidate(validationSchema)}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="mt-6 space-y-6">
            <div className="space-y-4">
              <Field
                as={Input}
                name="name"
                label="Name"
                id="name"
                error={errors.name}
                touched={touched.name}
              />

              <Field
                as={Input}
                name="email"
                label="Email"
                id="email"
                error={errors.email}
                touched={touched.email}
              />

              <Field
                as={Input}
                name="password"
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                error={errors.password}
                touched={touched.password}
                showPasswordToggle
                showPassword={showPassword}
                onPasswordToggle={() => setShowPassword(!showPassword)}
              />

              <Field
                as={Input}
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                showPasswordToggle
                showPassword={showPassword}
                onPasswordToggle={() => setShowPassword(!showPassword)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-colors duration-200"
              >
                Sign up
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="text-center mt-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
        </span>
        <button
          onClick={() => router.push("/login")}
          className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 focus:outline-none focus:underline transition-colors duration-200"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
