import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-muted/40 px-4">

      <div className="w-full max-w-md">

        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            StayFinder
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Sign in to continue booking your perfect stay
          </p>
        </div>

        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-white shadow-2xl rounded-2xl border border-gray-200",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              footer: "bg-white",
            },
          }}
        />

      </div>
    </div>
  );
};

export default Login;