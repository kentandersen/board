import React from 'react';
import Tile from './widget/tile/tile.jsx';

class App extends React.Component {
  render () {
    return (
      <main>
        <Tile width="6" height="9"></Tile>

        <Tile left="6" width="4" height="3">
          Kent var her!
        </Tile>

        <Tile top="3" left="6" width="4" height="3">
          <span className="text-3">Her er en blokk</span>
        </Tile>

        <Tile top="6" left="6" width="4" height="3">
          Her er en blokk
        </Tile>

        <Tile top="0" left="10" width="6" height="9"></Tile>
      </main>
    );
  }
}

export default App;
