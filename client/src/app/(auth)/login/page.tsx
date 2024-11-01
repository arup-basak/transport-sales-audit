"use client";

import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Input from "@/components/Input";
import validationSchema from "@/validation/login.validation";
import { toFormikValidate } from "zod-formik-adapter";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const initialValues = { email: "", password: "" };

  const handleSubmit = async (values: z.infer<typeof validationSchema>) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="max-w-lg w-full space-y-8 bg-white dark:bg-gray-800 p-12 rounded-lg shadow-lg">
      <div>
        <h1 className="mt-6 text-center text-xl font-semibold text-gray-900 dark:text-white">
          Login to your account
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
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-colors duration-200"
              >
                Sign in
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="text-center mt-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {`Don't have an account? `}
        </span>
        <Link
          href="/register"
          className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 focus:outline-none focus:underline transition-colors duration-200"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
