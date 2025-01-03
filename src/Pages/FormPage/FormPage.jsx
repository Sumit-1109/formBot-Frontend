import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getForm, startResponse, submitResponse, saveResponse } from '../api/formApi';

const FormView = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [responseId, setResponseId] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      const formResponse = await getForm(formId);
      setForm(formResponse.form);
      const startResponseData = await startResponse(formId);
      setResponseId(startResponseData.responseId);
    };
    fetchForm();
  }, [formId]);

  const handleNext = async (value) => {
    const currentElement = form.elements[currentIndex];
    setResponses([...responses, { elementId: currentElement.id, value }]);

    if (currentIndex + 1 < form.elements.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await saveResponse(formId, responseId, responses);
      await submitResponse(formId, responseId);
      alert('Form submitted!');
    }
  };

  if (!form) return <div>Loading...</div>;

  const currentElement = form.elements[currentIndex];
  return (
    <div>
      <div>{currentElement.heading}</div>
      {currentElement.type.startsWith('input') && (
        <input
          type={currentElement.type.replace('input', '').toLowerCase()}
          placeholder={currentElement.placeholder}
          onBlur={(e) => handleNext(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormView;