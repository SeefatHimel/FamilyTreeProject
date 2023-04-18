type Props = {
  link: string;
};
const IntroSection = ({ link }: Props) => {
  return (
    <div className="m-4 hidden flex-col justify-between bg-blue-600 text-white lg:flex lg:max-w-sm lg:p-8 xl:max-w-lg xl:p-12">
      <div className="flex items-center justify-start space-x-3">
        {/* <span className="h-8 w-8 rounded-full bg-black"></span>
      <a href="#" className="text-xl font-medium">
        Tracker23
      </a> */}
        {/* <BSLogoWhiteSvg /> */}
        {/* <BSLogoSvg /> */}
      </div>
      <div className="space-y-5">
        <h1 className="font-extrabold text-sm lg:text-xl xl:text-3xl xl:leading-snug">
          Discover Your Family's Story. Create, Share & Connect with Family
          Atlas - Your Family Tree Website.
        </h1>
        <p className="text-lg">
          {link === "registration" ? "Don't " : "Already"} have an account?
        </p>
        <a
          href={`/${link}`}
          className="flex w-full flex-none items-center justify-center rounded-lg border-2 border-black bg-black px-3 py-2 font-medium text-white md:px-4 md:py-3"
        >
          {link === "registration" ? "Create account " : "Login "} here
        </a>
      </div>
      <p className="font-medium">© 2023 Family Atlas</p>
    </div>
  );
};

export default IntroSection;
