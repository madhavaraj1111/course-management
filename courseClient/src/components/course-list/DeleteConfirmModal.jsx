import React from 'react';
import Button from '../Button';

const DeleteConfirmModal = ({
  isOpen,
  selectedCount,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative w-full max-w-md mx-auto p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-center text-white animate-fadeIn">
        {/* Decorative glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/30 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/30 blur-3xl rounded-full pointer-events-none"></div>

        <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-6 text-white/80">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-lg">
            {selectedCount}
          </span>{" "}
          {selectedCount === 1 ? "course" : "courses"}?
        </p>

        <div className="flex justify-center gap-6">
          <Button onClick={onConfirm} variant="danger">
            Delete
          </Button>
          <Button onClick={onCancel} variant="glass">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;