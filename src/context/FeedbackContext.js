import { createContext, useEffect, useState } from "react";

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
    const response = await fetch('https://mockend.com/zaapii/feedback-app/feedback?id_order=desc')
    const data = await response.json()
    setTimeout(() => {
      setFeedback(data)
      setLoading(false)
    }, 1500);
  }
  
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure?")) {
      setLoading(true)
      await fetch(`https://mockend.com/zaapii/feedback-app/feedback/${id}`, { method: 'DELETE' })

      setFeedback(feedback.filter((item) => item.id !== id));
      setLoading(false)
    }
  };

  const addFeedback = async (newFeedback) => {
    setLoading(true)
    const response = await fetch('https://mockend.com/zaapii/feedback-app/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })
    const data = await response.json()
    setFeedback([newFeedback, ...feedback])
    setLoading(false)
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const updateFeedback = async (id, newItem) => {
    setLoading(true)
    const response = await fetch(`https://mockend.com/zaapii/feedback-app/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })

    const data = await response.json()

    setFeedback(
      feedback.map((item) => item.id === id ? { ...item, ...data } : item
    ))
    setLoading(false)
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