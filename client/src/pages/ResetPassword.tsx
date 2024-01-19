import React from 'react'
import { useNavigate } from 'react-router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'

type Inputs = {
  email: string
}

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
    }
  })
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log(data)
    // need to send an email
  }

  // console.log('Errors: ', errors);
  // console.log(watch("email"));

  return (
    <main className='h-screen flex flex-col justify-center items-center bg-primaryBlue'>
      <div className='mb-10'>
        <h1 className="text-white text-5xl font-bold">Shopping List</h1>
        <h3 className='text-white text-lg'>Sorts your groceries by aisle</h3>
      </div>
      <section className='flex flex-col justify-center items-center w-full md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4 max-w-screen-sm mx-auto border-1 border-slate-400 rounded-xl bg-background shadow-xl p-5'>
        <h1 className='text-2xl font-semibold mb-5 text-slate-700'>Reset Password</h1>
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col border-2 m-2 p-2'>
            <input className='h-8 w-full' placeholder="Email" {...register("email",
            {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email must be valid'
              }
            }
            )} />
            {errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
          </div>

          <div>
            <p className='text-slate-500'>We will send you an email to reset your password</p>
            <h1 className='text-red-500 text-xl'>Coming Soon</h1>
            <p className='text-red-500'>Email johnwdunn20@gmail.com if you forgot your password</p>
          </div>

          <div className='flex justify-center mt-5'>
            <button type="submit" className='bg-blue-500 hover:bg-blue-700 w-3/4 h-12 text-white font-bold py-2 px-4 rounded'>
              Reset
            </button>
          </div>
          <div className='flex justify-center m-4'>
            <p className='text-slate-500'>Back to <Link to='/login' className='text-blue-500 hover:text-blue-700 hover:cursor-pointer'>Login</Link></p>
          </div>
        </form>
      </section>
    </main>
  )

}

export default Login