import { HiLocationMarker } from "react-icons/hi";

const AuraCard = () => {
  return (
    <div className="aura aura-dual">
      <div className="card card-side items-center gap-2 bg-base-100 px-3 py-1">
        <HiLocationMarker className="text-3xl text-theme-text" />
        <div className="flex flex-col leading-tight">
          <span className="text-2xl font-extrabold text-theme-text">
            FoundIt
          </span>
          <span className="hidden text-[10px] text-theme-text sm:block">
            مفقودات ومقتنيات الجامعة
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuraCard;
