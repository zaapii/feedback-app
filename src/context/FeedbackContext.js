import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    const response = await fetch('http://localhost:5000/feedback?_sort=id&_order=desc')
    const data = await response.json()
    setTimeout(() => {
      setFeedback(data)
      setLoading(false)
    }, 2000);
  }
  
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const updateFeedback = (id, newItem) => {
    setFeedback(
      feedback.map((item) => item.id === id ? { ...item, ...newItem } : item
    ))
  }

  return <FeedbackContext.Provider value={{
    feedback,
    feedbackEdit,
    loading,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedback
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext