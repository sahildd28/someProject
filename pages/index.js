import Head from "next/head";
import { useEffect, useState } from "react";
import { Moon, Sun, Bell } from "react-feather";
import confetti from "canvas-confetti"
// import Weather from "../components/weather/Weather";
import axios from "axios";
import Preloader from "../components/Preloader";
import LinkGrid from "../components/links/LinkGrid";
// import Footer from "../components/Footer";

export default function Home() {
  const [dark, setDark] = useState(true);
  const [days, setDays] = useState([undefined, undefined, undefined, undefined, undefined]);
  const [compliment, setCompliment] = useState("");
  const [showPopup, setShowPopup] = useState(false); 
  const [popupText, setPopupText] = useState("Here is your daily dose of BTW Nupur");
  const [showLoveText, setShowLoveText] = useState(false);

  useEffect(() => {
    setDark(window.localStorage.getItem("theme") === "dark");
    axios.get("/api/compliment").then((res) => {
      setCompliment(res.data.compliment)
    })
    // axios.get(`/api/weather`).then((res) => {
    //   setDays(res.data.days);
    // });
  }, []);

  if (compliment.length === 0) {
    return <Preloader dark={dark} />
  }
  const handleConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      startVelocity: 30,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#ff69b4", "#ff1493", "#ff4500", "#ffd700", "#1e90ff", "#7cfc00"],
    });
    setShowLoveText(true);
  };

  const togglePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  return (
    <div className={`container ${dark ? "dark" : ""}`}>
      <Head>
        <title>Our Space</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Hi, Nupur 🥧!</h1>

        <p className="description">Hope you're having a great day!</p>


        

        {/* Popup */}
        {/* {showPopup && (
          <div className="popup-overlay" onClick={() => setShowPopup(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <h2> BTW Nupur 😉</h2>
            </div>
          </div>
        )} */}
        {showPopup && (
        <div className="popup">
          <h1 className="popup-text">{popupText}</h1>
          {popupText === "Here is your daily dose of BTW Nupur" ? (
            <button            
              className="yes-button"
              onClick={() => setPopupText("I love you")}
            >
              ➡️ Yes
            </button>
          ) : (
            <div className="love-options">
              <button
                className="love-button"
                onClick={handleConfetti}
              >
                Do you love me?
              </button>
              <button
                className="love-button"
                onClick={handleConfetti}
              >
                Do you love me more?
              </button>
            </div>
          )}
        </div>
      )}

       {/* Display "I LOVE YOU TOO" text when confetti is triggered */}
      {showLoveText && (
        <div className="love-text">
          <h1>I LOVE YOU TOO</h1>
        </div>
      )}
        <div className="dailyDose">
          <Bell
            onClick={() => togglePopup(true)}
            className="bell-icon"
          />
          
          {dark ?
            <Sun
              onClick={() => {
                window.localStorage.setItem("theme", "light");
                setDark(false);
                
              }
            }
             className="theme-toggle"
            />
            : <Moon
              onClick={() => {
                window.localStorage.setItem("theme", "dark");
                setDark(true);
              }}
               className="theme-toggle"
            />
          }
     

        </div>
        <code className={`${dark ? "dark-code" : ""} compliment`}>
          Always Remember: {compliment}
        </code>

        {/* <Weather days={days} dark={dark} /> */}
        <LinkGrid dark={dark}/>
      </main>
      {/* <Footer dark={dark}/> */}
      <style jsx>{`
        .dark {
          background: #212121;
          color: white;
        }

        .dark-code {
          color: black;
        }
        
        code:hover,
        code:active,
        code:focus {
          color: #F687B3;
          border-color: #F687B3;
        }

        .dark-code:hover,
        .dark-code:active,
        .dark-code:focus {
          background: #ED64A6;
          border-color: #ED64A6;
          color: black;
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .compliment {
          cursor: pointer;
        }


        .toggle-container {
          padding-bottom: 25px;
        }

        main {
          padding: 2.5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .logo {
          height: 1em;
        }


           .dailyDose {
          margin: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

       .dailyDose {
  margin: 20px;
  display: flex; /* Flexbox to align items in a row */
  align-items: center; /* Vertically center items */
  gap: 10px; /* Add space between elements */
}

.bell-icon,
.theme-toggle {
  cursor: pointer;
  color: ${dark ? "white" : "#333"};
  transition: transform 0.2s;
}

.bell-icon:hover,
.theme-toggle:hover {
  transform: scale(1.2);
  color: #f687b3;
}

        .popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease-in-out;
  border: 5px solid;
  border-image-source: linear-gradient(
    90deg,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
  border-image-slice: 1;
  text-align: center;
}

.popup-text {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.yes-button {
  background: #f687b3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.yes-button:hover {
  background: #ed64a6;
}

.love-options {
  display: flex;
  justify-content: space-around;
  gap: 10px;
}
        
/* Popup Text Styling - Change color here */
  .popup-text {
    font-size: 24px;
    font-weight: bold;
    color: #333; /* Dark text color for better visibility */
  }
.love-button {
  background: #f687b3;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.love-button:hover {
  background: #ed64a6;
}
   .love-text {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    color: #ff69b4;
    font-size: 4rem;
    font-weight: bold;
    text-align: center;
    animation: loveTextFadeIn 2s ease-in-out, loveTextFadeOut 2s ease-in-out 2s forwards;
    opacity: 0;
  }

  /* Sexy animation for "I LOVE YOU TOO" */
  @keyframes loveTextFadeIn {
    0% {
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }

  /* Fade out after 3 seconds */
  @keyframes loveTextFadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -55%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}
      </style>
    </div>
  );
}

