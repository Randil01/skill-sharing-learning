import React, { useState, useEffect } from 'react';
import ProgressList from './ProgressList';
import ProgressForm from './ProgressForm';

const Progress = () => {
  // Load data from localStorage on component mount
  const [progressUpdates, setProgressUpdates] = useState(() => {
    const savedUpdates = localStorage.getItem('progressUpdates');
    return savedUpdates ? JSON.parse(savedUpdates) : [];
  });
  const [editingUpdate, setEditingUpdate] = useState(null);

  // Save to localStorage whenever progressUpdates changes
  useEffect(() => {
    localStorage.setItem('progressUpdates', JSON.stringify(progressUpdates));
  }, [progressUpdates]);

  const handleCreate = (newUpdate) => {
    const updateWithId = { ...newUpdate, id: Date.now() };
    setProgressUpdates([...progressUpdates, updateWithId]);
  };

  const handleUpdate = (updatedUpdate) => {
    setProgressUpdates(progressUpdates.map(update => 
      update.id === updatedUpdate.id ? updatedUpdate : update
    ));
    setEditingUpdate(null);
  };

  const handleDelete = (id) => {
    setProgressUpdates(progressUpdates.filter(update => update.id !== id));
  };

  const handleEdit = (update) => {
    setEditingUpdate(update);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Learning Progress Updates</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ProgressForm 
            onSubmit={editingUpdate ? handleUpdate : handleCreate}
            initialData={editingUpdate}
            isEditing={!!editingUpdate}
          />
        </div>
        
        <div>
          <ProgressList 
            updates={progressUpdates}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Progress; 