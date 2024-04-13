import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/images/logo.png"
          alt="No Logo Found"
          height="45"
          width="45"
          className="mx-auto w-auto"
        />
        <h2 className="mt-5 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <AuthForm />
      </div>
    </div>
  );
}
