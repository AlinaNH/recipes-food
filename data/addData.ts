export default function addData() {
  fetch('/hello')
    .then((response) => response.text())
    .then((result) => console.log(result));
}
