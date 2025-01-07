import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import RecipeCard from "./RecipeCard";

const SortableRecipeCard = ({ recipe, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: recipe.id.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <RecipeCard recipe={recipe} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default SortableRecipeCard;
