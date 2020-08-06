// shadow dom : 숨겨진 dom
// slot : html에서 shadow dom 내부에 변수를 전달할 때 사용

const template = document.createElement("template");
template.innerHTML = `
    <style>
        h3{
            color: red;
        }
    </style>

    <div class="user-card">
        <img/>
        <div>
            <h3></h3>
            <div class="info">
                <p><slot name="email"/></p>
                <p><slot name="phone"/></p>
            </div>
            <button id="toggle-info">Hide Info</button>
        </div>
    </div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.isToggle = true;

    this.attachShadow({ mode: "open" }); // Making shadow dom
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // can't access to this.get~ out of this class, so select from the shadowRoot
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");

    // use custom attribute
    this.shadowRoot.querySelector("img").src = this.getAttribute("avatar");
  }

  toggleInfo() {
    this.isToggle = !this.isToggle;

    const info = this.shadowRoot.querySelector(".info");
    const toggleBtn = this.shadowRoot.querySelector("#toggle-info");

    if (this.isToggle) {
      info.style.display = "block";
      toggleBtn.innerText = "Hide Info";
    } else {
      info.style.display = "none";
      toggleBtn.innerText = "Show Info";
    }
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#toggle-info")
      .addEventListener("click", () => this.toggleInfo());
  }
  disconnectCallback() {
    this.shadowRoot.querySelector("#toggle-info").removeEventListener();
  }
}
window.customElements.define("user-card", UserCard);
