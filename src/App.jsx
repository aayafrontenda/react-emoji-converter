import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [emojis, setEmojis] = useState([]);
  const [filteredEmojis, setFilteredEmojis] = useState([]);
  const [query, setQuery] = useState('');  

  useEffect(() => {
    fetch('https://emoji-api.com/emojis?access_key=71c27f33a7c326f1adbca3165f5ad5c6c8a6c698')
    .then((data) => (data.json()))
    .then((json) => {
      setEmojis(json.map((emoji) => {
        return {
          slug: emoji.slug, 
          group: emoji.group,
          subGroup: emoji.subGroup,
          character: emoji.character,
        }}));
      console.log(emojis);
    })
  }, []);

  const emojiClick = (character) => {
    navigator.clipboard.writeText(character);
    navigator.clipboard.readText()
    .then((copied) => {
        console.log(copied);
    });
  }

  useEffect(() => {
    setFilteredEmojis(emojis.filter((emoji) => {
      if (emoji.slug.includes(query) || emoji.group.includes(query) || emoji.subGroup.includes(query)) {
        return emoji;
      }
    }));
  }, [query, emojis]);

  return (
    <div className="App">
      <div className='block'>
        <div className='converter flex'>
          <input className='input-text' value={query} placeholder='describe emoji, click = copy to clickboard' onChange={(event) => setQuery(event.target.value)} />
          <div className='output-emojis'>
            {
              /*
              emojis.filter((emoji) => {
                if (emoji.slug.includes(query) || emoji.group.includes(query) || emoji.subGroup.includes(query)) {
                  setEmpty(false);
                  return emoji;
                }
              })
              .map((emoji) => 
                <p key={emoji.slug} onClick={() => emojiClick(emoji.character)}>
                  {emoji.character}
                </p>
              )
              */
             filteredEmojis.length >= 1 ?
              filteredEmojis.map((emoji) => 
                <p key={emoji.slug} onClick={() => emojiClick(emoji.character)}>
                  {emoji.character}
                </p>
                )
              : <h2>(no results)</h2>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
