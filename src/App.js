// import React, { useState, useRef, useEffect } from "react";
// import Webcam from "react-webcam";
// import Background from "./background"; // Corrected import statement
// import axios from "axios";
// import "./background.css"; // Import CSS for Background component
// import "./App.css";

// const WebcamCapture = () => {
//   const webcamRef = useRef(null);
//   const [predictedText, setPredictedText] = useState("");
//   const [isSendingRequests, setIsSendingRequests] = useState(false);
//   const [requestStatus, setRequestStatus] = useState("Stopped");
//   const timerIdRef = useRef(null);
//   const lastPredictionRef = useRef("");
//   const consecutiveSamePredictionCountRef = useRef(0);
//   const [appendedText, setAppendedText] = useState(""); // New state to track appended text

//   useEffect(() => {
//     const sendRequest = async () => {
//       const imageSrc = webcamRef.current.getScreenshot();
//       try {
//         const response = await axios({
//           method: "POST",
//           url: "https://detect.roboflow.com/american-sign-language-letters/6",
//           params: {
//             api_key: "wOW2ZQ8RhA8ydGNR6IkB",
//           },
//           data: imageSrc.replace(/^data:image\/(png|jpg);base64,/, ""),
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         });

//         const predictions = response.data.predictions;
//         if (predictions.length > 0) {
//           const highestConfidencePrediction = predictions.reduce(
//             (prev, current) =>
//               prev.confidence > current.confidence ? prev : current
//           );

//           const currentPrediction = highestConfidencePrediction.class;

//           if (currentPrediction === lastPredictionRef.current) {
//             consecutiveSamePredictionCountRef.current++;
//             if (consecutiveSamePredictionCountRef.current >= 2) {
//               setAppendedText((prevText) => prevText + currentPrediction); // Append predicted text
//             }
//           } else {
//             lastPredictionRef.current = currentPrediction;
//             consecutiveSamePredictionCountRef.current = 1;
//           }

//           setPredictedText(currentPrediction); // Update predicted text
//           setRequestStatus("Sending Requests");
//         } else {
//           setRequestStatus("No Predictions");
//         }
//       } catch (error) {
//         console.error("Error making the prediction:", error);
//         setRequestStatus("Error making the prediction");
//       }

//       timerIdRef.current = setTimeout(sendRequest, 1500); // Send a request every 1500 milliseconds
//     };

//     const startRequests = () => {
//       setIsSendingRequests(true);
//       setRequestStatus("Sending Requests");
//       sendRequest();
//     };

//     const stopRequests = () => {
//       clearTimeout(timerIdRef.current);
//       setIsSendingRequests(false);
//       setRequestStatus("Requests Stopped");
//     };

//     const handleKeyPress = (event) => {
//       if (event.key === " ") {
//         if (isSendingRequests) {
//           stopRequests();
//         } else {
//           startRequests();
//         }
//       }
//     };

//     window.addEventListener("keypress", handleKeyPress);

//     return () => {
//       window.removeEventListener("keypress", handleKeyPress);
//       clearTimeout(timerIdRef.current);
//     };
//   }, [isSendingRequests]);

//   return (
//     <div className="container">
//       <div className="content">
//         <div className="webcam-section">
//           <div className="cam_content">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               width="50%"
//               className="cam"
//             />
//             <div className="input-container">
//               <p className="status">{requestStatus}</p>
//             </div>
//           </div>
//           <div className="prediction_text">
//             <input
//               type="text"
//               value={appendedText}
//               readOnly
//               placeholder="Predicted Text"
//               className="predict_box"
//             />
//           </div>
//           <div className="prediction">
//             <p className="">{predictedText}</p> {/* Display appended text */}
//           </div>
//         </div>
//       </div>
//       <Background />
//     </div>
//   );
// };

// export default WebcamCapture;
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import Background from "./background"; // Make sure this import path is correct
import axios from "axios";
import "./App.css";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [predictedText, setPredictedText] = useState("");
  const [isSendingRequests, setIsSendingRequests] = useState(false);
  const [requestStatus, setRequestStatus] = useState("Stopped");
  const timerIdRef = useRef(null);
  const lastPredictionRef = useRef("");
  const consecutiveSamePredictionCountRef = useRef(0);
  const [appendedText, setAppendedText] = useState("");
  const [isDinoJumping, setIsDinoJumping] = useState(false); // New state to control dinosaur jumping

  useEffect(() => {
    const sendRequest = async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      try {
        const response = await axios({
          method: "POST",
          url: "https://detect.roboflow.com/american-sign-language-letters/6",
          params: {
            api_key: "5eGf3j1XKmN3V7F03yru",
          },
          data: imageSrc.replace(/^data:image\/(png|jpg);base64,/, ""),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        const predictions = response.data.predictions;
        if (predictions.length > 0) {
          const highestConfidencePrediction = predictions.reduce(
            (prev, current) =>
              prev.confidence > current.confidence ? prev : current
          );

          const currentPrediction = highestConfidencePrediction.class;

          if (currentPrediction === lastPredictionRef.current) {
            consecutiveSamePredictionCountRef.current++;
            if (consecutiveSamePredictionCountRef.current >= 2) {
              setAppendedText((prevText) => prevText + currentPrediction); // Append predicted text
              setIsDinoJumping(true); // Trigger the dinosaur jump
              setTimeout(() => setIsDinoJumping(false), 1000); // Reset the dinosaur jump state after 1s
            }
          } else {
            lastPredictionRef.current = currentPrediction;
            consecutiveSamePredictionCountRef.current = 1;
          }

          setPredictedText(currentPrediction); // Update predicted text
          setRequestStatus("Sending Requests");
        } else {
          setRequestStatus("No Predictions");
        }
      } catch (error) {
        console.error("Error making the prediction:", error);
        setRequestStatus("Error making the prediction");
      }

      timerIdRef.current = setTimeout(sendRequest, 1500); // Send a request every 1500 milliseconds
    };

    const startRequests = () => {
      setIsSendingRequests(true);
      setRequestStatus("Sending Requests");
      sendRequest();
    };

    const stopRequests = () => {
      clearTimeout(timerIdRef.current);
      setIsSendingRequests(false);
      setRequestStatus("Requests Stopped");
    };

    const handleKeyPress = (event) => {
      if (event.key === " ") {
        if (isSendingRequests) {
          stopRequests();
        } else {
          startRequests();
        }
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      clearTimeout(timerIdRef.current);
    };
  }, [isSendingRequests]);

  return (
    <div className="container">
      <div className="content">
        <div className="webcam-section">
          <div className="cam_content">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="50%"
              className="cam"
            />
            <div className="input-container">
              <p className="status">{requestStatus}</p>
            </div>
          </div>
          <div className="prediction_text">
            <input
              type="text"
              value={appendedText}
              readOnly
              placeholder="Predicted Text"
              className="predict_box"
            />
          </div>
          <div className="prediction">
            <p>{predictedText}</p>
          </div>
        </div>
      </div>
      <Background isDinoJumping={isDinoJumping} />
    </div>
  );
};

export default WebcamCapture;
