function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  ///////////Tabs//////////////

  let tabs = document.querySelectorAll(tabsSelector),
  tabsContent = document.querySelectorAll(tabsContentSelector),
  tabsParent = document.querySelectorAll(tabsParentSelector);

  function hideTabContent() {
  tabsContent.forEach(item => {
    // item.style.display = 'none';
    item.classList.add('hide');
    item.classList.remove('show', 'fade');
  }); // занимается скрытием табов

  tabs.forEach(item => {
    item.classList.remove(activeClass);
  });
  } 

  function showTabContent(i = 0) {
  // tabsContent[i].style.display = 'block';
  tabsContent[i].classList.add('show', 'fade');
  tabsContent[i].classList.remove('hide');
  tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  tabsParent.forEach(parent => {
    parent.addEventListener('click', event => {
      const target = event.target;
      if(target && target.matches(tabsSelector)) {
        tabs.forEach((item, i) => {
        if (target === item) {
            hideTabContent();
            showTabContent(i); 
          }
        });
      }
   });
  })
}

export default tabs;