const Banner = () => {
  return (
    <div className="bg-base-200 pb-6">
      {/* البانر */}
      <section className="relative w-full overflow-hidden bg-linear-to-l from-primary/20 via-base-100 to-primary/10 md:min-h-[380px]">
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center p-6 md:min-h-[380px] md:p-10">
          <div className="md:max-w-lg">
            <h1 className="text-3xl font-extrabold leading-tight text-base-content md:text-6xl">
              ضاع منك حاجة؟
              <span className="block text-primary">خلينا نرجعها لك</span>
            </h1>
            <p className="mt-4 text-sm leading-8 text-base-content/70 md:text-lg">
              منصة طلابية للإبلاغ عن المفقودات والمعثرات في الجامعة، ومساعدة
              زملائك في استرجاع أغراضهم.
            </p>
          </div>
        </div>

        <img
          src="/images/770a083a-5515-4b5a-ac38-73201fc5ed89.png"
          alt=""
          className="absolute left-0 top-0 hidden h-full w-1/2 object-cover md:block"
          style={{
            maskImage: "linear-gradient(to left, black 60%, transparent)",
            WebkitMaskImage: "linear-gradient(to left, black 60%, transparent)",
            transform: "scaleX(-1)",
          }}
        />
      </section>
    </div>
  );
};

export default Banner;
