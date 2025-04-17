import { useState } from "react";
import { fetchGitHubUser } from "./gitHubService.js";

function FinderProfiel() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setIsButtonDisabled(true);
  
    try {
      const data = await fetchGitHubUser(username);
      setUserData(data);
      setError(""); 
    } catch (e) {
      setUserData(null); 
      setError("Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente");
    }
  
    setLoading(false);
    setIsButtonDisabled(false);
  };
  

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="2xl:w-[35%] 2xl:h-[70px] lg:w-[53%] lg:h-[50px] w-[95%] h-[40px] m-auto relative mt-[70px]">
        <input
          className="w-full h-full placeholder:text-black 2xl:placeholder:text-[23px] 2xl:text-[23px] lg:text-[18px] font-nunito font-semibold rounded-md pl-4 pr-16"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite um usuário do Github"
        />
        {loading && (
          <button className="absolute bg-[#005CFF] h-full w-[62px] rounded-md top-0 right-0 flex items-center justify-center">
            <svg
              className="h-full w-[40px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
            >
              <radialGradient
                id="a12"
                cx=".66"
                fx=".66"
                cy=".3125"
                fy=".3125"
                gradientTransform="scale(1.5)"
              >
                <stop offset="0" stop-color="#FFFFFF"></stop>
                <stop offset=".3" stop-color="#FFFFFF" stop-opacity=".9"></stop>
                <stop offset=".6" stop-color="#FFFFFF" stop-opacity=".6"></stop>
                <stop offset=".8" stop-color="#FFFFFF" stop-opacity=".3"></stop>
                <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"></stop>
              </radialGradient>
              <circle
                transform-origin="center"
                fill="none"
                stroke="url(#a12)"
                stroke-width="15"
                stroke-linecap="round"
                stroke-dasharray="200 1000"
                stroke-dashoffset="0"
                cx="100"
                cy="100"
                r="70"
              >
                <animateTransform
                  type="rotate"
                  attributeName="transform"
                  calcMode="spline"
                  dur="2"
                  values="360;0"
                  keyTimes="0;1"
                  keySplines="0 0 1 1"
                  repeatCount="indefinite"
                ></animateTransform>
              </circle>
              <circle
                transform-origin="center"
                fill="none"
                opacity=".2"
                stroke="#FFFFFF"
                stroke-width="15"
                stroke-linecap="round"
                cx="100"
                cy="100"
                r="70"
              ></circle>
            </svg>
          </button>
        )}
        {!loading && (
          <button
            onClick={handleSearch}
            disabled={isButtonDisabled}
            className="absolute bg-[#005CFF] h-full 2xl:w-[72px] lg:w-[60px] w-[55px] rounded-md top-0 right-0 flex items-center justify-center"
          >
            <svg
              className="2xl:w-[30px] 2xl:h-[30px] lg:w-[25px] lg:h-[25px] w-[20px] h-[20px]"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1817 0C11.631 0.0643066 12.0835 0.111279 12.529 0.195898C14.6936 0.607031 16.5464 1.61221 18.0885 3.17886C19.4914 4.60405 20.4188 6.29736 20.817 8.26108C21.3175 10.7295 20.9722 13.0835 19.7351 15.2809C19.3389 15.9848 18.8377 16.6298 18.3847 17.3017C18.3419 17.3178 18.2992 17.3339 18.2564 17.35C18.3369 17.3915 18.4335 17.4163 18.4953 17.4768C20.5444 19.4878 22.5918 21.5007 24.6333 23.5194C24.7792 23.6636 24.8788 23.8543 25 24.0234V24.3652C24.8936 24.6819 24.6756 24.8872 24.3652 25H24.0234C23.8267 24.8615 23.6065 24.7469 23.4368 24.5808C21.3896 22.5771 19.35 20.5657 17.3082 18.5565C17.2566 18.5059 17.2025 18.4579 17.1398 18.3995C17.0692 18.4477 17.0014 18.4896 16.9383 18.5377C15.5811 19.5722 14.0595 20.2468 12.3818 20.5327C9.87446 20.9599 7.48838 20.5855 5.27173 19.3094C2.96553 17.9817 1.36572 16.06 0.509717 13.5335C0.255859 12.7841 0.10127 12.0118 0.0422363 11.2213C0.0375977 11.1585 0.0145508 11.0972 0 11.0352V9.66797C0.0149414 9.59766 0.0336426 9.52793 0.0441895 9.45698C0.105029 9.04746 0.141992 8.63296 0.227295 8.22866C0.635547 6.2939 1.54116 4.61934 2.92188 3.20737C4.47202 1.62222 6.33569 0.606836 8.51855 0.194238C8.94736 0.113135 9.38232 0.063916 9.8145 0H11.1817ZM1.61445 10.2985C1.63369 10.6609 1.63267 10.9635 1.66826 11.2618C1.89365 13.1501 2.61221 14.8245 3.92432 16.21C6.22021 18.6342 9.05664 19.5454 12.307 18.9131C15.1566 18.3587 17.2862 16.7189 18.5484 14.0819C19.8208 11.424 19.7434 8.7374 18.3187 6.16904C16.8584 3.53643 14.5546 2.03594 11.5669 1.66851C9.20781 1.37832 7.03818 1.95239 5.13687 3.39321C2.83711 5.13604 1.69321 7.48369 1.61445 10.2985Z"
                fill="white"
              />
            </svg>
          </button>
        )}
      </div>

      {error && (
        <div className="bg-[#D9D9D9] mt-10 p-2 2xl:w-[45%] lg:w-[70%] w-[95%] h-[88px] font-nunito font-normal 2xl:text-[22px] lg:text-[18px] text-[16px] text-[#FF0000] text-center m-auto rounded-3xl flex items-center justify-center leading-6">
          <p className="w-[497px] h-[47px]">
            Nenhum perfil foi encontrado com esse nome de usuário. Tente
            novamente
          </p>
        </div>
      )}

      {userData && (
        <div
          className="2xl:w-[52%] 2xl:h-[300px] lg:w-[70%] lg:h-[200px] w-[95%] h-auto  bg-[#D9D9D9] rounded-3xl 2xl:flex md:flex items-center justify-around m-auto px-10 max-[480px]:py-6 mt-10"
        >
          <div className="w-full max-[500px]:w-[95%] h-auto 2xl:flex lg:flex items-center">
            <div className="max-[480px]:m-auto">
              <div className="2xl:w-64 2xl:h-64 lg:w-40 lg:h-40 w-40 h-40 2xl:border-[3px] border-[2px] border-[#005CFF] rounded-full overflow-hidden flex items-center justify-center m-auto">
                <img
                  className="w-full h-full object-cover"
                  src={userData.avatarUrl}
                  alt="Avatar"
                />
              </div>
            </div>
            <div className="font-nunito 2xl:mb-10 2xl:ml-6 lg:ml-4">
              <h2 className=" font-bold 2xl:text-[25px] text-[20px] text-[#005CFF] 2xl:mb-5 mb-3 max-[480px]:text-center">
                {userData.name}
              </h2>
              <p className="font-light 2xl:text-[20px] text-[16px] max-[480px]:text-center max-[480px]:w-[98%] max-[480px]:m-auto">
                {userData.bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default FinderProfiel;
