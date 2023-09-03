import { useState, useCallback } from "react";

const useDragDrop = () => {
  const [draggedUser, setDraggedUser] = useState(null);

  const handleDragUser = useCallback((user:any) => {
    setDraggedUser(user);
  }, []);

  const handleDropUser = useCallback(() => {
    // Logic to assign the dragged user to the target shift
    // You might want to update some shared state here
  }, [draggedUser]);

  return {
    draggedUser,
    handleDragUser,
    handleDropUser,
  };
};

export default useDragDrop;
