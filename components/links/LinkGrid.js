import LinkGridCard from "./LinkGridCard";

function LinkGrid() {

  const links = [
    {
      title: "Missing Us?😥",
      description: "Here -> Glimpse Of US",
      link: "https://drive.google.com/drive/u/0/folders/1p5nukCUPDWMjrkTPRg5XNhmNSaDaur9H?q=sharedwith:public%20parent:1p5nukCUPDWMjrkTPRg5XNhmNSaDaur9H",
    },
    {
      title: "Feeling Down?",
      description: "Check What I Have For You Here.",
      link: "https://www.instagram.com/sahildd/saved/_/18291895132146426/?hl=en",
    },
    {
      title: "Am I Not Responding?",
      description: "Fuck Me Later, Here Is Mini Me",
      link: "https://chatgpt.com/share/673cdc11-8f60-8004-9d01-be2b30ebba29"
    }
  ]


  return <><div className="grid">
    {links.map(link => <LinkGridCard title={link.title} description={link.description} link={link.link} />)}
  </div>
    <style jsx>{`
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
        `}</style>
  </>
}

export default LinkGrid;