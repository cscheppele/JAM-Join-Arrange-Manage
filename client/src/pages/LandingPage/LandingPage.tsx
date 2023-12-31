import LoginForm from "../../components/LandingDashboard/LoginForm";
import CreateUserForm from "../../components/LandingDashboard/CreateUserForm";
import { useState } from "react";
import { useIsLoggedIn } from "../../utils/useIsLoggedIn";
import { useLocation } from "react-router-dom";

const LandingPage = ({eventData}: any) => {
  const [loginFormActive, setLoginFormActive] = useState(false);
  const location = useLocation();
  const currentRoute = location.pathname;
  const isLoggedIn = useIsLoggedIn();
  const handleGetStartedClick = () => {
    setLoginFormActive(!loginFormActive);
  };
  return (
    <section
      className="flex flex-col md:flex-row overflow-y-hidden h-[calc(100vh-74px)]"
      id="hero"
    >
      <div className="grid max-w-screen-xl px-4 mx-auto my-auto xl:gap-0 lg:grid-cols-12 content-center">
        <div className="mx-auto md:ml-12 lg:col-span-7 flex flex-wrap content-center">
          {currentRoute === "/" ? (
            <>
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black">
                Join. Arrange. Manage.
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
                From splitting bills and organizing todos to planning all your
                events.
              </p>
            </>
          ) : (
            <>
            <h1 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-3xl">
              You were invited to <span className="text-pink-500">
                {eventData?.data.title}
                </span>.
            </h1>
            <h1 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-3xl">
            If you want to join, please log in.
            </h1>
            </>
          )}
          {!isLoggedIn ? (
            <button
              onClick={handleGetStartedClick}
              className="hidden lg:inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
            >
              Get started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          ) : null}
        </div>
        {!isLoggedIn ? (
          <div className={`lg:col-span-5 ${loginFormActive ? "active" : ""}`}>
            <div
              className={`login-form lg:flex lg:flex-col ${
                loginFormActive ? "active" : ""
              }`}
            >
              <LoginForm />
            </div>
            <div>
              <CreateUserForm />
            </div>
          </div>
        ) : (
          <div className="image-container lg:col-span-5 ">
            <img
            className="rounded-md"
              src="https://hips.hearstapps.com/hmg-prod/images/delish-190605-raspberry-jam-031-landscape-pf-1560443834.jpg?crop=0.888532477947073xw:1xh;center,top&resize=1200:*"
              alt="Your Image"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default LandingPage;
