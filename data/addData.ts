export default async function addData(ingredientType: string) {
  await fetch('/ingredients-types/add-ingredient-type', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ ingredientType: ingredientType })
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log(error.message));
}
