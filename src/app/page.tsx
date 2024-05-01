"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(4,"Name must have atleast 4 character"),
  email: z.string().email(),
  message: z.string(),
});

type FormData = z.infer<typeof schema>;


export default function Home() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
        className="w-full mx-auto max-w-4xl  h-fit p-[48px] flex flex-col gap-5"
      >
        <h1 className="text-center text-3xl">React Hook form</h1>
        <input
         {...register("name")}
          className="w-full py-4 px-3 rounded-lg focus:outline-none"
          type="text"
          placeholder="Name"
        />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}
        <input
          {...register("email")}
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
