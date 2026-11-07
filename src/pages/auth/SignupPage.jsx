import CreatCard from "./Cards/CreatCard";

const SignupPage = () => {
  return (
    <div className="w-full h-screen flex items-center md:h-screen md:overflow-hidden">
      {/* القسم الأيسر: الصورة */}
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          className="h-full w-full object-cover mask-radial-[100%_100%] mask-radial-from-80% mask-radial-at-left"
          src="src/media/1793031884399.jpg"
          alt="Login illustration"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-4 px-4 py-8">
        <img
          src="src/media/1793810251498.jpg"
          alt="FoundIt"
          className="md:hidden h-32 sm:h-40 w-auto mix-blend-multiply"
        />
        <CreatCard />
      </div>
    </div>
  );
};

export default SignupPage;
