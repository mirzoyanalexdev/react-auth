import React, { FC, useContext }  from "react";
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { AuthContext } from "../../context/AuthContext";

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm: FC = () => {
    const { logIn } = useContext(AuthContext);

    const loginFormSchema = yup.object().shape({
      email: yup.string().email("Not valid email address").required("Field is required!"),
      password: yup.string().min(4, "Password must be 4-15").max(15, "Password must be 8-15 characters.").required("Field is required!")
    });
    
    const loginForm = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: loginFormSchema,
      onSubmit: (values: LoginFormValues) => {
        const token = uuidv4()
        logIn(token);
      },
    });

    const { values, handleSubmit, handleChange, errors, touched } = loginForm;
   
    return (
        <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <form className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
             Sign in
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                type="email"
                autoFocus
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
              {
                (touched.email && errors) && 
                <span className='text-red-600'>{errors.email}</span>
              }
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
                {
                  (touched.password && errors) && 
                  <span className='text-red-600'>{errors.password}</span>
                }
            </div>
            <div className="flex items-center justify-between">
                <button  
                  className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" 
                  type='submit'
                >
                  Sign In
                </button>
            </div>
          </form>
        </div>
      </div>
    )
}