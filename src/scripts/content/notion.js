'use strict';

function selectContains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function(element){
    return RegExp(text).test(element.textContent);
  });
}

togglbutton.render('div[style*="display: flex; border-bottom: 1px solid"].notion-selectable div[style="display: flex;"] div.notion-button span[style*="weight: 500"]:not(.toggl)', { observe: true }, function(
  elem
) {
  var togglCol = -1;
  var headerRow = document.querySelectorAll('.notion-scroller[style*="flex-grow: 1; flex-shrink: 0; z-index: 1; margin-right: 0px; margin-bottom: 0px;"] div div[data-block-id]')[0].firstElementChild.firstElementChild;
  togglCol = Array.from(headerRow.childNodes).indexOf(selectContains('div',/^Toggl/)[0])

  if(togglCol != -1) {
  var link = togglbutton.createTimerLink({
    className: 'notion',
    description: elem.innerText,
    projectName: "Sprint tasks",
    buttonType: 'minimal'
  });

  var togglButtonLoc = elem.parentElement.parentElement;
  for (var i = 0; i < togglCol; i++) {
    togglButtonLoc = togglButtonLoc.nextElementSibling;
  }
  if(togglButtonLoc != null)
    togglButtonLoc.appendChild(link);
}});
