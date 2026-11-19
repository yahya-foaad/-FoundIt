import { Link } from "react-router-dom";
import { FiSend, FiBox, FiArrowRight } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
const Buttons = () => {
  const actions = [
    {
      to: "/report",
      title: "تسجيل غرض معثور عليه",
      desc: "ساعد زملائك في إعادة أغراضهم",
      icon: FiBox,
      cardClass: "bg-primary/20 text-base-content hover:bg-primary/30",
      iconWrapClass: "bg-primary/30 text-base-content",
      descClass: "text-base-content/70",
    },
    {
      to: "/items",
      title: "المفقودات و المعثورات",
      desc: "نساعدك في استرجاع أغراضك المفقودة",
      icon: FiSend,
      cardClass: "bg-neutral text-neutral-content hover:opacity-90",
      iconWrapClass: "bg-white/10 text-neutral-content",
      descClass: "text-neutral-content/70",
    },
    {
      to: "/profile/MyReportPage",
      title: "ابلاغاتي ",
      desc: "تابع تطورات بلاغاتك بسهوله",
      icon: FiPlusCircle,
      cardClass: "bg-sky-700 text-neutral-content hover:opacity-90",
      iconWrapClass: "bg-white/10 text-neutral-content",
      descClass: "text-neutral-content/70",
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {actions.map(
        ({
          to,
          title,
          desc,
          icon: Icon,
          cardClass,
          iconWrapClass,
          descClass,
        }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-4 rounded-2xl p-4 shadow-sm transition md:p-5 ${cardClass}`}>
            <span
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full md:h-16 md:w-16 ${iconWrapClass}`}>
              <Icon className="text-2xl md:text-3xl" />
            </span>

            <span className="flex-1">
              <span className="block text-lg font-extrabold md:text-xl">
                {title}
              </span>
              <span className={`mt-1 block text-xs md:text-sm ${descClass}`}>
                {desc}
              </span>
            </span>

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content">
              <FiArrowRight className="text-xl" />
            </span>
          </Link>
        ),
      )}
    </div>
  );
};

export default Buttons;
