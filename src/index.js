// Fetching characters from the local API
fetch('http://localhost:3000/characters')
  .then(response => response.json())
  .then(characters => {
    const charBar = document.getElementById('character-bar');
    characters.forEach(character => {
      const span = document.createElement('span');
      span.textContent = character.name;
      charBar.appendChild(span);
      span.addEventListener('click', () => displayCharacterDetails(character.id));
    });
  })
  .catch(error => {
    console.error('Fetching characters not successful', error);
  });

// Displaying character details
function displayCharacterDetails(characterId) {
  fetch(`http://localhost:3000/characters/${characterId}`)
    .then(response => response.json())
    .then(character => {
      const characterInfo = document.getElementById('detailed-info');
      characterInfo.innerHTML = `
        <p id="name">${character.name}</p>
        <img id="image" src="${character.image}" alt="${character.name}" />
        <h4>Votes in Total: <span id="vote-count">${character.votes}</span></h4>
        <form id="votes-form">
          <input type="text" placeholder="Enter Votes" id="votes" name="votes" />
          <input type="submit" value="Add Votes" />
        </form>
        <button id="reset-btn">Reset Votes</button>
      `;

      // Adding votes handler
      const votesForm = document.getElementById('votes-form');
      votesForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const votesInput = document.getElementById('votes');
        const totalAddedVotes = parseInt(votesInput.value, 10);
        if (totalAddedVotes && totalAddedVotes > 0) {
          updateVotes(characterId, totalAddedVotes); // Ensure updateVotes function is defined
        }
      });

      // Resetting votes
      const resetButton = document.getElementById('reset-btn');
      resetButton.addEventListener('click', function() {
        resetVotes(characterId); // Ensure resetVotes function is defined
      });
    })
    .catch(error => {
      console.error('Error fetching details', error);
    });
}

//Update votes 
function updateVotes(characterId, totalAddedVotes) {
    fetch(`http://localhost:3000/characters/${characterId}`)
      .then(response => response.json())
      .then(character => {
        const newVotes = character.votes + totalAddedVotes; // Adding votes cumulatively
        return fetch(`http://localhost:3000/characters/${characterId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            votes: newVotes,
          }),
        });
      })
      .then(response => response.json())
      .then(updatedCharacter => {
        const voteCount = document.getElementById('vote-count');
        voteCount.textContent = updatedCharacter.votes;
      })
      .catch(error => {
        console.error('Error updating votes:', error);
      });
  }
  
  //reset votes 
  function resetVotes(characterId) {
    fetch(`http://localhost:3000/characters/${characterId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        votes: 0,
      }),
    })
      .then(response => response.json())
      .then(updatedCharacter => {
        const voteCount = document.getElementById('vote-count');
        voteCount.textContent = updatedCharacter.votes;
      })
      .catch(error => {
        console.error('Error resetting votes:', error);
      });
  }
  //Adding a new character 
  function addnewChar(newCharacter) {
    fetch('http://localhost:3000/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCharacter) 
  })
  .then(response => response.json())
  .then(character => {
    // Add new character
    const charBar = document.getElementById('character-bar');
    const span = document.createElement('span');
    span.textContent = character.name;
    charBar.appendChild(span);
    span.addEventListener('click', () => displayCharacterDetails(character.id));
    displayCharacterDetails(character.id);
})
.catch(error => {
  console.error('Error adding new character:', error);
});
}
    const characterForm = document.getElementById('character-form');
   characterForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const image = document.getElementById('image-url').value;
  const newCharacter = { name, image, votes: 0 };
  addnewChar(newCharacter);
});

    
