import CreatCard from "./Cards/CreatCard";
import logoImg from "../../media/1793810251498.jpg";
import logoDarkImg from "../../media/Gemini_Generated_Image_azr16mazr16mazr1.jpg";
import loginBgImg from "../../media/1793031884399.jpg";
const SignupPage = () => {
  return (
    <div className="w-full h-screen flex items-center md:h-screen md:overflow-hidden">
      {/* القسم الأيسر: الصورة */}
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          className="h-full w-full object-cover mask-radial-[100%_100%] mask-radial-from-80% mask-radial-at-left"
          src={loginBgImg}
          alt="Login illustration"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-4 px-4 py-8">
        {/* لوجو الوضع الفاتح */}
        <img
          src={logoImg}
          alt="FoundIt"
          className="md:hidden h-32 sm:h-40 w-auto mix-blend-multiply in-data-[theme=night]:hidden"
        />

        {/* لوجو الدارك مود */}
        <img
          src={logoDarkImg}
          alt="FoundIt"
          className="hidden h-32 sm:h-40 w-auto in-data-[theme=night]:block md:in-data-[theme=night]:hidden"
        />

        <CreatCard />
      </div>
    </div>
  );
};

export default SignupPage;
