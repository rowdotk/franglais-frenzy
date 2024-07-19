# FRANGLAIS-FRENZY

## Initial Setup

1. Install all packages required with `npm install`
2. Create a `.env` file in the root directory and include the following keys:

```
PORT=3001
SERVER_URL=http://localhost:3001
DEEPL_AUTH_KEY='737cfb1f-d3d6-41d1-9585-91792f80ac68:fx'
DEEPL_BASE_URL='https://api-free.deepl.com/v2/translate'
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

- Difficulty levels range from 1 to 5, the game starts with a level 1 word (easiest). If the player answers correctly, they move to a more difficult word. If they answer incorrectly, they receive an easier word.
- Each response is logged, adjusting the difficulty level of words based on correctness. Correct answers increase the difficulty, while incorrect answers decrease it. This system ensures that, over time, difficulty levels in the database accurately reflect the challenge each word presents.

## Future Improvements

-better caterogisation of the initial level
-allow translations to different languages
-better crud so that we avoid race conditions with level optimisatin
-save the translation so that we dont have to call the api everytime
