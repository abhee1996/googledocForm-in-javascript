 var bodyNode = document.querySelector('body')
 var body = document.querySelector('.body')
var createSec = document.getElementById('createSec')
createSec.addEventListener('click', createSectionNode)
let addQuestion = document.getElementById('addQuestion')
var addTitleAndText = document.getElementById('addTitleAndText')
 var previewer = document.getElementById('previewer')
 var saveWork = document.getElementById('saveWork')

//counts
var quescount = 1
var Optcount = 1


//variables
var mainQuestionId = ""
var getquestionID = ''
var getquestionOptionID = ''
var mainQuesOptionId = ""
var divOptNodeID = ""
var currSelectedQtype = 'radio'



// function debounce(callback, wait) {
//   let timeout;
//   return (...args) => {
//       clearTimeout(timeout);
//       timeout = setTimeout(function () { callback.apply(this, args); }, wait);
//   };
// }
// function selectFormDivls(e) {
//   mainParentId = mainParentId
//   var msecId = e.currentTarget.id
//   mainFormDivls = msecId
//   msecId = ''
// }

 var mainFormDivls = ""
 var mainParentId = ""
 var maincount = 1
 var secCount = 1
 var parentArr = []
 var secId = ''

 function formDiv() {
  var FormDivls = document.createElement('div')
  var FormDivNode = document.createElement('div')
  var formHrNode = document.createElement('div')
  FormDivls.setAttribute('id', `FormDivls${maincount}`)
  FormDivNode.setAttribute('id', `formDiv${maincount}`)
  FormDivNode.setAttribute('class', `rounded-3 mainParentFormDiv formDiv${maincount}`)
  FormDivls.setAttribute('class', `rounded-3  FormDivls`)
  formHrNode.setAttribute('style', `border-bottom: 1px solid lightgrey ;`)
  FormDivNode.addEventListener('click', selectedParent)
  FormDivls.addEventListener('click', selectFormDivls)
  return { FormDivls, FormDivNode, formHrNode }
}
//Section Function
 function createSectionNode() {
  var divNode = document.createElement('div')
  divNode.setAttribute('class', 'rounded-3 addSecDiv')

  var frmDiv = formDiv()
  if (frmDiv) body.appendChild(frmDiv.FormDivls)
  if (frmDiv.FormDivls) frmDiv.FormDivls.appendChild(frmDiv.FormDivNode)
  if (frmDiv.formHrNode) frmDiv.FormDivls.appendChild(frmDiv.formHrNode)
  if (divNode) frmDiv.FormDivNode.appendChild(divNode)
  //section title node
  var SecHeading = document.createElement('textarea')
  SecHeading.setAttribute('class', `SecTitle`)
  SecHeading.setAttribute('id', `SecTitleId${secCount}`)
  SecHeading.setAttribute('placeholder', 'Untititled Title')
  //section description node
  var SecDis = document.createElement('textarea')
  SecDis.setAttribute('class', `SecDis`)
  SecDis.setAttribute('id', `SecDisId${secCount}`)
  SecDis.setAttribute('placeholder', 'add Discription')
  if (SecHeading) divNode.appendChild(SecHeading)
  if (SecDis) divNode.appendChild(SecDis)


  if (secCount >= 2) {
    //delete button
    var delDivNode = document.createElement('div');
    delDivNode.setAttribute('class', `delSecNode`)
    var delicon = document.createElement('i')
    delicon.setAttribute('class', `fas fa-trash-alt`)

    var delBtn = document.createElement('button')
    delBtn.setAttribute('class', ` btn btn-light `)
    delBtn.setAttribute('id', `formDiv${maincount}`)

    delBtn.addEventListener('click', SectionDel)
    if (delDivNode) frmDiv.FormDivNode.appendChild(delDivNode)
    if (delBtn) delDivNode.appendChild(delBtn)
    if (delicon) delBtn.appendChild(delicon)

  }
  fixTextArea()
  if (parentArr == null) parentArr = [];

  secCount++
  maincount++
}


function selectFormDivls(e) {
  mainParentId = mainParentId
  var msecId = e.currentTarget.id
  mainFormDivls = msecId
  msecId = ''
}

function selectedParent(e) {
  secId = e.currentTarget.id
  mainParentId = secId
  secId = ''
  window.addEventListener('keyup', debounce(() => {

    saveAllWork()
  }, 5000))
}


function SectionDel() {
  if (localStorage.getItem(my_ls_name) !== null) {
    var ls_data = JSON.parse(localStorage.getItem(my_ls_name));
    for (var i = 0; i < ls_data.length; i++) {
      if (ls_data[i]?.CurrentSecId == mainParentId) {
        delete ls_data.splice(i, 1)
        delete parentArr.splice(i, 1)
        var getCurrSec = document.getElementById(mainFormDivls)
        getCurrSec?.remove()
        break;
      }
    }
    localStorage.setItem(my_ls_name, JSON.stringify(ls_data));
    console.log(ls_data);
  }
}

if (existingEntries !== null) {
  for (let i = 0; i < existingEntries.length; i++) {
    createSectionNode()

    var SecTitleAll = document.querySelector(`#SecTitleId${i + 1}`)
    var SecDisAll = document.querySelector(`#SecDisId${i + 1}`)

        SecTitleAll.innerText = existingEntries[i]?.title
        SecDisAll.innerText = existingEntries[i]?.discription
        const  mainParentId = existingEntries[i]?.CurrentSecId//`formDiv${i+1}`
        const optCnt =0

     if (existingEntries.filter(each => { return each.CurrentSecId === existingEntries[i]?.CurrentSecId }).length > 0) {
       for(var j=0 ; j < existingEntries[i].questions.length ; j++){
        
        const getdivOptionsNode = questionSec(mainParentId)
        const reGenques =`#questionTextId${j + 41}`
        var questionTextIdAll = document.querySelector(reGenques)
        questionTextIdAll.innerText = existingEntries[i].questions[j].question
        
        if (existingEntries[i].questions.filter(each => { return each.qId === existingEntries[i].questions[j]?.qId }).length > 0) {
          for(var k=0; k <= existingEntries[i].questions[j].options.length ; k++){
            const reGenOpt =`#quesOptionTextId${optCnt + 31}`
            //const divOptNodeID =existingEntries[i].questions[j].options[k].optId//`addRadioInDiv${optCnt + 31}`
           
            if (existingEntries[i].questions[j].options.filter(each => { return each.optId === existingEntries[i].questions[j]?.options[k]?.optId }).length > 0) {
              
            var quesOptionTextAll = document.querySelector(reGenOpt)
            quesOptionTextAll.value = existingEntries[i].questions[j].options[k].option
             if(k !== existingEntries[i].questions[j].options.length -1 ){
              quesOptions(getdivOptionsNode, reGenques)
             }
             optCnt++
            //break;
            }
          }
        }
       }
     }

  }
}
else {
  if (existingEntries == null) {

    var createfrm =createSectionNode()
    let sid = 1
    var SecTitleAll = document.getElementById(`SecTitleId${sid}`)
    var SecDisAll = document.getElementById(`SecDisId${sid}`)
    SecTitleAll.innerText = " untitled Title "
    SecDisAll.innerText = "untitled Discription"
  }
}
var secformDiv = formDiv()
 function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(function () { callback.apply(this, args); }, wait);
  };
}
// function selectedParent(e) {
//   secId = e.currentTarget.id
//   mainParentId = secId
//   secId = ''
//   //saveWorkwithTimeInterval(mainParentId)
//   window.addEventListener('keyup', debounce(() => {

//     saveAllWork()
//   }, 5000))
// }
addQuestion.addEventListener('click', function () {
  debugger;
  questionSec(mainParentId)
})

function selectedQtype(e) {
  qTypeId = e.currentTarget.id
  currSelectedQtype = qTypeId
  qTypeId = ''
}


saveWork.addEventListener('click', function () {
  saveAllWork()
}, false)






// Question Function
 function questionSec(mainParentId) {
  //Optcount = 1
  var questionDivNode = document.createElement('div')
  console.log(`mainParentId`, mainParentId)
  var formDivId = document.getElementById(`${mainParentId}`)
  questionDivNode.setAttribute('class', 'addQuesDiv')
  var questxtDiv = createMultiNode(questionDivNode, 'div', `questxtDiv`)
  mainQuestionId = `addQuesDiv${quescount + 40}`
  questionDivNode.setAttribute('id', mainQuestionId)

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
  var divOptionsNode = document.createElement('div')
  divOptionsNode.setAttribute('class', 'optionsInDiv')
  questionDivNode.addEventListener('click', selectedQuestion)
  addMultiOptions.addEventListener('click', function () {
    quesOptions(divOptionsNode, getquestionID)
  })
  fixTextArea()
  if (questionDivNode) formDivId.appendChild(questionDivNode)

  if (questionText) questxtDiv.appendChild(questionText)
  createSelectOptionNode(questxtDiv, 'sel')
  createMultiNode(questionDivNode, 'br')
  if (moreOptsBtn) addMultiOptions.appendChild(moreOptsBtn)

  if (addMultiOptions) questionDivNode.appendChild(addMultiOptions)
  createMultiNode(questionDivNode, 'br')
  if (divOptionsNode) questionDivNode.appendChild(divOptionsNode)

  quesOptions(divOptionsNode, getquestionID) //create mcqs options
  if (quescount > 0) {
    //delete button
    var delDivNode = document.createElement('div');
    delDivNode.setAttribute('class', `delQuesNode`)
    var delicon = document.createElement('i')
    delicon.setAttribute('class', `fas fa-trash-alt`)

    var delBtn = document.createElement('button')
    delBtn.setAttribute('class', ` btn btn-light `)
    delBtn.setAttribute('id', mainQuestionId)

    delBtn.addEventListener('click', delQuestion)
    if (delDivNode) questionDivNode.appendChild(delDivNode)
    if (delBtn) delDivNode.appendChild(delBtn)
    if (delicon) delBtn.appendChild(delicon)

  }

  console.log(`getquestionID`, getquestionID)
  quescount++
  return divOptionsNode

}
function selectedQuestion(e) {
  var getQueId = e.currentTarget.id
  mainQuestionId = getQueId
  getQueId = ''
}
function selectedQtype(e) {
  qTypeId = e.currentTarget.id
  currSelectedQtype = qTypeId
  qTypeId = ''
}
 function quesOptions(divOptionsNode, getquestionID) {
  var getquestion = document.getElementById(`${getquestionID}`)
  var divOptNode = document.createElement('div')
  divOptNode.setAttribute('class', 'addRadioInDiv')
  divOptNodeID = `addRadioInDiv${Optcount + 30}`
  var delOptNode = document.createElement('button')
  delOptNode.setAttribute('class', 'delOptNode')
  var optTypeRadio = document.createElement('input')
  optTypeRadio.setAttribute('type', currSelectedQtype)//|| 'radio')
  optTypeRadio.setAttribute('class', 'questionOptions r1')
  var quesOptionText = document.createElement('input')
  quesOptionText.setAttribute('type', 'text')
  quesOptionText.setAttribute('class', `quesOptionText r1`)
  getquestionOptionID = `quesOptionTextId${Optcount + 30}`
  quesOptionText.setAttribute('id', getquestionOptionID)
  divOptNode.setAttribute('id', divOptNodeID)
  quesOptionText.setAttribute('placeholder', 'option text')
  if (divOptNode) divOptionsNode.appendChild(divOptNode)
  if (optTypeRadio) divOptNode.appendChild(optTypeRadio)
  if (quesOptionText) divOptNode.appendChild(quesOptionText)
  if (Optcount > 0) {
    //delete button
    var delDivNode = document.createElement('div');
    delDivNode.setAttribute('class', `delQuesOptionNode`)
    var delicon = document.createElement('i')
    delicon.setAttribute('class', `fa fa-close`)
    var delBtn = document.createElement('button')
    delBtn.setAttribute('class', ` btn btn-light `)
    delBtn.setAttribute('id', divOptNodeID)
    delBtn.addEventListener('click', delQuestOptions)
    if (delDivNode) divOptNode.appendChild(delDivNode)
    if (delBtn) delDivNode.appendChild(delBtn)
    if (delicon) delBtn.appendChild(delicon)
  }
  Optcount++
}




function delQuestion() {
    if (localStorage.getItem(my_ls_name) !== null) {
      var ls_data = JSON.parse(localStorage.getItem(my_ls_name));
  
      for (var i = 0; i < ls_data.length; i++) {
        if (ls_data[i]?.CurrentSecId == mainParentId) {
          for (var j = 0; j < ls_data[i].questions.length; j++) {
            if (ls_data[i].questions[j].qId == mainQuestionId) {
              delete ls_data[i].questions.splice(j, 1)
              delete parentArr[i].questions.splice(j, 1)
              var getCurrQues = document.getElementById(mainQuestionId)
              getCurrQues?.remove()
              break;
            }
          }
        }
      }
      localStorage.setItem(my_ls_name, JSON.stringify(ls_data));
      console.log(ls_data);
    }
}


function delQuestOptions(e) {
    //delete question option
    var getCurrOptBtnId = e?.currentTarget?.id
    if (localStorage.getItem(my_ls_name) !== null) {
      var ls_data = JSON.parse(localStorage.getItem(my_ls_name));
      // check and enter in selected div
      for (var i = 0; i < ls_data.length; i++) {
        if (ls_data[i]?.CurrentSecId == mainParentId) {
          // check and enter in selected Question
          for (var j = 0; j < ls_data[i].questions.length; j++) {
            if (ls_data[i].questions[j].qId == mainQuestionId) {
              for (var k = 0; k < ls_data[i].questions[j].options.length; k++) {
                if (ls_data[i].questions[j].options[k].optId == getCurrOptBtnId) {
                  ls_data[i].questions[j].options.splice(k, 1)
                  parentArr[i].questions[j].options.splice(k, 1)
                  var getCurrQuesOption = document.getElementById(getCurrOptBtnId)
                  getCurrQuesOption?.remove()
                  break;
                }
              }
            }
          }
        }
      }
      localStorage.setItem(my_ls_name, JSON.stringify(ls_data));
      console.log(ls_data);
    }
}

var matchIndex = 0

 function saveAllWork(){
    localArr()
    addToLocalStorage(parentArr)
  }

function localArr() {
    var initialstate = {
      CurrentSecId: mainParentId,
      title: '',
      discription: '',
      questions: [
      ]
    }
    var quesState = {
      qId: mainQuestionId,
      question: '',
      Qtype: '',
      options: [
      ]
    }
    var optionsState = {
      optId: divOptNodeID,
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
          if (parentArr[i].questions.filter(each => { return each.qId === mainQuestionId; }).length > 0) {
            //update question and new or more add options
            for (let j = 0; j < parentArr[i].questions.length; j++) {
              if (parentArr[i].questions[j]?.qId === mainQuestionId) {
                parentArr[i].questions[j].question = subChild2
                parentArr[i].questions[j].Qtype = "MCQs"
                if (parentArr[i].questions[j].options.filter(each => { return each.optId === divOptNodeID; }).length > 0) {
                  //update existing options 
                  for (let k = 0; k < parentArr[i].questions[j].options.length; k++) {
                    if (parentArr[i].questions[j].options[k]?.optId === divOptNodeID) {
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
                    if (parentArr[i].questions[j].options[t].optId === divOptNodeID) {
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
              if (parentArr[i].questions[q].qId === mainQuestionId) {
                parentArr[i].questions[q].question = subChild2
                parentArr[i].questions[q].Qtype = 'MCQs'
                parentArr[i].questions[q].options.push(optionsState) // if options* ofsame question if not exist
                for (let g = 0; g < parentArr[i].questions[q].options.length; g++) {
                  if (parentArr[i].questions[q].options[g].optId === divOptNodeID) {
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
        if(mainQuestionId !== "" || undefined){
          parentArr[matchIndex].questions.push(quesState)
        if (parentArr[matchIndex].questions[matchIndex]?.qId === mainQuestionId) {
          parentArr[matchIndex].questions[matchIndex].question = subChild2
          parentArr[matchIndex].questions[matchIndex].Qtype = "MCQs"
          parentArr[matchIndex].questions[matchIndex].options.push(optionsState)
          if (parentArr[matchIndex].questions[matchIndex].options[matchIndex]?.optId === divOptNodeID) {
            parentArr[matchIndex].questions[matchIndex].options[matchIndex].option = subChild3
            parentArr[matchIndex].questions[matchIndex].options[matchIndex].correct = false
          }
        }
        }
        
      }
    }
    matchIndex++
  }
  function addToLocalStorage(parentArr) {
    // Parse the JSON stored in allEntriesP
    if(parentArr){
      var existingEntries = JSON.parse(localStorage.getItem(my_ls_name));
    console.log(`existingEntries`, existingEntries)
    // if (existingEntries == null) existingEntries = [];
    localStorage.setItem(my_ls_name, JSON.stringify(parentArr));
    return
    }
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

  

 function createMultiNode(parent, node, cls) {
    var createNode = document.createElement(node)
    if (createNode) parent.appendChild(createNode)
    if (createNode) createNode.setAttribute('class', cls)
    return createNode
  }
  
   function createSelectOptionNode(parent, cls) {
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
    if (selectNode) selectNode.setAttribute('id', 'SelQuesType')
    if (selectNode) selectNode.setAttribute('onchange', 'showOptions(this)')
    var SelQuesType = document.getElementById('SelQuesType')
    SelQuesType.addEventListener('change', function () {
      var getAllatype = document.querySelectorAll(`.${uniqueOptionsType}`)
      for (op = 0; op < getAllatype?.length; op++) {
        getAllatype[op].setAttribute('type', currSelectedQtype)
      }
    }, false)
    return selectNode
  }
  
  function showOptions(e) {
    var selOptionId = e[e.selectedIndex].id
    currSelectedQtype = selOptionId
    selOptionId = ''
    console.log("id is ", e[e.selectedIndex].id); // get id
  
  }
  
  
  
  previewer.addEventListener('click', function () {
    preView()
  })
  function preView() {
    window.location.href = './docFormViewer.html'
  }
  
  