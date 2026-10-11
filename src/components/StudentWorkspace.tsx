import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { StudentProgress } from '../types';

interface StudentWorkspaceProps {
  trackId: string;
}

const StudentWorkspace: React.FC<StudentWorkspaceProps> = ({ trackId }) => {
  const { profile, topics, updateTrackProgress } = useStudent();
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');

  const track = profile.tracks.find((t) => t.id === trackId);
  if (!track) {
    return <div className="error-panel">Track not found</div>;
  }

  const trackProgress = track.topics.map((topicId) => {
    const key = `${trackId}:${topicId}`;
    return {
      topicId,
      topic: topics[topicId],
      progress: profile.progress[key],
    };
  });

  const selectedTopic = selectedTopicId ? topics[selectedTopicId] : null;
  const selectedProgress = selectedTopicId ? profile.progress[`${trackId}:${selectedTopicId}`] : null;

  const handleStateChange = (newState: StudentProgress['state']) => {
    if (selectedTopicId) {
      updateTrackProgress(trackId, selectedTopicId, { state: newState });
    }
  };

  const handleProgressUpdate = (percent: number) => {
    if (selectedTopicId) {
      updateTrackProgress(trackId, selectedTopicId, { completionPercent: percent });
    }
  };

  const handleSaveNote = () => {
    if (selectedTopicId && noteContent.trim()) {
      const note = {
        id: `note-${Date.now()}`,
        trackId,
        topicId: selectedTopicId,
        type: 'rough' as const,
        content: noteContent,
        tags: [] as string[],
        createdAt: new Date(),
        updatedAt: new Date(),
        isProcessed: false,
      };
      profile.notes.push(note);
      setNoteContent('');
    }
  };

  return (
    <div className="student-workspace">
      <div className="workspace-header">
        <h2>{track.title}</h2>
        {track.curriculum && <span className="curriculum-badge">{track.curriculum}</span>}
      </div>

      <div className="workspace-layout">
        {/* Topics list */}
        <aside className="topics-sidebar">
          <div className="sidebar-header">
            <h3>Topics</h3>
            <span className="topic-count">{track.topics.length}</span>
          </div>
          <div className="topics-list">
            {trackProgress.map(({ topicId, topic, progress }) => (
              <button
                key={topicId}
                className={`topic-item ${selectedTopicId === topicId ? 'selected' : ''} ${progress.state.toLowerCase().replace(' ', '-')}`}
                onClick={() => setSelectedTopicId(topicId)}
              >
                <div className="topic-title">{topic.title}</div>
                <div className="topic-progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress.completionPercent}%` }}
                  />
                </div>
                <div className="topic-meta">
                  <span className="state-badge">{progress.state}</span>
                  <span className="percent">{progress.completionPercent}%</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main workspace */}
        <main className="workspace-main">
          {selectedTopic && selectedProgress ? (
            <div className="topic-workspace">
              <div className="topic-header">
                <div>
                  <h3>{selectedTopic.title}</h3>
                  <p className="topic-summary">{selectedTopic.summary}</p>
                </div>
                <div className="topic-meta-display">
                  <span className="level-badge">{selectedTopic.level}</span>
                </div>
              </div>

              {/* State and progress controls */}
              <section className="control-panel">
                <div className="state-selector">
                  <label>Progress State</label>
                  <select value={selectedProgress.state} onChange={(e) => handleStateChange(e.target.value as any)}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Paused">Paused</option>
                    <option value="Review">Review</option>
                    <option value="Mastered">Mastered</option>
                  </select>
                </div>

                <div className="progress-slider">
                  <label>Completion</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={selectedProgress.completionPercent}
                    onChange={(e) => handleProgressUpdate(parseInt(e.target.value))}
                  />
                  <span className="percent-display">{selectedProgress.completionPercent}%</span>
                </div>
              </section>

              {/* External memory / notes section */}
              <section className="notes-section">
                <h4>External Memory</h4>
                <div className="note-input">
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Capture rough notes, diagrams, questions, or ideas..."
                    rows={4}
                  />
                  <button onClick={handleSaveNote} className="save-note-btn">Save Note</button>
                </div>

                {/* Display notes for this topic */}
                <div className="notes-list">
                  {profile.notes
                    .filter((n) => n.trackId === trackId && n.topicId === selectedTopicId)
                    .map((note) => (
                      <div key={note.id} className="note-card">
                        <div className="note-header">
                          <span className="note-type">{note.type}</span>
                          <span className="note-date">{note.createdAt.toLocaleDateString()}</span>
                        </div>
                        <p className="note-content">{note.content}</p>
                      </div>
                    ))}
                </div>
              </section>

              {/* Practice and related content */}
              <section className="learning-actions">
                <h4>Learning Actions</h4>
                <div className="action-buttons">
                  <button className="action-btn">📚 Learn More</button>
                  <button className="action-btn">✍️ Practice</button>
                  <button className="action-btn">🔗 See Related Topics</button>
                  <button className="action-btn">💭 Concept Explore</button>
                </div>
              </section>
            </div>
          ) : (
            <div className="empty-state">
              <p>Select a topic to begin learning</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentWorkspace;
