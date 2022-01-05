var body = document.querySelector('.body')
var createSec = document.getElementById('createSec')
createSec.addEventListener('click', createSectionNode)
var addQuestion = document.getElementById('addQuestion')
var addTitleAndText = document.getElementById('addTitleAndText')
var previewer = document.getElementById('previewer')
for ( var i = 0, len = localStorage.length; i < len; ++i ) {
 var localStgkey=  Object.keys(localStorage)[i] 
}

var count = 1
let currentCount = 1
var secId = ''
var mainParentId = "" 
var testObject = { 'one': 1, 'two': 2, 'three': 3 };

localStorage.setItem(`mainFormCreated`, JSON.stringify([]))
localStorage.setItem(`mainFormHtml`, JSON.stringify([]))
// var existingEntries = JSON.parse(localStorage.getItem("mainFormCreated"));
// var existingEntries2 = JSON.parse(localStorage.getItem("mainFormHtml"));

function formDiv() {
  var FormDivls = document.createElement('div')
  var FormDivNode = document.createElement('div')
  var formHrNode = document.createElement('div')
  FormDivls.setAttribute('id', `FormDivls${count}`)
  FormDivNode.setAttribute('id', `formDiv${count}`)
 
  FormDivNode.setAttribute('class', `mainParentFormDiv`)
  formHrNode.setAttribute('style', `border-bottom: 1px solid lightgrey ;`)
  FormDivNode.addEventListener('click', selectedParent)
  return { FormDivls, FormDivNode, formHrNode }
}
var secformDiv = formDiv()
// body.innerText = JSON.stringify(existingEntries2)
function createSectionNode() {
  var divNode = document.createElement('div')
  divNode.setAttribute('class', 'addSecDiv')
  
  // var pNode = document.createElement('p')
  // var pNodeDiscription = document.createTextNode(`section ${currentCount} of section ${count}`)
  // if (pNodeDiscription) pNode.appendChild(pNodeDiscription)
  var frmDiv = formDiv()

  if (frmDiv) body.appendChild(frmDiv.FormDivls)
  if (frmDiv.FormDivls) frmDiv.FormDivls.appendChild(frmDiv.FormDivNode)
  if (frmDiv) body.appendChild(frmDiv.formHrNode)
  // if (pNode) frmDiv.FormDivNode.appendChild(pNode)
  if (divNode) frmDiv.FormDivNode.appendChild(divNode)
  currentCount = count++
  var TextHeadingName = document.createElement('textarea')
  TextHeadingName.setAttribute('class', 'textHeadingName')
  var headingUntitledName = document.createTextNode('Untititled Section')
  if (headingUntitledName) TextHeadingName.appendChild(headingUntitledName)
  var textDiscription = document.createElement('textarea')
  textDiscription.setAttribute('class', 'textDiscription')
  addEleToLocalStorage(frmDiv.FormDivls,TextHeadingName,textDiscription)
  if (TextHeadingName) divNode.appendChild(TextHeadingName)
  if (textDiscription) divNode.appendChild(textDiscription)
  fixTextArea()
  console.log(`frmDiv.FormDivNode`, frmDiv.FormDivNode)
 //addEntryToLocalStorage(TextHeadingName,textDiscription ,existingEntries) 
 //localStorage.setItem("mainFormCreated", JSON.stringify(existingEntries));

  //window.localStorage.setItem(`mainFormCreated`, `${JSON.stringify(frmDiv.FormDivNode.innerHTML)}`)
}

addQuestion.addEventListener('click', function () {
  questionSec(mainParentId)
})
function selectedParent(e) {
  secId = e.currentTarget.id
  mainParentId = secId
  secId = ''
}
function questionSec(mainParentId) {
  var questionDivNode = document.createElement('div')
  var breakNode = document.createElement('br')
  console.log(`mainParentId`, mainParentId)
  var formDivId = document.getElementById(`${mainParentId}`)
  questionDivNode.setAttribute('class', 'addQuesDiv')
  if (questionDivNode) formDivId.appendChild(questionDivNode)

  var questionSecHeading = document.createElement('textarea')
  questionSecHeading.setAttribute('class', 'questionSecHeading')
  if (questionSecHeading) questionDivNode.appendChild(questionSecHeading)

  var headingUntitledName = document.createTextNode('my question is ?')
  if (headingUntitledName) questionSecHeading.appendChild(headingUntitledName)
  if (breakNode) questionDivNode.appendChild(breakNode)

  var divRadNode = document.createElement('div')
  divRadNode.setAttribute('class', 'addRadioInDiv')
  if (divRadNode) questionDivNode.appendChild(divRadNode)

  var questionOptions = document.createElement('input')
  questionOptions.setAttribute('type', 'radio')
  questionOptions.setAttribute('class', 'questionOptions r1')
  var handleRadioText = document.createElement('input')
  handleRadioText.setAttribute('type', 'text')
  handleRadioText.setAttribute('class', 'quesOptionText r1')

  if (questionOptions) divRadNode.appendChild(questionOptions)
  if (handleRadioText) divRadNode.appendChild(handleRadioText)

  fixTextArea()
  console.log(`formDivId`, formDivId)
  window.localStorage.setItem(`mainParentId`, JSON.stringify(formDivId.innerHTML))

}
function quesOptions(){
  
  var questionOptions = document.createElement('input')
  questionOptions.setAttribute('type', 'radio')
  questionOptions.setAttribute('class', 'questionOptions r1')
  var handleRadioText = document.createElement('input')
  handleRadioText.setAttribute('type', 'text')
  handleRadioText.setAttribute('class', 'quesOptionText r1')

  if (questionOptions) divRadNode.appendChild(questionOptions)
  if (handleRadioText) divRadNode.appendChild(handleRadioText)
}
addTitleAndText.addEventListener('click', function () {
  addTitleAndDiscription(mainParentId)
})
function addTitleAndDiscription(mainParentId) {
  var addTitleDivNode = document.createElement('div')
  addTitleDivNode.setAttribute('class', 'addSecDiv')

  var formDivId = document.getElementById(`${mainParentId}`)

  if (addTitleDivNode) formDivId.appendChild(addTitleDivNode)
  currentCount = count++
  
  var TextHeadingName = document.createElement('textarea')
  TextHeadingName.setAttribute('class', 'textHeadingName')
  var headingUntitledName = document.createTextNode('add Title')
  if (headingUntitledName) TextHeadingName.appendChild(headingUntitledName)

  var textDiscription = document.createElement('textarea')
  textDiscription.setAttribute('class', 'textDiscription')

  if (TextHeadingName) addTitleDivNode.appendChild(TextHeadingName)
  if (textDiscription) addTitleDivNode.appendChild(textDiscription)
  fixTextArea()
  console.log(`formDivId in addTitleAndDiscription`, formDivId)
  

}
function addEntryToLocalStorage(ttl,dis,exE) {
 
  // Parse the JSON stored in allEntriesP
  var existingEntries = JSON.parse(localStorage.getItem("mainFormCreated"));
  if (existingEntries == null) existingEntries = [];
  var tltHtml = document.getElementById("entryTitle");
    var dicHtml = document.getElementById("entryText");
      var quesStatement = document.getElementById("quesStatement");
    var options = document.getElementById("options");

var qA1={
'quesStatement':quesStatement.value,
  'options':options.value
}
var qAObjs ={
'qA1':qA1
}
var qAs =[]
  var untTlt = {
    'tltHtml': tltHtml.value,
    'disHtml': dicHtml.value

  }
  var secObjs = {
    'untTldSec': untTlt,
    'quesArray':qAs
  }

  var entryText = document.getElementById("entryText").value;
  let sec1=`${mainParentId}`
  var secObjects = {
   sec1 : secObjs,
  };

    qAs.push(qAObjs);

  existingEntries.push(secObjects);
  localStorage.setItem("allEntries", JSON.stringify(existingEntries));
  count++
};
var sec_1;
function addEleToLocalStorage(mdiv,ttl,dis) {
 
  // Parse the JSON stored in allEntriesP
  //var existingEntries = JSON.parse(localStorage.getItem("mainFormCreated"));
  if (existingEntries2 == null) existingEntries2 = [];
  var tltHtml = document.getElementById("entryTitle");
    var dicHtml = document.getElementById("entryText");
      var quesStatement = document.getElementById("quesStatement");
    var options = document.getElementById("options");


var qAObjs ={
  'quesStatement':quesStatement,
  'options':options
}
var qAs =[]
  var untTlt = {
    'tltHtml': JSON.stringify(ttl.innerHTML), //ttl.innerHTML,
    'disHtml':  JSON.stringify(dis.innerHTML)

  }
  var secObjs = {
    'untTldSec': untTlt,
    'quesArray':qAs
  }

  //var entryText = document.getElementById("entryText").value;
   sec_1=`${mainParentId}`
  var secObjects = {
    secEle: JSON.stringify(mdiv.innerHTML),
   sec_1 : secObjs,
  };

    qAs.push(qAObjs);

  existingEntries2.push(secObjects);
  localStorage.setItem("mainFormHtml", JSON.stringify(existingEntries2));
  count++
};
function fixTextArea() {
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) / 1.1 + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';

    }, false);
  }
}

function OnInput(e) {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}


// Add active class to the current button (highlight it)

var mainParentDiv = body.querySelectorAll("mainParentFormDiv");
for (var i = 0; i < mainParentDiv.length; i++) {
  mainParentDiv[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }
    this.className += " active";
  });
}

previewer.addEventListener('click', preView)
function preView(){
  window.location.href= './docFormViewer.html'
  //window.location.href = './welcomePage.html';

}