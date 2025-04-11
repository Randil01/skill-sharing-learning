import React from 'react';

const ProgressList = ({ updates, onEdit, onDelete }) => {
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
                    onClick={() => onDelete(update.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700">Skill:</span>
                <span className="ml-2">{update.skill}</span>
              </div>
              
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700">Progress:</span>
                <p className="mt-1">{update.progress}</p>
              </div>
              
              {update.challenges && (
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-700">Challenges:</span>
                  <p className="mt-1">{update.challenges}</p>
                </div>
              )}
              
              {update.nextSteps && (
                <div>
                  <span className="text-sm font-medium text-gray-700">Next Steps:</span>
                  <p className="mt-1">{update.nextSteps}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressList; 