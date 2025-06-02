import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('poke-api')
export class PokeApi extends LitElement {
    @property() private pokemons: any[] = [];

    static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      width: 100%;
      box-sizing: border-box;
      background: linear-gradient(to right, rgb(70, 70, 90), rgb(6, 8, 32));
      color: white;
    }


    header, footer {
      background-color: gray;
      color: white;
      padding: 1rem;
      text-align: center;
      width: 100%;
    }

    main {
      flex: 1;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      box-sizing: border-box;
    }

    .pokemon-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.5rem;
      width: 100%;
      max-width: 1200px;
    }

    .pokemon-card {
      background: gray;
      color: black;
      padding: 1rem;
      border-radius: 10px;
      text-align: center;
      width: 150px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    img {
      width: 100px;
      height: 100px;
      object-fit: contain;
      margin-bottom: 0.5rem;
    }

    @media (max-width: 500px) {
      .pokemon-card {
        width: 120px;
      }

      img {
        width: 80px;
        height: 80px;
      }
    }
  `;

    connectedCallback() {
        super.connectedCallback();
        this.fetchPokemons();
    }

    async fetchPokemons() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
            const data = await response.json();
            const results = await Promise.all(
                data.results.map(async (pokemon: any) => {
                    const details = await fetch(pokemon.url).then((res) => res.json());
                    return {
                        name: pokemon.name,
                        image: details.sprites.front_default,
                    };
                })
            );
            this.pokemons = results;
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    }

    render() {
        return html`
      <header>Poke API header</header>
      <main>
        <div class="pokemon-container">
          ${this.pokemons.map(
            (p) => html`
              <div class="pokemon-card">
                <img src="${p.image}" alt="${p.name}" />
                <p>${p.name}</p>
              </div>
            `
        )}
        </div>
      </main>
      <footer>Poke API footer</footer>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'poke-api': PokeApi;
    }
}