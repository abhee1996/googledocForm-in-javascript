
// Test import of a JavaScript module
import { example } from '@/js/example'
import { createTitleDiscNode } from '@/js/TitleDiscription'
//import { mainParentId } from '@/js/TitleDiscription'
//import { localArr } from '@/js/saveTolocalStrg'
import { addTitleToLocalStorage } from '@/js/saveTolocalStrg'
//import { questionSec } from '@/js/Question'
//import { state } from '@/state'

// Test import of an asset
import webpackLogo from '@/images/webpack-logo.svg'

// Test import of styles
import '@/styles/index.scss'
import '@/styles/style.css'
//import '@/'
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
var qOptcount = 1
var secId = ''
var mainParentId = ""
var getquestionID = ''
var currSelectedQtype =''
var getquestionOptionID = ''
var parentArr = []
var state = {
  CurrentSecId: mainParentId,
  title: '',
  discription: '',
  questions: [
    {
      question: '',
      type: '',
      options: [
        { option: '', correct: false },
      ]
    },

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

var secformDiv = formDiv()

function selectedParent(e) {
  secId = e.currentTarget.id
  mainParentId = secId
  secId = ''
}

//get element from local storage
if (existingEntries == undefined || null) {
  // for (let i = 0; i <= existingEntries.length; i++) {
  //   //createSectionNode()

  //   var SecTitleAll = document.querySelector(`#SecTitleId${i + 1}`)
  //   var SecDisAll = document.querySelector(`#SecDisId${i + 1}`)

  //   if (typeof existingEntries == 'undefined' && existingEntries.length === 0) {

  //     SecTitleAll.innerText = " untitled Title "

  //     SecDisAll.innerText = "untitled Discription"
  //   }
  //   // else {
  //   //   SecTitleAll.innerText = existingEntries[i]?.title //== undefined ? " untitled Title " : existingEntries[i].title 

  //   //   SecDisAll.innerText = existingEntries[i]?.discription// == undefined ? "untitled Discription" : existingEntries[i].discription

  //   // }
  // }
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

addQuestion.addEventListener('click', function () {
  questionSec(mainParentId)
})


// Question Function
function questionSec(mainParentId) {
  var questionDivNode = document.createElement('div')
  console.log(`mainParentId`, mainParentId)
  var formDivId = document.getElementById(`${mainParentId}`)
  questionDivNode.setAttribute('class', 'addQuesDiv')
  var questxtDiv = createMultiNode(questionDivNode, 'div', `questxtDiv`)


  var questionText = document.createElement('textarea')
  questionText.setAttribute('class', `questionText`)
  getquestionID = `questionTextId${quescount + 40}`
  questionText.setAttribute('id', getquestionID)
  questionText.setAttribute('placeHolder', 'my question is ?')

  var addMultiOptions = document.createElement('a')
  addMultiOptions.setAttribute('class', 'addMultiOptions text-warning')
  addMultiOptions.setAttribute('href', `#`)
  addMultiOptions.setAttribute('id', `${getquestionOptionID}`)
  var moreOptsBtn = document.createTextNode(`add options`)

  addMultiOptions.addEventListener('click', function () {
    quesOptions(questionDivNode, getquestionID)
  })
  fixTextArea()
  if (questionDivNode) formDivId.appendChild(questionDivNode)

  if (questionText) questxtDiv.appendChild(questionText)
  createSelectOptionNode(questxtDiv,'sel')


  createMultiNode(questionDivNode, 'br')
  if (moreOptsBtn) addMultiOptions.appendChild(moreOptsBtn)

  if (addMultiOptions) questionDivNode.appendChild(addMultiOptions)
  createMultiNode(questionDivNode, 'br')


  quesOptions(questionDivNode, getquestionID) //create mcqs options


  console.log(`getquestionID`, getquestionID)
  quescount++

}
function selectedQtype(e) {
  qTypeId = e.currentTarget.id
  currSelectedQtype = qTypeId
  qTypeId = ''
}
function quesOptions(questionDivNode, getquestionID) {
  var getquestion = document.getElementById(`${getquestionID}`)
  var divRadNode = document.createElement('div')
  divRadNode.setAttribute('class', 'addRadioInDiv')
  var optTypeRadio = document.createElement('input')
  optTypeRadio.setAttribute('type', currSelectedQtype || 'radio')
  optTypeRadio.setAttribute('class', 'questionOptions r1')
  var quesOptionText = document.createElement('input')
  quesOptionText.setAttribute('type', 'text')
  quesOptionText.setAttribute('class', `quesOptionText r1`)
  getquestionOptionID = `quesOptionTextId${quescount + 30}`
  quesOptionText.setAttribute('id', `${getquestionOptionID}`)
  quesOptionText.setAttribute('placeholder', 'option text')
  if (divRadNode) questionDivNode.appendChild(divRadNode)
  if (optTypeRadio) divRadNode.appendChild(optTypeRadio)
  if (quesOptionText) divRadNode.appendChild(quesOptionText)

}

//addMoreOptions && 




var matchIndex = 0

saveWork.addEventListener('click', function () {
  localArr()
  addToLocalStorage(parentArr)
}, false)

function localArr() {
  var initialstate = {
    CurrentSecId: mainParentId,
    title: '',
    discription: '',
    questions: [
    ]
  }
  var quesState = {
    qId: getquestionID,
    question: '',
    Qtype: '',
    options: [

    ]
  }
  var optionsState = {
    optId: getquestionOptionID,
    option: '',
    correct: false
  }

  var getCurrSec = document.getElementById(mainParentId)
  var child = getCurrSec.children[0]; //get title and discription
  var subChild = child.children[0].value || child.childNodes[0].value// get Title
  var subChild1 = child.children[1].value || child.childNodes[1].value //get discription
  var child2 = getCurrSec.children[1];

  var subChild2OfId = document.getElementById(getquestionID)
  var subChild2 = subChild2OfId?.value || ''
  console.log(`subChild2OfId ,subChild2`, subChild2OfId, subChild2)
  var child3 = child2?.children[2]

  var getsubChild3ById = document.getElementById(getquestionOptionID)  //get question options
  var subChild3 = getsubChild3ById?.value
  if (parentArr.filter(each => { return each.CurrentSecId === mainParentId; }).length > 0) {
    //update section + add questions
    for (let i = 0; i < parentArr.length; i++) {
      if (parentArr[i]?.CurrentSecId === mainParentId) {

        parentArr[i].title = subChild
        parentArr[i].discription = subChild1
        if (parentArr[i].questions.filter(each => { return each.qId === getquestionID; }).length > 0) {
          //update question and new or more add options
          for (let j = 0; j < parentArr[i].questions.length; j++) {
            if (parentArr[i].questions[j]?.qId === getquestionID) {
              parentArr[i].questions[j].question = subChild2
              parentArr[i].questions[j].Qtype = "MCQs"
              if (parentArr[i].questions[j].options.filter(each => { return each.optId === getquestionOptionID; }).length > 0) {
                //update existing options 
                for (let k = 0; k < parentArr[i].questions[j].options.length; k++) {
                  if (parentArr[i].questions[j].options[k]?.optId === getquestionOptionID) {
                    parentArr[i].questions[j].options[k].option = subChild3
                    parentArr[i].questions[j].options[k].correct = false
                  }
                }
                break;
              }
              else {
                //add new options related to same question
                parentArr[i].questions[j].options.push(optionsState)
                for (let t = 0; t < parentArr[i].questions[j].options.length; t++) {
                  if (parentArr[i].questions[j].options[t].optId === getquestionOptionID) {
                    parentArr[i].questions[j].options[t].option = subChild3
                    parentArr[i].questions[j].options[t].correct = false
                  }
                }
              }
            }
          }
          break;
        }
        else {
          // add new question and options* in same section if not exist
          parentArr[i].questions.push(quesState)
          for (let q = 0; q < parentArr[i].questions.length; q++) {
            if (parentArr[i].questions[q].qId === getquestionID) {
              parentArr[i].questions[q].question = subChild2
              parentArr[i].questions[q].Qtype = 'MCQs'
              parentArr[i].questions[q].options.push(optionsState) // if options* ofsame question if not exist
              for (let g = 0; g < parentArr[i].questions[q].options.length; g++) {
                if (parentArr[i].questions[q].options[g].optId === getquestionOptionID) {
                  parentArr[i].questions[q].options[g].option = subChild3
                  parentArr[i].questions[q].options[g].correct = false
                }
              }
            }
          }
        }
      }
      console.log(`parentArr:`, parentArr)
      console.log(`parentArr[i].questions:`, parentArr[i].questions)
    }
  }

  else {
    //first time 
    parentArr.push(initialstate)
    if (parentArr[matchIndex].CurrentSecId === mainParentId) {
      parentArr[matchIndex].title = subChild
      parentArr[matchIndex].discription = subChild1
      parentArr[matchIndex].questions.push(quesState)
      if (parentArr[matchIndex].questions[matchIndex].qId === getquestionID) {
        parentArr[matchIndex].questions[matchIndex].question = subChild2
        parentArr[matchIndex].questions[matchIndex].Qtype = "MCQs"
        parentArr[matchIndex].questions[matchIndex].options.push(optionsState)
        if (parentArr[matchIndex].questions[matchIndex].options[matchIndex].optId === getquestionOptionID) {
          parentArr[matchIndex].questions[matchIndex].options[matchIndex].option = subChild3
          parentArr[matchIndex].questions[matchIndex].options[matchIndex].correct = false
        }
      }


    }
  }

  matchIndex++

}
function addToLocalStorage(parentArr) {
  // Parse the JSON stored in allEntriesP
  var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
  console.log(`existingEntries`, existingEntries)
  // if (existingEntries == null) existingEntries = [];
  localStorage.setItem("allEntries", JSON.stringify(parentArr));
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


function createMultiNode(parent, node, cls) {
  var createNode = document.createElement(node)
  if (createNode) parent.appendChild(createNode)
  if (createNode) createNode.setAttribute('class', cls)
  return createNode
}
function createSelectOptionNode(parent,  cls) {
  var selectNode = document.createElement('select')
  var option1 = document.createElement('option')
  if (option1) option1.setAttribute('id', 'radio')

  var option2 = document.createElement('option')
  if (option2) option2.setAttribute('id', 'checkbox')

  var opt1 = document.createTextNode('multiple Choice')
  var opt2 = document.createTextNode('checkboxes')
  if (selectNode) parent.appendChild(selectNode)
  if (option1) selectNode.appendChild(option1)
  if (option2) selectNode.appendChild(option2)

  if (opt1) option1.appendChild(opt1)
  if (opt2) option2.appendChild(opt2)
  if (selectNode) selectNode.setAttribute('class', cls)
  return selectNode
}






















// // Test import of a JavaScript module
// import { example } from '@/js/example'
// import { createTitleDiscNode } from '@/js/TitleDiscription'
// import { mainParentId } from '@/js/TitleDiscription'
// import { localArr } from '@/js/saveTolocalStrg'
// import { addTitleToLocalStorage } from '@/js/saveTolocalStrg'
// import { questionSec } from '@/js/Question'
// //import { state } from '@/state'

// // Test import of an asset
// import webpackLogo from '@/images/webpack-logo.svg'

// // Test import of styles
// import '@/styles/index.scss'
// import '@/styles/style.css'
// var bodyNode = document.querySelector('body')
// var body = document.querySelector('.body')
// var addTitleDisc = document.getElementById('createSec')
// var addQuestion = document.getElementById('addQuestion')
// var addTitleAndText = document.getElementById('addTitleAndText')
// var previewer = document.getElementById('previewer')
// var saveWork = document.getElementById('saveWork')
// export var maincount = 1
// export var secCount = 1
// //export var mainParentId = ""
// export var secId = ''
// export var parentArr = []
// //FormDivNode.addEventListener('click', selectedParent)

// var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
// saveWork.addEventListener('click', function () {
//   localArr()
//   addTitleToLocalStorage(parentArr)
// }, false)

// addQuestion.addEventListener('click', function () {
//   questionSec(mainParentId)
// })

// // export function selectedParent(e) {
// //   secId = e.currentTarget.id
// //   mainParentId = secId
// //   secId = ''
// // }
// //Appending to the DOM
// const logo = document.createElement('img')
// logo.src = webpackLogo

// const heading = document.createElement('h1')
// heading.textContent = example()

// // Test a background image url in CSS
// const imageBackground = document.createElement('div')
// imageBackground.classList.add('image')

// // Test a public folder asset
// const imagePublic = document.createElement('img')
// imagePublic.src = '/assets/example.png'
// addTitleDisc.addEventListener('click', createTitleDiscNode)

// const app = document.querySelector('#root')
// //app.append( )
