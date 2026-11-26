import { HiLocationMarker } from "react-icons/hi";

const AuraCard = () => {
  return (
    <div className="aura aura-dual">
      <div className="card card-side items-center gap-2 bg-base-100 px-3 py-1">
        <HiLocationMarker className="text-3xl text-yellow-400" />
        <div className="flex flex-col leading-tight">
          <span className="font-['Cairo'] text-3xl text-black in-data-[theme=night]:text-sky-400">
            FoundIt
          </span>
          <span className="font-['Cairo'] hidden text-[10px] font-bold text-black in-data-[theme=night]:text-sky-400 sm:block">
            مفقودات ومقتنيات الجامعة
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuraCard;
