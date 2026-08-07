// Temporary debug script - will be removed
// Add this import to main.jsx temporarily to inspect CSS
setTimeout(() => {
  const root = document.getElementById('root');
  const body = document.body;
  const adminLayout = document.querySelector('.admin-layout');
  const sidebar = document.querySelector('.admin-sidebar');
  
  function getStyles(el, name) {
    if (!el) return name + ': NOT FOUND';
    const s = getComputedStyle(el);
    return name + ': ' + JSON.stringify({
      display: s.display,
      position: s.position,
      width: s.width,
      maxWidth: s.maxWidth,
      margin: s.margin,
      padding: s.padding,
      textAlign: s.textAlign,
      transform: s.transform,
      filter: s.filter,
      flexDirection: s.flexDirection,
      alignItems: s.alignItems,
      justifyContent: s.justifyContent,
      left: s.left,
      top: s.top,
      inset: s.inset
    });
  }
  
  console.log('=== CSS DEBUG START ===');
  console.log(getStyles(body, 'BODY'));
  console.log(getStyles(root, 'ROOT'));
  console.log(getStyles(adminLayout, 'ADMIN-LAYOUT'));
  console.log(getStyles(sidebar, 'SIDEBAR'));
  
  // Check ALL ancestors for transform/filter
  let el = sidebar;
  while (el && el !== document.documentElement) {
    const s = getComputedStyle(el);
    if (s.transform !== 'none' || s.filter !== 'none') {
      console.log('BREAKING ANCESTOR:', el.tagName, el.id, el.className, 'transform:', s.transform, 'filter:', s.filter);
    }
    el = el.parentElement;
  }
  console.log('=== CSS DEBUG END ===');
}, 3000);
