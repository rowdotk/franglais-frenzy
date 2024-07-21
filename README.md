# 🔠 FRANGLAIS-FRENZY

## Initial Setup

1. Install all packages required with `npm install`
2. Create a `.env` file in the server root directory and include the following keys:

```
PORT=3001
DEEPL_AUTH_KEY=[Please request the key from @rowdotk]
DEEPL_BASE_URL='https://api-free.deepl.com/v2/translate'
```

3. Create a `.env` file in the client root directory and include the following keys:

```
REACT_APP_SERVER_URL=http://localhost:3001/api/v1
```

## How to run the application locally

- Execute the following command: `npm run dev`
- Access http://localhost:3000/ for the game

## How to play

- Given a French word, the player needs to find the English translation of it
- To guide the player, the player is given: the first letter of the translated word and the
  number of letters in the word
- The player starts with 10 points. When a mistake is made, a point is lost, and when the word
  is found, a point is gained
- If the player reaches 0 points, they lose. If they reach 20 points, they win.

## Game Mechanics

- The verbs are stored in a JSON file on the server.
- Difficulty levels range from 1 to 5, the game starts with a level 1 word (easiest). If the player answers correctly, they move to a more difficult word. If they answer incorrectly, they receive an easier word.
- Each response is logged, adjusting the difficulty level of words based on correctness. Correct answers increase the difficulty, while incorrect answers decrease it. This system ensures that, over time, difficulty levels in the database accurately reflect the challenge each word presents.
- For testing purpose: the answers are logged in the browser console.

## Future Improvements

- Implement tests
- Enhance CRUD operations to prevent race conditions during level optimization
- Cache translations to minimize API calls
- Improve initial level categorization of the verbs
- Make the app responsive
- Provide correct answer when the player answers incorrectly
- Skip level if there are no verbs available for the difficulty level
- Add tooltips for buttons
- Allow navigation between inputs with left and right buttons

## Preview
![preview](https://github.com/user-attachments/assets/a20b163b-4a88-40c5-a385-6db603ec37ad)

![image](https://github.com/user-attachments/assets/3f12fab3-45f3-46e1-b36e-f5f5b287a1f5)

