import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
//import litLogo from './assets/lit.svg'
//import viteLogo from '/vite.svg'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */

@customElement('my-element')
export class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @state() private username = '';
  @state() private password = '';
  @state() private errorMessage = '';

  static styles = css`
    :host {
      color: gray;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100vw;
      background: linear-gradient(to right, rgb(70, 70, 90), rgb(6, 8, 32));
      font-family: Arial, sans-serif;
    }

    .container {
      background: rgba(255, 255, 255, 0.1); /* fondo semitransparente */
      backdrop-filter: blur(10px);         /* efecto de desenfoque detrás */
      border: 1px solid rgba(255, 255, 255, 0.2); /* borde tenue */
      padding: 2rem;
      border-radius: 8px;
      width: 100%;
      max-width: 320px;
      box-shadow: 0 0 10px rgba(105, 101, 101, 0);
      display: flex;
      flex-direction: column;
    }

    h2 {
      text-align: center;
      margin-bottom: 1rem;
    }

    input {
      color: gray;
      margin-bottom: 1rem;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      border: none;
      padding: 0.7rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    .error {
      color: red;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    @media (max-width: 480px) {
      .container {
        padding: 1rem;
      }
    }
  `;

  render() {
    return html`
      <div class="container">
        <h2>Login</h2>
        ${this.errorMessage ? html`<div class="error">${this.errorMessage}</div>` : ''}
        <input
          type="text"
          placeholder="Email"
          .value=${this.username}
          @input=${(e: Event) => (this.username = (e.target as HTMLInputElement).value)}
        />
        <input
          type="password"
          placeholder="Password"
          .value=${this.password}
          @input=${(e: Event) => (this.password = (e.target as HTMLInputElement).value)}
        />
        <button @click=${this.login}>Login</button>
        <a href="#" style="margin-top: 1rem; text-align: center; display: block; color: white; text-decoration: underline;">¿Olvidaste tu contraseña?</a>
      </div>
    `;
  }

  private login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, llena todos los campos.';
      return;
    }

    const storedUser = localStorage.getItem('login_user');
    const storedPass = localStorage.getItem('login_pass');

    if (this.username === storedUser && this.password === storedPass) {
      this.errorMessage = '';
      alert(`Es correcto tu usuario y contraseña`);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    localStorage.setItem('login_user', 'luis.aguilarm@axity.com');
    localStorage.setItem('login_pass', '1234');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
