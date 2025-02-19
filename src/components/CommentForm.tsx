import React, { useState } from "react";

interface CommentFormProps {
  onSubmit: (text: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onSubmit(commentText);
      setCommentText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="w-full border p-2 mb-2"
        placeholder="Add a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
      >
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;
