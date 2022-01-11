var bodyNode = document.querySelector('body')
var body = document.querySelector('.body')
var createSec = document.getElementById('createSec')
createSec.addEventListener('click', createSectionNode)
var addQuestion = document.getElementById('addQuestion')
var addTitleAndText = document.getElementById('addTitleAndText')
var previewer = document.getElementById('previewer')
var saveWork = document.getElementById('saveWork')

var existingEntries = JSON.parse(localStorage.getItem("allEntries"));


var maincount = 1
var secCount = 1
var quescount = 1
var ttlcount = 1
var secId = ''
var mainParentId = ""
var parentArr = []
let mainState = {
  title: '',
  description: '',
  questions: [
    {
      question: '',
      type: '',
      options: [
        { option: '', correct: false },
        { option: '', correct: false },
      ]
    },
    {
      question: '',
      type: '',
      options: [
        { option: '', correct: false },
        { option: '', correct: false },
      ]
    }
  ]
}


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
//bodyNode.addEventListener('click',function(){
//var preEntries =addTitleToLocalStorage(parentArr)
// if(existingEntries == undefined || null){
//   var preEntries =addTitleToLocalStorage(parentArr)


// }
// else{
//   var existingEntries = JSON.parse(localStorage.getItem("allEntries"));

// }
//},false)
var secformDiv = formDiv()

function selectedParent(e) {
  secId = e.currentTarget.id
  //sectionId = e.currentTarget.id
  mainParentId = secId
  //mainParentClass = sectionId

  secId = ''
}

//get element from local storage
if (existingEntries != undefined || null) {

  for (let i = 0; i <= existingEntries.length; i++) {
    createSectionNode()

    var SecTitleAll = document.querySelector(`#SecTitleId${i + 1}`)
    var SecDisAll = document.querySelector(`#SecDisId${i + 1}`)

    if (typeof existingEntries !== 'undefined' && existingEntries.length === 0) {

      SecTitleAll.innerText = " untitled Title "

      SecDisAll.innerText = "untitled Discription"
    }
    // else {
    //   SecTitleAll.innerText = existingEntries[i].title //== undefined ? " untitled Title " : existingEntries[i].title 

    //   SecDisAll.innerText = existingEntries[i].discription// == undefined ? "untitled Discription" : existingEntries[i].discription

    // }
  }
}
else {
  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));

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

  secCount++
  maincount++
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


saveWork.addEventListener('click', function () {
  localArr()
  addTitleToLocalStorage(parentArr)
}, false)
function localArr() {
  var state = { 'CurrentSecId': mainParentId, 'title': '', 'discription': '' }
  //var state = {  'title': '', 'discription': '' }
  //if (parentArr.filter(each => { return each.CurrentSecId === mainParentId; }).length > 0) {
  var matchIndex =-1
  if (parentArr.length > 0) {
    for(let i=0 ;i<parentArr.length ;i++){
    var getCurrSec = document.querySelector(`#${mainParentId}`)
    var child = getCurrSec.children[0];
    var subChild = child.children[0].value || child.childNodes[0].value
    var subChild1 = child.children[1].value || child.childNodes[1].value
    //parentArr.filter(each => { return each.title = subChild; }).length > 0
    //parentArr.filter(each => { return each.discription = subChild1; }).length > 0
    //for (let ech of parentArr) {
      if(parentArr[i].CurrentSecId === mainParentId){
          parentArr[i].CurrentSecId = matchIndex
        if(parentArr[i].CurrentSecId ===matchIndex){
          parentArr[matchIndex].title =subChild
        parentArr[matchIndex].discription =subChild1
        }
      }
      else{
        if(parentArr[i].CurrentSecId ===matchIndex){
          parentArr[i].title =subChild
        parentArr[i].discription =subChild1
        }
      }
      // parentArr.forEach(v => {
      //   v.title =subChild
      //   v.discription =subChild1
      //   //, isActive: true
      // })
      // parentArr.forEach(v => {
      //   //v.title =subChild,
      //   v.discription =subChild1
      //   //, isActive: true
      // })
    //}
    console.log(`currentSection: ${mainParentId},  title: ${subChild} ,  discription: ${subChild1}`)
    console.log(`currentSection:`, parentArr)
    //parentArr.push(state)
    }
  }
  else {
    parentArr.push(state)
  }

}
function addTitleToLocalStorage(parentArr) {
  // Parse the JSON stored in allEntriesP
  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
  console.log(`existingEntries`, existingEntries)
  // if (existingEntries == null) existingEntries = [];
  localStorage.setItem("allEntries", JSON.stringify(parentArr));
};
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





function fixTextArea() {
  // Add active class to the current button (highlight it)
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) / 1.1 + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';

    }, false);
  }
}




previewer.addEventListener('click', function () {
  preView()
})
function preView() {
  window.location.href = './docFormViewer.html'

}