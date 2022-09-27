export function changeClass (label, oldClass, newClass) {
  label.classList.remove(oldClass)
  label.classList.add(newClass)
}