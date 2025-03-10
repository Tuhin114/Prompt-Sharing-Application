import { useState } from "react";

const useLoading = (initialState = true) => {
  const [loading, setLoading] = useState(initialState);
  return { loading, setLoading };
};

export default useLoading;
