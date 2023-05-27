// -- constants --
const NAV_ANIM_MILLIS = 300
const NAV_ATTR_STUCK = "stuck"

// -- props --
let timeout = null

// -- main --
function Main() {
  // get elements
  const $nav = document.getElementById("nav")

  // bind events
  const intersection = new IntersectionObserver(OnNavIntersectionChanged, {
    threshold: [1],
  })

  intersection.observe($nav)
}

// -- commands --
function StartNavTransition($el, start, finish) {
  if ($el.getAttribute(NAV_ATTR_STUCK) == finish) {
    return
  }

  if (timeout != null) {
    clearTimeout(timeout)
    timeout = null
  }

  SetNavStuck($el, start)
  timeout = setTimeout(() => SetNavStuck($el, finish), NAV_ANIM_MILLIS)
}

function SetNavStuck($el, state) {
  if (state == null) {
    $el.removeAttribute(NAV_ATTR_STUCK)
  } else {
    $el.setAttribute(NAV_ATTR_STUCK, state)
  }
}

// -- events --
function OnNavIntersectionChanged([e]) {
  const $el = e.target
  if (e.intersectionRatio < 1) {
    StartNavTransition($el, "enter", "")
  } else {
    StartNavTransition($el, "exit", null)
  }
}

// -- bootstrap --
Main()
