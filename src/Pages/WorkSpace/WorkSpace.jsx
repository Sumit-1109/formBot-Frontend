import "./workspace.css";
import WorkspaceNavBar from "../../Components/WorkspaceNavBar/WorkspaceNavBar";
import gif from "../../assets/gif.png";
import text from "../../assets/text.png";
import imgpng from "../../assets/imgpng.png";
import video from "../../assets/vid.png";
import textInput from "../../assets/textInput.png";
import numberpng from "../../assets/number.png";
import emailpng from "../../assets/email.png";
import datepng from "../../assets/date.png";
import buttonpng from "../../assets/button.png";
import ratingpng from "../../assets/rating.png";
import phone from "../../assets/phone.png";
import flag from "../../assets/flag.png";
import deletePng from "../../assets/delete.png";

import { useParams } from "react-router-dom";
import { getFile } from "../../Services/file";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "../../Context/ThemeContext";
import { saveForm } from "../../Services/form";

function Workspace() {
  const { fileId } = useParams();
  const [formName, setFormName] = useState("");
  const [formElements, setFormElements] = useState([]);
  const { theme } = useTheme();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchForm = async () => {
        try {
            const res = await getFile(fileId, token);

            if (res.status === 200) {
                const data = await res.json();
                const file = data.file;

                if (file) {
                    const form = data.form;

                    if (form) {
                        setFormName(form.formName || "");
                        setFormElements(form.elements || []);
                    } else {
                        setFormName("");
                        setFormElements([]);
                    }
                }
            } else {
                console.log("Error fetching file and form");
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    if (fileId) {
        fetchForm();
    }
}, [fileId, token]);

const addElement = (type, heading) => {
    setFormElements((prev) => [
        ...prev,
        {
            id: uuidv4(),
            type,
            heading: `${heading} ${prev.length + 1}`,
            content: "",
            order: prev.length + 1,
        },
    ]);
};
  

  const handlePlaceholderChange = (index, value) => {
    const updatedElements = formElements.map((element, i) =>
      i === index ? { ...element, placeholder: value } : element
    );
    setFormElements(updatedElements);
  };

  const handleSave = async () => {
    try {
      const formData = {
        formName,
        elements: formElements,
      };
  
      const res = await saveForm(fileId, formData, token, formName);
  
      if (res.status === 201) {
        const data = await res.json();
        setFormElements(data.form.elements || []);
        toast.success(data.message);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message);
      }
    } catch (err) {
      console.log(err);
      toast.error('An error occurred while saving the form.');
    }
  };  
 

  const handleContextChange = (index, value) => {
    const updatedElements = formElements.map((element, i) =>
      i === index ? { ...element, content: value } : element
    );
    updatedElements[index].content = value;
    setFormElements(updatedElements);
  };

  const deleteElement = (index) => {
    setFormElements((prev) =>
      prev
        .filter((element, i) => i !== index)
        .map((element) => ({ ...element }))
    );
  };

  return (
    <div className={`workSpacePage ${theme ? "dark" : "light"}`}>
      <div className={`WorkspaceNavBar ${theme ? "dark" : "light"}`}>
        <WorkspaceNavBar
          formName={formName}
          setFormName={setFormName}
          handleSave={handleSave}
        />
      </div>

      <div className={`body ${theme ? "dark" : "light"}`}>
        <div className={`itemBox ${theme ? "dark" : "light"}`}>
          <div className={`bubbles ${theme ? "dark" : "light"}`}>
            <div className={`heading ${theme ? "dark" : "light"}`}>
              <p className={`headingP ${theme ? "dark" : "light"}`}>Bubbles</p>
            </div>
            <div className={`bubbleButtons ${theme ? "dark" : "light"}`}>
              <button
                className={`${theme ? "dark" : "light"}`}
                onClick={() => addElement("text", "Text")}
              >
                <img src={text} alt="text" />
                Text
              </button>
              <button
                className={`${theme ? "dark" : "light"}`}
                onClick={() => addElement("image", "Image")}
              >
                <img src={imgpng} alt="img" />
                Image
              </button>
              <button
                className={`${theme ? "dark" : "light"}`}
                onClick={() => addElement("video", "Video")}
              >
                <img src={video} alt="vid" />
                Video
              </button>
              <button
                className={`${theme ? "dark" : "light"}`}
                onClick={() => addElement("gif", "GIF")}
              >
                <img src={gif} alt="gif" />
                Gif
              </button>
            </div>
          </div>
          <div className={`inputs ${theme ? "dark" : "light"}`}>
            <div className={`heading ${theme ? "dark" : "light"}`}>
              <p className={`headingP ${theme ? "dark" : "light"}`}>Inputs</p>
            </div>
            <div className={`inputButtons ${theme ? "dark" : "light"}`}>
              <button
                className={`${theme ? "dark" : "light"}`}
                onClick={() => addElement("inputText", "Input Text")}
              >
                <img src={textInput} alt="txt" />
                Text
              </button>
              <button
                className={`${theme ? "dark" : "light"}`}
                onClick={() => addElement("inputNumber", "Input Number")}
              >
                <img src={numberpng} alt="num" />
                Number
              </button>
              <button
                className={`${theme ? "dark" : "light"}`}
                onClick={() => addElement("inputEmail", "Input Email")}
              >
                <img src={emailpng} alt="email" />
                Email
              </button>
              <button
                className={`${theme ? "dark" : "light"}`}
                onClick={() => addElement("inputPhone", "Input Phone")}
              >
                <img src={phone} alt="phn" />
                Phone
              </button>
              <button
                className={`${theme ? "dark" : "light"}`}
                onClick={() => addElement("inputDate", "Input Date")}
              >
                <img src={datepng} alt="date" />
                Date
              </button>
              <button
                className={`${theme ? "dark" : "light"}`}
                onClick={() => addElement("inputRating", "Input Rating")}
              >
                <img src={ratingpng} alt="rating" />
                Rating
              </button>
              <button
                className={`${theme ? "dark" : "light"}`}
                onClick={() => addElement("textButtons", "Input Button")}
              >
                <img src={buttonpng} alt="btn" />
                Buttons
              </button>
            </div>
          </div>
        </div>

        <div className={`formArea ${theme ? "dark" : "light"}`}>
          <div className={`formComponents ${theme ? "dark" : "light"}`}>
            <div className={`formStart ${theme ? "dark" : "light"}`}>
              <img src={flag} alt="flag" />
              <p>Start</p>
            </div>
            {formElements
  .sort((a, b) => a.order - b.order)
  .map((element, index) => (
    <div
      key={element.id}
      className={`formElement ${theme ? "dark" : "light"}`}
    >

      <div className={`deletePng ${theme ? "dark" : "light"}`}>
        <img
          src={deletePng}
          alt="delete"
          onClick={() => deleteElement(index)}
        />
      </div>

      <p>{element.heading}</p>

      {["text", "inputText"].includes(element.type) && (
        <input
          type="text"
          placeholder={element.placeholder || "Enter text"}
          value={element.content}
          className={`${theme ? "dark" : "light"}`}
          onChange={(e) => handleContextChange(index, e.target.value)}
        />
      )}

      {element.type === "inputNumber" && (
        <input
          type="number"
          placeholder={element.placeholder || "Enter number..."}
          value={element.content}
          className={`${theme ? "dark" : "light"}`}
          onChange={(e) => handleContextChange(index, e.target.value)}
        />
      )}

      {element.type === "inputEmail" && (
        <input
          type="email"
          placeholder={element.placeholder || "Enter email..."}
          value={element.content}
          className={`${theme ? "dark" : "light"}`}
          onChange={(e) => handleContextChange(index, e.target.value)}
        />
      )}

      {element.type === "inputPhone" && (
        <input
          type="tel"
          placeholder={element.placeholder || "Enter phone..."}
          value={element.content}
          className={`${theme ? "dark" : "light"}`}
          onChange={(e) => handleContextChange(index, e.target.value)}
        />
      )}

      {element.type === "inputDate" && (
        <input
          type="date"
          value={element.content}
          placeholder={element.placeholder || "Select a date"}
          className={`${theme ? "dark" : "light"}`}
          onChange={(e) => handleContextChange(index, e.target.value)}
        />
      )}

      {element.type === "inputRating" && (
        <div className={`ratingContainer ${theme ? "dark" : "light"}`}>
          <p>{element.placeholder || "Rate out of 5:"}</p>
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`${
                element.content >= star
                  ? `selectedStar ${theme ? "dark" : "light"}`
                  : `star ${theme ? "dark" : "light"}`
              }`}
              onClick={() => handleContextChange(index, star)}
            >
              {star}
            </div>
          ))}
        </div>
      )}

      {element.type === "inputButtons" && (
        <button
          className={`${theme ? "dark" : "light"}`}
          onClick={() => handleContextChange(index, "Button clicked")}
        >
          {element.placeholder || "Placeholder Button"}
        </button>
      )}


      {element.type.includes("input") && (
        <input
          type="text"
          placeholder="Enter placeholder for this field..."
          value={element.placeholder}
          className={`${theme ? "dark" : "light"} placeholderInput`}
          onChange={(e) => handlePlaceholderChange(index, e.target.value)}
        />
      )}
    </div>
  ))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspace;
