var txtNome = document.querySelector('input[ name = txtNome ]');
var txtIdade = document.querySelector('input[ name = txtIdade ]');
var txtProfissao = document.querySelector('input[ name = txtProfissao ]');
var btnAction = document.querySelector('button[ name = btnAction ]');
var table = document.querySelector('.container table tbody');

var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

var inputs = document.querySelectorAll('input');

//Metodos "front"
//reset
function reset(){
  for (input of inputs){
    input.value = "";
  }
}

//validar
function validar(){
  for (input of inputs){
    if (input.value === ""){
      return false;
    }
  }
  return true;
}

//montarTable
function montarTable(){

  table.innerHTML = "";

  for (user of usuarios){
    //td's
    var tdNome = document.createElement("td");
    tdNome.appendChild(document.createTextNode(user.nome));
    var tdIdade = document.createElement("td");
    tdIdade.appendChild(document.createTextNode(user.idade));
    var tdProfissao = document.createElement("td");
    tdProfissao.appendChild(document.createTextNode(user.profissao));
    var tdButton = document.createElement("td");

    var index = usuarios.indexOf(user);

    //buttons
    var linkEditar = document.createElement("a");
    linkEditar.setAttribute("class", "btn btn-primary");
    linkEditar.setAttribute("role", "button");
    linkEditar.setAttribute('onclick', 'exibirDados(' + index + ')');
    linkEditar.appendChild(document.createTextNode("Editar"));
    linkEditar.style.color = 'white';

    var linkExcluir = document.createElement("a");
    linkExcluir.setAttribute("class", "btn btn-danger ml-2");
    linkExcluir.setAttribute("role", "button");
    linkExcluir.setAttribute("onclick", 'excluir(' + index + ')');
    linkExcluir.appendChild(document.createTextNode("Excluir"));
    linkExcluir.style.color = 'white';

    tdButton.appendChild(linkEditar);
    tdButton.appendChild(linkExcluir);

    //tr
    var tr = document.createElement("tr");
    tr.setAttribute("scope", "row");
    tr.appendChild(tdNome);
    tr.appendChild(tdIdade);
    tr.appendChild(tdProfissao);
    tr.appendChild(tdButton);

    table.appendChild(tr);
  }

  saveLocalStorage();
}

//exibe os dados nos inputs
function exibirDados(index){
  txtNome.value = usuarios[index].nome;
  txtIdade.value = usuarios[index].idade;
  txtProfissao.value = usuarios[index].profissao;
  mudaButton("Alterar");
  this.index = index;
}

function mudaButton(value){
  btnAction.innerHTML = "";
  btnAction.value = value;
  btnAction.appendChild(document.createTextNode(value));
}

//metodos "back"
//Adicionar
function adicionar(){
  if (validar()){
    var usuario = {
      nome: txtNome.value,
      idade: txtIdade.value,
      profissao: txtProfissao.value
    }
    usuarios.push(usuario);
    montarTable();
    reset();
  }
  else{
    alert("preencha os campos");
  }
}

//excluir
function excluir(index){
  usuarios.splice(index, 1);
  montarTable();
}

var index;

//editar
function editar(index){
  if (validar()){
    usuarios[index].nome = txtNome.value;
    usuarios[index].idade = txtIdade.value;
    usuarios[index].profissao = txtProfissao.value;
    montarTable();
    reset();
    mudaButton("Adicionar");
  }
  else {
    alert("preencha os campos");
  }
}

//localStorage
function saveLocalStorage(){
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

//Click Button
btnAction.onclick = function(){
  if (btnAction.value === 'Adicionar'){
    adicionar();
  }
  else if (btnAction.value === 'Alterar') {
    editar(index);
  }
};

montarTable();
