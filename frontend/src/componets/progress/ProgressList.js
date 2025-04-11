import React, { useState } from 'react';

const ProgressList = ({ updates, onEdit, onDelete }) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const handleDeleteClick = (update) => {
    setDeleteConfirmation(update);
  };

  const handleConfirmDelete = () => {
    onDelete(deleteConfirmation.id);
    setDeleteConfirmation(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Your Progress Updates</h2>
      
      {updates.length === 0 ? (
        <p className="text-gray-500">No progress updates yet. Create your first update!</p>
      ) : (
        <div className="space-y-4">
          {updates.map(update => (
            <div key={update.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{update.title}</h3>
                <div className="space-x-2">
                  <button
                    onClick={() => onEdit(update)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(update)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-16 mb-2">
                <span className="text-sm font-medium text-gray-700">Skill:</span>
                <span>{update.skill}</span>
              </div>
              
              <div className="flex items-center gap-9 mb-2">
                <span className="text-sm font-medium text-gray-700">Progress:</span>
                <span>{update.progress}</span>
              </div>
              
              {update.challenges && (
                <div className="flex items-center gap-6 mb-2">
                  <span className="text-sm font-medium text-gray-700">Challenges:</span>
                  <span>{update.challenges}</span>
                </div>
              )}
              
              {update.nextSteps && (
                <div className="flex items-center gap-6">
                  <span className="text-sm font-medium text-gray-700">Next Steps:</span>
                  <span>{update.nextSteps}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the progress update "{deleteConfirmation.title}"?
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressList; 