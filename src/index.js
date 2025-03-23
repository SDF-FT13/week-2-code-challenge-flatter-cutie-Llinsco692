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

