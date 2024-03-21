import { z } from "astro/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useWeb3forms from "use-web3forms";
import { useState } from "react";

interface ContactFormInput {
  name: string;
  email: string;
  message: string;
}

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(5, "Message must be at least 5 characters long"),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  const [result, setResult] = useState<string>("");
  const [errorResult, setErrorResult] = useState<boolean>(false);

  const { submit } = useWeb3forms<ContactFormInput>({
    apikey: import.meta.env.PUBLIC_FORM_KEY,
    onSuccess: (msg) => {
      reset();
      setResult(msg);
    },
    onError: (msg) => {
      setErrorResult(true);
      setResult(msg);
    },
  });

  return (
    <div>
      <form className="space-y-3 mt-10" onSubmit={handleSubmit(submit)}>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="bg-zinc-900 rounded px-3 py-1 w-full outline-none placeholder:opacity-60 text-zinc-300"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500 opacity-80">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="bg-zinc-900 rounded px-3 py-1 w-full outline-none placeholder:opacity-60 text-zinc-300"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500 opacity-80">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <textarea
            placeholder="Message"
            rows={5}
            className="bg-zinc-900 rounded px-3 py-1 w-full outline-none placeholder:opacity-60 text-zinc-300"
            {...register("message")}
          ></textarea>
          {errors.message && (
            <p className="text-sm text-red-500 opacity-80">
              {errors.message.message}
            </p>
          )}
        </div>
        <button typeof="submit">Send message</button>
      </form>
      <p
        className={
          "mt-3 text-sm text-blue-500" + (errorResult && " !text-red-500")
        }
      >
        {result}
      </p>
    </div>
  );
};

export default ContactForm;
