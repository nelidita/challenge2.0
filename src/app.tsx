import { Panel } from "primereact/panel";
import { ContactList } from "./pages/contactList.page";
import Rocket from "./assets/rocket.svg";
import Gmail from "./assets/gmail.png";
import Linkedin from "./assets/linkedin.png";
import Github from "./assets/github.png";
import Separator from "./assets/separator.svg";

export const App = () => {
  const templateHeader = (
    <section className="flex flex-row gap-x-2 items-center">
      <figure className="w-8">
        <img src={Rocket} alt="rocket" />
      </figure>
      <h1>Challenge 2.0</h1>
    </section>
  );

  const templateFooter = (
    <section className="flex flex-col gap-y-1 items-center p-4 bg-gradient-to-r from-cyan-100 to-blue-200">
      <figure className="flex flex-row gap-x-4 z-50">
        <a
          href="mailto:nelidavalero06@gmail.com"
          target="_blank"
          className="cursor-pointer"
        >
          <img src={Gmail} alt="Gmail" className="w-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/nelidavalero/"
          target="_blank"
          className="cursor-pointer"
        >
          <img src={Linkedin} alt="Linkedin" className="w-6" />
        </a>
        <a
          href="https://github.com/nelidita"
          target="_blank"
          className="cursor-pointer"
        >
          <img src={Github} alt="Github" className="w-6" />
        </a>
      </figure>
      <figure className="w-48 -mt-8">
        <img src={Separator} alt="separator" />
      </figure>
      <small>© 2023 Made By Nélida</small>
    </section>
  );

  return (
    <div className="flex justify-center">
      <Panel
        header={templateHeader}
        footer={templateFooter}
        className="flex flex-col justify-between h-screen w-full bg-cover bg-center bg-burst"
      >
        <ContactList />
      </Panel>
    </div>
  );
};
