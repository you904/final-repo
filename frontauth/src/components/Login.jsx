import React,{useState} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigation ,useNavigate} from 'react-router-dom';

import {loginUser} from '../routes/apiService'
function Login() {
  const navigate = useNavigate()
  const [error,setError]= useState('')
  const [errorhid,setErrorHid]= useState(false)
  const signin = (email, password) => {
    const credentials = { email, password };
    loginUser(credentials).then((response) => {
        setErrorHid(true);
        console.log(response);
        if (response.success) {
            // Redirect the user to the home page
            window.location.href = response.redirectUrl || '/home';
        }
    }).catch((err) => {
        console.log(err.message);
        setError("Invalid User Credentials");
        setErrorHid(true);
    });
};
  return (
    <div class="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-6 py-8">
    <div class="w-full max-w-md bg-slate-100 rounded-lg shadow-md dark:border dark:border-gray-700">
      <div class="p-6 md:p-8 space-y-4 md:space-y-6">
        <h1 class="text-xl text-center font-sans leading-tight tracking-tight text-black md:text-2xl dark:text-white">
          MessageNow
        </h1>
        <h2 class="text-sm text-center font-sans leading-tight tracking-tight text-black dark:text-white">
          We're excited to see you again!
        </h2>
  
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
          })}
          onSubmit={async(values) => {
            // console.log({
            //   email: values.email,
            //   password: values.password,
            // });
            signin(values.email, values.password);
            // navigate('/home')
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-sans text-black dark:text-white">
                  Your email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                {errors.email && touched.email && (
                  <div className="block mb-2 text-sm font-sans text-red-700 dark:text-white">
                    {errors.email}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-sans text-black dark:text-white">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && touched.password && (
                  <div className="block mb-2 text-sm font-sans text-red-700 dark:text-white">
                    {errors.password}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Field
                      type="checkbox"
                      id="remember"
                      name="remember"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <label htmlFor="remember" className="ml-3 text-sm text-black dark:text-gray-300">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <h1 className={`text-red-600 ${errorhid?"":"hidden"} text-center font-bold`}>{error}</h1>
              <button type="submit" className="w-full text-black hover:bg-lime-300 bg-lime-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Sign in
              </button>
            </Form>
          )}
        </Formik>
  
        <p class="text-sm font-light text-black dark:text-gray-400">
          Don’t have an account yet? <a onClick={()=>navigate('/auth/Signup')}  class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
        </p>
  
      </div>
    </div>
  </div>
  
  )
}

export default Login
