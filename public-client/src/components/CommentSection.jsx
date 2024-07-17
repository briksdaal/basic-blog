import { useState, useRef } from 'react';
import FetchWrapper from './FetchWrapper';
import AddComment from './AddComment';
import CommentsList from './CommentsList';

function CommentsSection({ postId }) {
  const [minHeight, setMinHeight] = useState(0);
  const containerRef = useRef(null);

  function normalizeMinHeight() {
    setMinHeight(Math.max(minHeight, containerRef?.current?.offsetHeight));
  }

  return (
    <div
      id="comments"
      ref={containerRef}
      className="mt-4 scroll-my-20"
      style={{ minHeight: `${minHeight}px` }}>
      <h3 className="text-lg">Comments</h3>
      <AddComment postId={postId} updateList={normalizeMinHeight} />
      <FetchWrapper
        Child={CommentsList}
        suffixUrl={`comments/?post=${postId}`}
        trigger={minHeight}
      />
    </div>
  );
}

export default CommentsSection;
