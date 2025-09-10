const storageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState();
  localStorage.setItem("courses", JSON.stringify(state.courses.list));

  return result;
};

export default storageMiddleware;