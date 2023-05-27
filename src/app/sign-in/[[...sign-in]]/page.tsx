import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="fixed inset-0 bg-white grid place-items-center">
      <SignIn />
    </div>
  );
}
