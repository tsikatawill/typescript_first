import { FC } from "react";

type Props = {
  darkMode: boolean;
  setDarkMode: any;
};

const DarkModeToggle: FC<Props> = ({ darkMode, setDarkMode }) => {
  return (
    <div
      className="dark-toggle fixed bottom-5 right-5 cursor-pointer bg-blue-500 text-white rounded-full text-2xl font-bold h-20 w-20 grid place-content-center"
      onClick={() => {
        setDarkMode(!darkMode);
      }}
    >
      Dark
    </div>
  );
};

export default DarkModeToggle;
