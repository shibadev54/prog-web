let usuarios = [{nomeC: "Julia", funcaoC: "contadora", salarioC:1200}];
let container = document.getElementById("listaUsuarios");
function render(){

}
function create() {
  let nomeC = document.getElementById("nomeC").value;
   let funcaoC = document.getElementById("funcaoC").value;
  let salarioC = document.getElementById("salarioC").value;
  let usuario = {
    nomeC,
    funcaoC,
    salarioC
  };
  usuarios.push(usuario);
 
  container.innerHTML += `
    <div class="user">
      <p>${usuario.nomeC}</p> <p>${usuario.funcaoC}</p> <p>${usuario.salarioC}R$</p>
      <div class="actions">
        <button data-open="edit">✎</button>
        <button data-open="delete">🗑</button>
      </div>
    </div>
  `;
}
function edit(){
  usuario.nomeC=nomeC;
  usuarios.push(usuario);
  container.innerHTML=`
    <div class="user">
      <p>${usuario.nomeC}</p>
      <div class="actions">
        <button data-open="edit">✎</button>
        <button data-open="delete">🗑</button>
      </div>
    </div>
  `;
}
document.addEventListener("click", (e) => {
  const openBtn = e.target.closest("[data-open]");
  if (openBtn) {
    const id = openBtn.dataset.open;
    document.getElementById(id).showModal();
  }
  const closeBtn = e.target.closest("[data-close]");
  if (closeBtn) {
    closeBtn.closest("dialog").close();
  }
  if (e.target.id === "save") {
    create();
  }
});