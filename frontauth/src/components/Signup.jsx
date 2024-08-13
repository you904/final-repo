import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {signupUser,logoutUser} from '../routes/apiService'
import { useNavigation,useNavigate } from 'react-router-dom';
function Signup() {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
    const [selectedPicture, setSelectedPicture] = useState(null);
        const [downloadURL, setDownloadURL] = useState(null);
        const [bolo,setBolo] = useState(false)
        const handlePictureChange = (event) => {
          const file = event.target.files[0];
          setSelectedPicture(file);
          setBolo(true)
          // Optionally, you can preview the selected image here using FileReader
        };
       
  
  return (
    <div class="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-6 py-8">
    <div class="w-full max-w-md bg-slate-100 rounded-lg shadow-md dark:border dark:border-gray-700">
      <div class="p-6 md:p-8 space-y-4 md:space-y-6">
         <h1 className="text-xl text-center font-sans leading-tight tracking-tight text-black md:text-2xl dark:text-white">
              MessageNow
            </h1>
            <h1 className="text-sm text-center font-sans leading-tight tracking-tight text-black dark:text-white">
              Join MessageNow to Connect everywhere!
            </h1>
            <Formik
              initialValues={{ email: '', password: '', name: '', profileImage: null }}
              validationSchema={Yup.object({
                email: Yup.string().email('Entered Email is Invalid').required('Entered Email is Invalid'),
                password: Yup.string().min(8, 'Entered Password is Invalid').required('Entered Password is Invalid'),
                name: Yup.string().min(3, 'Entered Name is Invalid').required('Entered Name is Invalid'),
              })}
              onSubmit={(values) => {
                setName(values.name);
                setPassword(values.password);
                setEmail(values.email)
                signupUser(
                  { email, password,profileImg:selectedPicture,name}
                )
                   
              }}
            >
              {({ setFieldValue, errors, touched }) => (
                <Form className="space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <img
                        src={bolo ? URL.createObjectURL(selectedPicture) : 'https://via.placeholder.com/150/000000/FFFFFF/?text=User'}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handlePictureChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-sans text-black dark:text-white">
                      Your name
                    </label>
                    <Field
                      type="name"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Muhammad"
                    />
                    {errors.name && touched.name ? (
                      <label htmlFor="name" className="block mb-2 text-sm font-sans text-red-700 dark:text-white">
                        {errors.name}
                      </label>
                    ) : null}
                  </div>
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
                    {errors.email && touched.email ? (
                      <label htmlFor="email" className="block mb-2 text-sm font-sans text-red-700 dark:text-white">
                        {errors.email}
                      </label>
                    ) : null}
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
                    {errors.password && touched.password ? (
                      <label htmlFor="password" className="block mb-2 text-sm font-sans text-red-700 dark:text-white">
                        {errors.password}
                      </label>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-black dark:text-gray-300">Remember me</label>
                      </div>
                    </div>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" className="w-full text-black hover:bg-lime-300 bg-lime-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                </Form>
              )}
            </Formik>
            <p className="text-sm font-sans text-black dark:text-gray-400">
              Have an account? <a onClick={()=>navigate('/')} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
            </p>
        <button onClick={logoutUser} className='p-4 outline-none  rounded bg-pink-600 text-white font-sans'>Logout</button>
          </div>
        </div>
      </div>
   
  )
}

export default Signup;
