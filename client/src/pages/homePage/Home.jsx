import React from 'react';
import Navigation from 'components/Navigation';

const Home = () => {
  // const [login, setLogin] = useState(true);

  // // Randomly generates a number that represents an index in the array returned by the images
  // const hideImg = () => {
  //   const imgArray = document.querySelectorAll('.space-food');

  //   // If the array's length is 0, it will not continue the function
  //   if (imgArray.length === 0) {
  //     return;
  //   }

  //   // Selects the audio tag and plays the sound clip
  //   const myAudio = document.getElementById('myAudio');
  //   myAudio.play();

  //   // Randomly generates a number that's between 0 and the length of the array
  //   let i = Math.floor(Math.random() * imgArray.length);

  //   // Uses the random number to remove an element from the DOM based of the index.
  //   imgArray[i].remove();
  // };

  return (
    <>
      <Navigation />
    </>
  );
};

export default Home;
