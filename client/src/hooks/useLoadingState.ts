import { useState, useCallback } from "react";

interface LoadingState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useLoadingState<T>() {
  const [state, setState] = useState<LoadingState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const startLoading = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
  }, []);

  const setData = useCallback((data: T) => {
    setState({ data, isLoading: false, error: null });
  }, []);

  const setError = useCallback((error: Error) => {
    setState((prev) => ({ ...prev, error, isLoading: false }));
  }, []);

  return {
    ...state,
    startLoading,
    setData,
    setError,
  };
}
