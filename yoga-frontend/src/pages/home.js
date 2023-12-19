import React, { useState } from 'react';
import LoadingAnimation from '../components/specific/LoadingAnimation';
import LoginForm from '../components/specific/LoginForm';
import Header from '../components/common/header';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [fadeEffect, setFadeEffect] = useState(false);

  const handleButtonClick = () => {
      setFadeEffect(true)
      setTimeout(() => {
        setIsLoading(true);
    setFadeEffect(false); 
    }, 800);
  };
  const handleAudioEnd = () => {
    setIsLoading(false);
    setShowForm(true);
  
  };
  const yogaClass = fadeEffect ? 'yoga fade-out' : 'yoga';

  return (
    <div className='main-page'>
      <div>

      <Header />
      </div>
      {!isLoading && !showForm && (
        <div className={yogaClass} style={{width:'30%', border:'2px solid white'}}>
          <h1>Are you in the age group 18-65?</h1>

        <button className='btn' onClick={handleButtonClick}>Yes</button>
        </div>
      )}
      {isLoading && <LoadingAnimation onAudioEnd={handleAudioEnd} />}
      {showForm && <LoginForm />}
    </div>
  );
};

export default HomePage;
