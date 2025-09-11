import Link from "next/link";

interface AgilityLinkProps {
  url: string;
  target?: string;
  text: string;
  className?: string;
  "data-agility-field"?: string;
}
const DEFAULT_CLASSES = "inline-block mt-8 px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-500 hover:bg-primary-700 dark:bg-primary-400 dark:hover:bg-primary-600 focus:outline-hidden focus:border-primary-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150";

const AgilityLink = ({
  url,
  target = "_self",
  text,
  className = DEFAULT_CLASSES,
  "data-agility-field": dataAgilityField,
}: AgilityLinkProps) => {
  /**
   * Returns true if the given URL is absolute, false otherwise.
   * A URL is considered absolute if it contains a colon (:)
   * or if it starts with a double forward-slash (//).
   * @param {string} url
   * @returns {boolean}
   */
  const isUrlAbsolute = (url: string) =>
    url.indexOf("://") > 0 || url.indexOf("//") === 0;

  const commonProps = {
    href: url,
    target,
    title: text,
    className,
    "data-agility-field": dataAgilityField,
  };

  return isUrlAbsolute(url) ? (
    <a {...commonProps}>{text}</a>
  ) : (
    <Link {...commonProps}>{text}</Link>
  );
};

export default AgilityLink;
