// components/common/Button.tsx
interface ButtonProps {
  text: string;
  url?: string;
  target?: string;
  className?: string;
}

const Button = ({ text, url = "#", target = "_self", className = "" }: ButtonProps) => {
  return (
    <a
      href={url}
      target={target}
      className={`inline-block mt-8 px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-500 hover:bg-primary-700 dark:bg-primary-400 dark:hover:bg-primary-600 focus:outline-hidden focus:border-primary-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150 ${className}`}
    >
      {text}
    </a>
  );
};

export default Button;
