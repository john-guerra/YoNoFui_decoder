import React from 'react';
import '../../styles/animations.css';

const DetectivePets = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Dog detective */}
      <div
        className="absolute text-4xl"
        style={{
          animation: 'roamDog 12s ease-in-out infinite',
          top: '20%',
          left: '0%',
        }}
      >
        <span style={{ display: 'inline-block', animation: 'bounce 0.5s ease-in-out infinite' }}>
          🐕🔍
        </span>
      </div>

      {/* Cat detective */}
      <div
        className="absolute text-4xl"
        style={{
          animation: 'roamCat 15s ease-in-out infinite',
          top: '60%',
          right: '0%',
        }}
      >
        <span style={{ display: 'inline-block', animation: 'bounce 0.6s ease-in-out infinite alternate' }}>
          🔎🐈
        </span>
      </div>

      {/* Cockatoo detective */}
      <div
        className="absolute text-4xl"
        style={{
          animation: 'roamBird 10s ease-in-out infinite',
          top: '40%',
          left: '50%',
        }}
      >
        <span style={{ display: 'inline-block', animation: 'flutter 0.3s ease-in-out infinite alternate' }}>
          🦜🔍
        </span>
      </div>
    </div>
  );
};

export default DetectivePets;
