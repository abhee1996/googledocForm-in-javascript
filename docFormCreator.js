var body = document.querySelector('.body')
var createSec = document.getElementById('createSec')
createSec.addEventListener('click', createSectionNode)
var addQuestion = document.getElementById('addQuestion')
var addTitleAndText = document.getElementById('addTitleAndText')
var previewer = document.getElementById('previewer')
var saveWork = document.getElementById('saveWork')


var maincount = 1
var secCount = 1
var quescount = 1
var ttlcount = 1
var secId = ''
var mainParentId = ""
var mainParentClass = ""
var sectionId = ''
var parentArr = []


function formDiv() {
  var FormDivls = document.createElement('div')
  var FormDivNode = document.createElement('div')
  var formHrNode = document.createElement('div')
  FormDivls.setAttribute('id', `FormDivls${maincount}`)
  FormDivNode.setAttribute('id', `formDiv${maincount}`)
  FormDivNode.setAttribute('class', `rounded-3 mainParentFormDiv formDiv${maincount}`)
  formHrNode.setAttribute('style', `border-bottom: 1px solid lightgrey ;`)
  FormDivNode.addEventListener('click', selectedParent)
  return { FormDivls, FormDivNode, formHrNode }
}

var secformDiv = formDiv()

function selectedParent(e) {
  secId = e.currentTarget.id
  sectionId = e.currentTarget.id
  mainParentId = secId
  mainParentClass = sectionId
  var SecObj = { 'CurrentSecId': mainParentId, 'title': '', 'discription': '' }
  if (parentArr.filter(each => { return each.CurrentSecId === mainParentId; }).length > 0) {
    var matchTru = null
    var getCurrSecId = document.querySelector(`#${mainParentId}`)
    var child = getCurrSecId.children[0];
    var subChild = child.children[0].value || child.childNodes[0].value
    var subChild1 = child.children[1].value || child.childNodes[1].value
    matchTru =parentArr.filter(each => { return each.title = subChild; }).length > 0
    parentArr.filter(each => { return each.discription = subChild1; }).length > 0
    console.log(`matchTru`, matchTru)
    //for(var each of parentArr ){
    //var oEl;
    //for(let i=0;i<parentArr.length;i++){
    // if(parentArr[i].CurrentSecId === mainParentId)
    // {
    //   parentArr[i].title = subChild;
    //   parentArr[i].discription = subChild1;

    // }
    // else{
    //   parentArr[i].title = '';
    //   parentArr[i].discription = '';


    // }

    console.log(`currentSection: ${mainParentId},  title: ${subChild} ,  discription: ${subChild1}`)
    console.log(`currentSection:`, parentArr)

  }
  else {
    parentArr.push(SecObj)
  }
  
  addTitleToLocalStorage(parentArr)
  secId = ''
}
//Section Function
function createSectionNode() {
  var divNode = document.createElement('div')
  divNode.setAttribute('class', 'rounded-3 addSecDiv')

  var frmDiv = formDiv()
  if (frmDiv) body.appendChild(frmDiv.FormDivls)
  if (frmDiv.FormDivls) frmDiv.FormDivls.appendChild(frmDiv.FormDivNode)
  if (frmDiv) body.appendChild(frmDiv.formHrNode)
  if (divNode) frmDiv.FormDivNode.appendChild(divNode)
  var SecHeading = document.createElement('textarea')
  SecHeading.setAttribute('class', `SecTitle`)
  SecHeading.setAttribute('id', `SecTitleId${secCount}`)
  SecHeading.setAttribute('placeholder', 'Untititled Title')
  var SecDis = document.createElement('textarea')
  SecDis.setAttribute('class', `SecDis`)
  SecDis.setAttribute('id', `SecDisId${secCount}`)
  SecDis.setAttribute('placeholder', 'add Discription')
  if (SecHeading) divNode.appendChild(SecHeading)
  if (SecDis) divNode.appendChild(SecDis)
  fixTextArea()
  if (parentArr == null) parentArr = [];
  // console.log(`parentArr`, parentArr)

  secCount++
  maincount++
}
if(localStorage.getItem("allEntries"))
{
  localStorage.getItem("allEntries")
}
else{
  addTitleToLocalStorage(parentArr)

}
// addQuestion.addEventListener('click', function () {
//   questionSec(mainParentId)
// })


// Question Function
function questionSec(mainParentId) {
  var questionDivNode = document.createElement('div')
  var breakNode = document.createElement('br')
  console.log(`mainParentId`, mainParentId)
  var formDivId = document.getElementById(`${mainParentId}`)
  questionDivNode.setAttribute('class', 'addQuesDiv')
  if (questionDivNode) formDivId.appendChild(questionDivNode)

  var questionText = document.createElement('textarea')
  questionText.setAttribute('class', `questionText`)
  questionText.setAttribute('id', `questionTextId`)//${quescount+40}`)
  questionText.setAttribute('placeHolder', 'my question is ?')
  if (questionText) questionDivNode.appendChild(questionText)

  if (breakNode) questionDivNode.appendChild(breakNode)

  var divRadNode = document.createElement('div')
  divRadNode.setAttribute('class', 'addRadioInDiv')
  if (divRadNode) questionDivNode.appendChild(divRadNode)

  var questionOptions = document.createElement('input')
  questionOptions.setAttribute('type', 'radio')
  questionOptions.setAttribute('class', 'questionOptions r1')
  var quesOptionText = document.createElement('input')
  quesOptionText.setAttribute('type', 'text')
  quesOptionText.setAttribute('class', `quesOptionText r1`)
  quesOptionText.setAttribute('id', `quesOptionTextId`)//${quescount+30} r1`)
  quesOptionText.setAttribute('placeholder', 'option text')

  if (questionOptions) divRadNode.appendChild(questionOptions)
  if (quesOptionText) divRadNode.appendChild(quesOptionText)

  fixTextArea()


  quescount++

}
function quesOptions() {

  var questionOptions = document.createElement('input')
  questionOptions.setAttribute('type', 'radio')
  questionOptions.setAttribute('class', 'questionOptions r1')
  var quesOptionText = document.createElement('input')
  quesOptionText.setAttribute('type', 'text')
  quesOptionText.setAttribute('class', 'quesOptionText r1')

  if (questionOptions) divRadNode.appendChild(questionOptions)
  if (quesOptionText) divRadNode.appendChild(quesOptionText)
}


saveWork.addEventListener('click', addEntryToLocalStorage)

function addEntryToLocalStorage() {
  //debugger
  // Parse the JSON stored in allEntriesP
  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
  var qAs;
  console.log(`mainParentId`, mainParentId)

  if (existingEntries == null) existingEntries = [];
  if (qAs == null) qAs = []
  var getSecHeadingClass = document.querySelector(`#SecHeadingId`)///${secCount + 40}`);
  var getSecDisClass = document.querySelector(`#SecDisId`)//${secCount + 30}`);
  var quesStatement = document.querySelector(`#questionTextId`)//${quescount}`);
  var optText = document.querySelector(`#quesOptionTextId`)//${quescount}`);
  // var qA1 = {
  //   'quesStatement': quesStatement.value,
  //   'options': optText.value
  // }
  var untTlt = {
    'tltHtml': getSecHeadingClass.value,
    'disHtml': getSecDisClass.value

  }
  var secObjects = {
    currSecId: mainParentId,
    'untTldSec': untTlt,
    //'quesArray': qAs
  };



  existingEntries.push(secObjects);
  localStorage.setItem("allEntries", JSON.stringify(existingEntries));
};
function addTitleToLocalStorage(pArr) {
  // Parse the JSON stored in allEntriesP
  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
  console.log(`existingEntries`, existingEntries)
 // if (existingEntries == null) existingEntries = [];
  localStorage.setItem("allEntries", JSON.stringify(pArr));
};









previewer.addEventListener('click', preView)
function preView() {
   window.location.href = './docFormViewer.html'

}