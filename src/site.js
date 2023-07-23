import "/js/os.js"

// -- constants --
const NAV_ANIM_MILLIS = 300
const NAV_ATTR_STUCK = "stuck"

// -- props --
let $scroll = null
let timeout = null

// -- main --
function Main() {
  // get elements
  $scroll = document.body
  const $nav = document.getElementById("nav")
  const $board = document.getElementById("board")

  // observe nav intersection
  const intersectionConfig = {
    threshold: [1],
  }

  const intersection = new IntersectionObserver(OnNavIntersectionChanged, intersectionConfig)
  intersection.observe($nav)

  // observe board modal open state
  if ($board != null) {
    const mutationConfig = {
      subtree: true,
      attributeFilter: ["open"]
    }

    const mutationObserver = new MutationObserver(OnBoardMemberOpenChanged)
    mutationObserver.observe($board, mutationConfig)
  }
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

function OnBoardMemberOpenChanged([m]) {
  const isOpen = m.target.hasAttribute("open")
  $scroll.classList.toggle("is-modal", isOpen)
}

// -- bootstrap --
Main()
