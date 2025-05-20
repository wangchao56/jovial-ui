export function getTooltipContainer() {
  const tooltipContainerId = 'jv-tooltip-container'
  let tooltipContainer = document.getElementById(tooltipContainerId)
  if (!tooltipContainer) {
    tooltipContainer = document.createElement('div')
    tooltipContainer.id = tooltipContainerId
    tooltipContainer.style.setProperty('position', 'static')
    tooltipContainer.style.setProperty('z-index', '9999')
    tooltipContainer.style.setProperty('transform', 'translate(-10000px, 0)')
    document.body.appendChild(tooltipContainer)
  }
  return tooltipContainer
}
