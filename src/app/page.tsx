"use client";

import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "Usertest",
    },
  });
  //add default value

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "this Email is already taken",
      });
    }
  };

  return (
    <div className="w-screen h-screen bg-neutral-7600 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        // pass onSubmit as agrument handleSubmit function
        className="w-full mx-auto max-w-4xl  h-fit p-[48px] flex flex-col gap-5"
      >
        <h1 className="text-center text-3xl">React Hook form</h1>
        <input
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 4,
              message: " Name must havfe at least 4 characters",
            },
          })}
          className="w-full py-4 px-3 rounded-lg focus:outline-none"
          type="text"
          placeholder="Name"
        />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}
        <input
          {...register("email", {
            required: "Email is required",
            validate: (value) => {
              if (!value.includes("@")) {
                return "Email must include @";
              }
              return true;
            },
          })}
          className="w-full py-4 px-3 rounded-lg focus:outline-none"
          type="text"
          placeholder="Email"
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <textarea
          {...register("message", {
            required: true,
          })}
          className="w-full py-4 px-3 rounded-lg focus:outline-none"
          rows={5}
          placeholder="Message"
        />
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full py-4 px-3 rounded-lg bg-black text-white font-semibold focus:outline-none active:scale-90"
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}
