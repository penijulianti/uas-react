import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";

const SocialLinks = () => {
  const links = [
    {
      id: 1,
      child: (
        <>
           <FaLinkedin size={30} /> LinkedIn
        </>
      ),
      href: "https://www.linkedin.com/in/peni-julianti-a994b7220/",
      style: "rounded-tl-md",
    },
    {
      id: 2,
      child: (
        <>
           <FaGithub size={30} />GitHub
        </>
      ),
      href: "https://github.com/penijulianti",
    },
    {
      id: 3,
      child: (
        <>
           <BsFillPersonLinesFill size={30} /> Resume
        </>
      ),
      href: "/resume.pdf",
      style: "rounded-bl-md",
      download: true,
    },
  ];

  return (
    
    <div className="hidden sm:flex flex-col top-[40%] right-0 fixed">
      <ul>
        {links.map(({ id, child, href, style, download }) => (
          <li
            key={id}
            className={
              "flex justify-between items-center w-40 h-14 px-4 mr-[-100px] hover:ml-[-95px] hover:rounded-lg duration-150 bg-pink-300" +
              " " +
              style
            }
          >
            <a
              href={href}
              className="flex justify-between items-center w-full text-white"
              download={download}
              target="_blank"
              rel="noreferrer"
            >
              {child}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;