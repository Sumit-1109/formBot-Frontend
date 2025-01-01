import styles from "./workspace.module.css";
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
import { getForm, saveForm } from "../../Services/form";
import { toast } from "react-toastify";
import {v4 as uuidv4} from 'uuid';


function Workspace() {
  const { fileId } = useParams();
  const [formName, setFormName] = useState("");
  const [formElements, setFormElements] = useState([]);

  const token = localStorage.getItem("token");
  console.log(fileId);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await getFile(fileId, token);

        if(res.status === 200) {
          const data = await res.json();
          const file = data.file;

          if(file) {
            if(file.forms && file.forms.length > 0) {
              const formId = file.forms[0]._id;

              const formRes = await getForm(formId, token);

              if(formRes.status === 200) {
                      const formData = await formRes.json();
                      const form = formData.form;
      
                      setFormName(form.formName || '');
                      setFormElements(form.elements || []);
                    }

            } else {
              setFormName('');
              setFormElements([]);
            }
          }
        } else {
          console.log("Error fetching forms");
        }
      }catch (err) {
        console.log(err);
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
      },
    ]);
    console.log(formElements);
  };

  const handleSave = async () => {
    try {
      const formData = {
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
    setFormElements((prev) => prev
    .filter((element, i) => i !== index)
    .map((element) => ({...element})));
  };

  return (
    <div className={styles.workSpacePage}>
      <div className={styles.WorkspaceNavBar}>
        <WorkspaceNavBar
          formName={formName}
          setFormName={setFormName}
          handleSave={handleSave}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.itemBox}>
          <div className={styles.bubbles}>
            <div className={styles.heading}>
              <p>Bubbles</p>
            </div>
            <div className={styles.bubbleButtons}>
              <button onClick={() => addElement("text", "Text")}>
                <img src={text} alt="text" />
                Text
              </button>
              <button onClick={() => addElement("image", "Image")}>
                <img src={imgpng} alt="img" />
                Image
              </button>
              <button onClick={() => addElement("video", "Video")}>
                <img src={video} alt="vid" />
                Video
              </button>
              <button onClick={() => addElement("gif", "GIF")}>
                <img src={gif} alt="gif" />
                Gif
              </button>
            </div>
          </div>
          <div className={styles.inputs}>
            <div className={styles.heading}>
              <p>Inputs</p>
            </div>
            <div className={styles.inputButtons}>
              <button onClick={() => addElement("inputText", "Input Text")}>
                <img src={textInput} alt="txt" />
                Text
              </button>
              <button onClick={() => addElement("inputNumber", "Input Number")}>
                <img src={numberpng} alt="num" />
                Number
              </button>
              <button onClick={() => addElement("inputEmail", "Input Email")}>
                <img src={emailpng} alt="email" />
                Email
              </button>
              <button onClick={() => addElement("inputPhone", "Input Phone")}>
                <img src={phone} alt="phn" />
                Phone
              </button>
              <button onClick={() => addElement("inputDate", "Input Date")}>
                <img src={datepng} alt="date" />
                Date
              </button>
              <button onClick={() => addElement("inputRating", "Input Rating")}>
                <img src={ratingpng} alt="rating" />
                Rating
              </button>
              <button onClick={() => addElement("textButtons", "Input Button")}>
                <img src={buttonpng} alt="btn" />
                Buttons
              </button>
            </div>
          </div>
        </div>

        <div className={styles.formArea}>
          <div className={styles.formComponents}>
            <div className={styles.formStart}>
              <img src={flag} alt="flag" />
              <p>Start</p>
            </div>

            {formElements.map((element, index) => {
              console.log('Key:', element.id);
              return(
              <div key={element.id} className={styles.formElement}>
                <div className={styles.deletePng}>
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
                    placeholder="Enter text"
                    value={element.content}
                    onChange={(e) => handleContextChange(index, e.target.value)}
                  />
                )}
                {element.type === "image" && <p>{element.heading}</p>}
                {element.type === "video" && <p>{element.heading}</p>}
                {element.type === "gif" && <p>{element.heading}</p>}
                {element.type === "inputNumber" && (
                  <input
                    type="number"
                    placeholder="Enter number..."
                    value={element.content}
                    onChange={(e) => handleContextChange(index, e.target.value)}
                  />
                )}
                {element.type === "inputEmail" && (
                  <input
                    type="email"
                    placeholder="Enter email..."
                    value={element.content}
                    onChange={(e) => handleContextChange(index, e.target.value)}
                  />
                )}
                {element.type === "inputPhone" && (
                  <input
                    type="tel"
                    placeholder="Enter phone..."
                    value={element.content}
                    onChange={(e) => handleContextChange(index, e.target.value)}
                  />
                )}
                {element.type === "inputDate" && (
                  <input
                    type="date"
                    value={element.content}
                    onChange={(e) => handleContextChange(index, e.target.value)}
                  />
                )}
                {element.type === "inputRating" && (
                  <div className={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={
                          element.content >= star
                            ? styles.selectedStar
                            : styles.star
                        }
                        onClick={() => handleContextChange(index, star)}
                      >
                        {star}
                      </div>
                    ))}
                  </div>
                )}
                {element.type === "inputButtons" && (
                  <button>Placeholder Button</button>
                )}
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspace;
