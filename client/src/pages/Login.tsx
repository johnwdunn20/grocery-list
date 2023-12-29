import React from 'react'
import { useNavigate } from 'react-router'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
}

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    // navigate('/');
    // navigate needs to happen after verifying authentication
  }


  return (
    <main className='h-screen flex flex-col justify-center items-center'>
      <h1 className="text-primaryBlue text-3xl font-semibold">Shopping List</h1>
      <h3>Some Subtitle</h3>
      <section className='flex flex-col justify-center items-center w-4/5 h-1/2 md:h-1/4 md:w-1/2 lg:w-1/4 border-1 border-primaryBlue rounded-xl bg-secondaryBlue'>
        <h1>Login</h1>
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          <input className='border' placeholder="johndoe@gmail.com" {...register("email"), { required: true }} />

          <input className='border' placeholder='password' {...register("password", { required: true, minLength: 8 })} />

          {/* errors will return when field validation fails  */}
          {errors.email && <span>This field is required</span>}

          <input type="button" value="Sign Up" />
          <input type="submit" value="Log In" />
        </form>
      </section>
    </main>
  )

}

export default Login