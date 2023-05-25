import React, { useState, useEffect } from 'react';
import "./index.css"



const TouchTypingApp = () => {
const targetKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

const [startTime, setStartTime] = useState(null);
const [endTime, setEndTime] = useState(null);
const [userInput, setUserInput] = useState('');
const [feedback, setFeedback] = useState('');




useEffect(() => {

    const handleKeyDown = (event) => {
        const keyPressed = event.key.toLowerCase();
        const targetIndex = targetKeys.indexOf(keyPressed);
        
        if (targetIndex !== -1) {
        if (!startTime) {
        setStartTime(new Date());
        }
        
        playKeyDownSound();
        
        const targetKeyElement = document.getElementById('target-keys');
        targetKeyElement.innerHTML = targetKeyElement.innerHTML.replace(
        targetKeys[targetIndex],
        `<span class="highlight">${targetKeys[targetIndex]}</span>`
        );
        }
        };
    
        const handleKeyUp = (event) =>{
            const keyPressed = event.key.toLowerCase();
            const targetIndex = targetKeys.indexOf(keyPressed);
            
            if (targetIndex !== -1) {
            playKeyUpSound();
            
            const targetKeyElement = document.getElementById('target-keys');
            targetKeyElement.innerHTML = targetKeyElement.innerHTML.replace(
            `<span class="highlight">${targetKeys[targetIndex]}</span>`,
            targetKeys[targetIndex]
            );
            
            if (targetIndex === targetKeys.length - 1) {
            setEndTime(new Date());
            calculatePerformance();
            }
            }
            };


document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

return () => {
document.removeEventListener('keydown', handleKeyDown);
document.removeEventListener('keyup', handleKeyUp);
};
}, []);






const playKeyDownSound = () => {
const keydownSound = new Audio('https://www.fesliyanstudios.com/play-mp3/9');
keydownSound.currentTime = 0;
keydownSound.play();
};

const playKeyUpSound = () => {
const keyupSound = new Audio('https://www.fesliyanstudios.com/play-mp3/645');
keyupSound.currentTime = 0;
keyupSound.play();
};

const calculatePerformance = () => {
const elapsedTime = (endTime - startTime) / 1000; // in seconds
const typingSpeed = Math.round((targetKeys.length / elapsedTime) * 60); // in characters per minute
const accuracy = calculateAccuracy(targetKeys.join(''), userInput);

setFeedback(`Speed: ${typingSpeed} CPM\nAccuracy: ${accuracy}%`);

// Reset variables
setStartTime(null);
setEndTime(null);
setUserInput('');

};

const calculateAccuracy = (target, input) => {
const targetLength = target.length;
const inputLength = input.length;
const correctCount = target.split('').reduce((acc, char, index) => {
return acc + (char === input[index] ? 1 : 0);
}, 0);

return Math.round((correctCount / targetLength) * 100);
};

return (
<div className='container'>
    <div id="target-keys" className='quote'>Please Enter the Values(asdfjkl;)</div>
    <input  className='input'  type="text" id="user-input" autoFocus value={userInput} onChange={(e)=> setUserInput(e.target.value)}
    />
    <div id="feedback">
        {feedback}</div>
    
</div>
);
};

export default TouchTypingApp;