//fetching charactersto be displayed
fetch('http://localhost:3000/characters')
.then(response => response.json())
.then(characters => {
    const charBar = document.getElementById('character-bar');
    characters.forEach(character => {
        const span = document.createElement('span');
        span.textContent = character.name;
        charBar.appendChild(span);
         span.addEventListener('click', () => showCharacterDetails(character.id));

    });
})
.catch(error => {
    console.error('Fetching characters not succcessful', error)
});
